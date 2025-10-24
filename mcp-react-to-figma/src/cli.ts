#!/usr/bin/env node

/**
 * CLI Interface for React-to-Figma MCP
 * بسم الله الرحمن الرحيم
 */

import { Command } from 'commander';
import ora from 'ora';
import chalk from 'chalk';
import { config } from 'dotenv';
import { DOMCapture } from './core/capture.js';
import { DOMToFigmaConverter } from './core/converter.js';
import { FigmaClient } from './core/figma-client.js';
import { logger } from './utils/logger.js';
import { validateUrl } from './utils/validator.js';

// Load environment variables
config();

const program = new Command();

program
  .name('react-to-figma')
  .description('Convert React/HTML sites to Figma designs')
  .version('1.0.0');

// Import command
program
  .command('import')
  .description('Import React site into Figma')
  .requiredOption('-u, --url <url>', 'URL of the site to import')
  .option('-s, --selector <selector>', 'CSS selector for specific element')
  .option('-p, --page-name <name>', 'Name for the Figma page', 'Imported from React')
  .option('--no-components', 'Do not create Figma components')
  .option('--no-headless', 'Run browser in visible mode (for debugging)')
  .option('-v, --verbose', 'Verbose output')
  .action(async (options) => {
    const spinner = ora();

    try {
      // Validate URL
      validateUrl(options.url);

      if (options.verbose) {
        process.env.VERBOSE = 'true';
      }

      console.log(chalk.bold.cyan('\n🎨 React-to-Figma Converter\n'));
      console.log(chalk.gray('بسم الله الرحمن الرحيم\n'));

      // Check environment variables
      const accessToken = process.env.FIGMA_ACCESS_TOKEN;
      const fileKey = process.env.FIGMA_FILE_KEY;

      if (!accessToken || !fileKey) {
        console.log(chalk.red('❌ Configuration Error\n'));
        console.log('Please set the following in your .env file:');
        console.log(chalk.yellow('  FIGMA_ACCESS_TOKEN=your_token_here'));
        console.log(chalk.yellow('  FIGMA_FILE_KEY=your_file_key_here\n'));
        console.log('See README.md for setup instructions.');
        process.exit(1);
      }

      // Initialize Figma client
      const figmaClient = new FigmaClient({ accessToken, fileKey });

      // Step 1: Capture
      spinner.start('Launching browser and capturing DOM...');
      const capture = new DOMCapture();
      await capture.initialize(options.headless);
      await capture.navigateTo(options.url);
      spinner.succeed('DOM captured successfully');

      // Step 2: Extract elements
      spinner.start('Extracting elements...');
      const elements = await capture.captureElements(options.selector);
      spinner.succeed(`Extracted ${elements.length} element tree(s)`);

      // Step 3: Convert
      spinner.start('Converting to Figma structures...');
      const converter = new DOMToFigmaConverter();
      const nodes = converter.convertElements(elements);
      const pageFrame = converter.createPageFrame(nodes, options.pageName, 1440, 900);
      spinner.succeed('Conversion completed');

      // Step 4: Generate JSON
      spinner.start('Generating Figma JSON...');
      const figmaJSON = figmaClient.generateFigmaJSON([pageFrame]);
      const nodeCount = countNodes(pageFrame);
      spinner.succeed(`Generated structure with ${nodeCount} nodes`);

      // Cleanup
      await capture.close();

      // Output
      console.log(chalk.bold.green('\n✅ Conversion Successful!\n'));
      console.log(chalk.bold('📊 Results:'));
      console.log(`  • Nodes created: ${nodeCount}`);
      console.log(`  • Page name: ${options.pageName}`);
      console.log(`  • Source: ${options.url}\n`);

      console.log(chalk.bold('📋 Figma JSON:'));
      console.log(chalk.gray('─'.repeat(80)));
      console.log(figmaJSON);
      console.log(chalk.gray('─'.repeat(80)));

      console.log(chalk.bold('\n📌 Next Steps:\n'));
      console.log('1. Copy the JSON above');
      console.log('2. Install a Figma plugin: "JSON to Figma"');
      console.log('3. Paste the JSON in the plugin to create the design\n');

      console.log(chalk.blue('🔗 Your Figma file:'), chalk.underline(figmaClient.getFileUrl()));
      console.log();
    } catch (error) {
      spinner.fail('Conversion failed');
      console.log(chalk.red('\n❌ Error:'), (error as Error).message);

      if (options.verbose) {
        console.log(chalk.gray('\nStack trace:'));
        console.log(chalk.gray((error as Error).stack));
      }

      process.exit(1);
    }
  });

