#!/usr/bin/env node

/**
 * React-to-Figma MCP Server
 * بسم الله الرحمن الرحيم
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { DOMCapture } from './core/capture.js';
import { DOMToFigmaConverter } from './core/converter.js';
import { FigmaClient } from './core/figma-client.js';
import { ConversionOptions, ConversionResult } from './types/dom.js';
import { logger } from './utils/logger.js';
import { validateConversionOptions } from './utils/validator.js';
import { config } from 'dotenv';

// Load environment variables
config();

const SERVER_NAME = 'react-to-figma';
const SERVER_VERSION = '1.0.0';

class ReactToFigmaServer {
  private server: Server;
  private figmaClient: FigmaClient | null = null;

  constructor() {
    this.server = new Server(
      {
        name: SERVER_NAME,
        version: SERVER_VERSION,
      },
      {
        capabilities: {
          tools: {},
        },
      },
    );

    this.setupHandlers();
    this.setupErrorHandling();
  }

  private setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'import_react_to_figma',
          description: 'Convert React/HTML code from a URL to Figma design structures',
          inputSchema: {
            type: 'object',
            properties: {
              url: {
                type: 'string',
                description: 'URL of the React site to convert (e.g., http://localhost:3000)',
              },
              selector: {
                type: 'string',
                description:
                  'Optional CSS selector to capture specific element (e.g., #hero, .section)',
              },
              pageName: {
                type: 'string',
                description: 'Name for the Figma page to create (default: "Imported from React")',
              },
              createComponents: {
                type: 'boolean',
                description:
                  'Whether to create Figma components for reusable elements (default: true)',
              },
              headless: {
                type: 'boolean',
                description: 'Run browser in headless mode (default: true)',
              },
            },
            required: ['url'],
          },
        },
        {
          name: 'analyze_react_structure',
          description:
            'Analyze React site structure without creating Figma nodes (useful for preview)',
          inputSchema: {
            type: 'object',
            properties: {
              url: {
                type: 'string',
                description: 'URL of the React site to analyze',
              },
              selector: {
                type: 'string',
                description: 'Optional CSS selector for specific element',
              },
            },
            required: ['url'],
          },
        },
      ],
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        if (name === 'import_react_to_figma') {
          return await this.handleImport(args as any);
        }

        if (name === 'analyze_react_structure') {
          return await this.handleAnalyze(args as any);
        }

        throw new Error(`Unknown tool: ${name}`);
      } catch (error) {
        logger.error(`Tool execution failed: ${name}`, error as Error);
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${(error as Error).message}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  private async handleImport(args: ConversionOptions): Promise<any> {
    const options: ConversionOptions = {
      url: args.url,
      selector: args.selector,
      pageName: args.pageName || 'Imported from React',
      createComponents: args.createComponents !== false,
      headless: args.headless !== false,
    };

    // Validate options
    validateConversionOptions(options);

    logger.section('React-to-Figma Import');
    logger.info(`URL: ${options.url}`);
    if (options.selector) {
      logger.info(`Selector: ${options.selector}`);
    }

    // Initialize Figma client
    if (!this.figmaClient) {
      const accessToken = process.env.FIGMA_ACCESS_TOKEN;
      const fileKey = process.env.FIGMA_FILE_KEY;

      if (!accessToken || !fileKey) {
        throw new Error('FIGMA_ACCESS_TOKEN and FIGMA_FILE_KEY must be set in .env file');
      }

      this.figmaClient = new FigmaClient({ accessToken, fileKey });
    }

    // Step 1: Capture DOM
    logger.step(1, 4, 'Capturing DOM elements...');
    const capture = new DOMCapture();
    try {
      await capture.initialize(options.headless);
      await capture.navigateTo(options.url);
      const elements = await capture.captureElements(options.selector);

      // Step 2: Convert to Figma structures
      logger.step(2, 4, 'Converting to Figma structures...');
      const converter = new DOMToFigmaConverter();
      const nodes = converter.convertElements(elements);

      // Step 3: Create page frame
      logger.step(3, 4, 'Creating page frame...');
      const pageFrame = converter.createPageFrame(nodes, options.pageName, 1440, 900);

      // Step 4: Generate output
      logger.step(4, 4, 'Generating Figma JSON...');
      const figmaJSON = this.figmaClient.generateFigmaJSON([pageFrame]);

      const result: ConversionResult = {
        success: true,
        message: 'Conversion successful! Use the JSON below with a Figma plugin or manual import.',
        nodesCreated: this.countNodes(pageFrame),
      };

      logger.success('Conversion completed successfully!');
      logger.info(`Total nodes created: ${result.nodesCreated}`);

      return {
        content: [
          {
            type: 'text',
            text: `✅ Successfully converted ${result.nodesCreated} elements from ${options.url}

📋 Figma JSON Structure:
${figmaJSON}

📌 How to use:
1. Copy the JSON above
2. Use a Figma plugin like "JSON to Figma" to import
3. Or create nodes manually following the structure

🔗 Figma File: ${this.figmaClient.getFileUrl()}

💡 Note: Direct API creation requires Figma Plugin API. We've generated the structure that can be imported via plugins or created manually.`,
          },
        ],
      };
    } finally {
      await capture.close();
    }
  }

  private async handleAnalyze(args: { url: string; selector?: string }): Promise<any> {
    logger.section('React Structure Analysis');
    logger.info(`Analyzing: ${args.url}`);

    const capture = new DOMCapture();
    try {
      const analysis = await capture.analyzePage(args.url, {
        selector: args.selector,
        headless: true,
      });

      logger.success('Analysis complete!');

      return {
        content: [
          {
            type: 'text',
            text: `📊 Analysis Results for ${args.url}

🎨 Color Palette (${analysis.colorPalette.length} unique colors):
${analysis.colorPalette.map((c) => `  • ${c}`).join('\n')}

📝 Font Families (${analysis.fontFamilies.length}):
${analysis.fontFamilies.map((f) => `  • ${f}`).join('\n')}

📐 Page Dimensions: ${analysis.viewport.width}×${analysis.viewport.height}

🔢 Elements Captured: ${analysis.sections.length} top-level section(s)

💡 This analysis helps understand the design structure before importing to Figma.`,
          },
        ],
      };
    } finally {
      await capture.close();
    }
  }

  private countNodes(node: any): number {
    let count = 1;
    if (node.children) {
      count += node.children.reduce((sum: number, child: any) => sum + this.countNodes(child), 0);
    }
    return count;
  }

  private setupErrorHandling() {
    process.on('uncaughtException', (error) => {
      logger.error('Uncaught exception', error);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason) => {
      logger.error('Unhandled rejection', reason as Error);
      process.exit(1);
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    logger.info(`${SERVER_NAME} MCP Server v${SERVER_VERSION} running`);
  }
}

// Start server
const server = new ReactToFigmaServer();
server.run().catch((error) => {
  logger.error('Failed to start server', error);
  process.exit(1);
});