// Analyze command
program
  .command('analyze')
  .description('Analyze React site structure without creating Figma nodes')
  .requiredOption('-u, --url <url>', 'URL of the site to analyze')
  .option('-s, --selector <selector>', 'CSS selector for specific element')
  .option('-v, --verbose', 'Verbose output')
  .action(async (options) => {
    const spinner = ora();

    try {
      validateUrl(options.url);

      console.log(chalk.bold.cyan('\n📊 React Structure Analysis\n'));

      spinner.start('Analyzing page...');
      const capture = new DOMCapture();
      const analysis = await capture.analyzePage(options.url, {
        selector: options.selector,
        headless: true,
      });
      await capture.close();
      spinner.succeed('Analysis completed');

      console.log(chalk.bold.green('\n✅ Analysis Results\n'));
      console.log(chalk.bold('📄 Page:'), analysis.title);
      console.log(chalk.bold('🔗 URL:'), analysis.url);
      console.log(
        chalk.bold('📐 Viewport:'),
        `${analysis.viewport.width}×${analysis.viewport.height}\n`,
      );

      console.log(
        chalk.bold('🎨 Color Palette:'),
        `(${analysis.colorPalette.length} unique colors)`,
      );
      analysis.colorPalette.slice(0, 10).forEach((color) => {
        console.log(`  • ${color}`);
      });
      if (analysis.colorPalette.length > 10) {
        console.log(chalk.gray(`  ... and ${analysis.colorPalette.length - 10} more`));
      }

      console.log(chalk.bold('\n📝 Font Families:'), `(${analysis.fontFamilies.length})`);
      analysis.fontFamilies.forEach((font) => {
        console.log(`  • ${font}`);
      });

      console.log(chalk.bold('\n🔢 Structure:'));
      console.log(`  • Top-level sections: ${analysis.sections.length}`);
      console.log(`  • Total elements: ${countElements(analysis.sections)}\n`);
    } catch (error) {
      spinner.fail('Analysis failed');
      console.log(chalk.red('\n❌ Error:'), (error as Error).message);
      process.exit(1);
    }
  });

// Validate command
program
  .command('validate')
  .description('Validate Figma connection and configuration')
  .action(async () => {
    console.log(chalk.bold.cyan('\n🔍 Validating Configuration\n'));

    const accessToken = process.env.FIGMA_ACCESS_TOKEN;
    const fileKey = process.env.FIGMA_FILE_KEY;

    if (!accessToken) {
      console.log(chalk.red('❌ FIGMA_ACCESS_TOKEN not set'));
      process.exit(1);
    } else {
      console.log(chalk.green('✓ FIGMA_ACCESS_TOKEN found'));
    }

    if (!fileKey) {
      console.log(chalk.red('❌ FIGMA_FILE_KEY not set'));
      process.exit(1);
    } else {
      console.log(chalk.green('✓ FIGMA_FILE_KEY found'));
    }

    const spinner = ora('Testing Figma connection...').start();

    try {
      const figmaClient = new FigmaClient({ accessToken, fileKey });
      const isValid = await figmaClient.validateConnection();

      if (isValid) {
        spinner.succeed('Figma connection successful');
        console.log(chalk.blue('\n🔗 File URL:'), chalk.underline(figmaClient.getFileUrl()));
        console.log(chalk.green('\n✅ Configuration is valid!\n'));
      } else {
        spinner.fail('Figma connection failed');
        process.exit(1);
      }
    } catch (error) {
      spinner.fail('Figma connection failed');
      console.log(chalk.red('\n❌ Error:'), (error as Error).message);
      process.exit(1);
    }
  });

// Helper functions
function countNodes(node: any): number {
  let count = 1;
  if (node.children) {
    count += node.children.reduce((sum: number, child: any) => sum + countNodes(child), 0);
  }
  return count;
}

function countElements(elements: any[]): number {
  return elements.reduce((sum, el) => {
    return sum + 1 + (el.children ? countElements(el.children) : 0);
  }, 0);
}

// Parse arguments
program.parse();





