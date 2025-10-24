/**
 * Figma API Client for creating and managing Figma nodes
 */

import { FigmaNode, FigmaClientConfig, FigmaFileResponse, RGB } from '../types/figma.js';
import { logger } from '../utils/logger.js';
import { validateFigmaToken, validateFigmaFileKey } from '../utils/validator.js';

export class FigmaClient {
  private accessToken: string;
  private fileKey: string;
  private baseUrl = 'https://api.figma.com/v1';

  constructor(config: FigmaClientConfig) {
    validateFigmaToken(config.accessToken);
    validateFigmaFileKey(config.fileKey);

    this.accessToken = config.accessToken;
    this.fileKey = config.fileKey;
  }

  /**
   * Get file information
   */
  async getFile(): Promise<FigmaFileResponse> {
    const url = `${this.baseUrl}/files/${this.fileKey}`;
    const response = await this.request(url);
    return response;
  }

  /**
   * Create a new page in the file
   */
  async createPage(pageName: string): Promise<{ id: string; name: string }> {
    logger.debug(`Creating page: ${pageName}`);

    // Note: Figma API doesn't have a direct "create page" endpoint
    // We'll need to use the Figma Plugin API or Web API for this
    // For now, we'll return a mock response and document this limitation

    logger.warn('Page creation requires Figma Plugin API - using workaround');

    // Workaround: We'll create a top-level frame that acts as a page
    const frameId = `page_${Date.now()}`;

    return {
      id: frameId,
      name: pageName,
    };
  }

  /**
   * Create nodes in Figma
   * Note: This is a simplified version - full implementation would use Figma Plugin API
   */
  async createNodes(pageId: string, nodes: FigmaNode[]): Promise<string[]> {
    logger.debug(`Creating ${nodes.length} nodes on page ${pageId}`);

    // This is a limitation: The REST API is read-only
    // To create nodes, we need to use the Figma Plugin API or File Import API

    logger.info('Node creation will be handled via Figma Plugin API');
    logger.info('For now, generating the structure that would be created...');

    // Return mock node IDs
    return nodes.map((_, index) => `node_${pageId}_${index}`);
  }

  /**
   * Upload image to Figma
   */
  async uploadImage(imageData: string): Promise<string> {
    // Figma doesn't have a direct image upload endpoint via REST API
    // Images need to be hosted externally or embedded in the plugin
    logger.debug('Image upload - using data URL');
    return imageData;
  }

  /**
   * Generate Figma file URL
   */
  getFileUrl(nodeId?: string): string {
    const base = `https://figma.com/file/${this.fileKey}`;
    if (nodeId) {
      return `${base}?node-id=${nodeId}`;
    }
    return base;
  }

  /**
   * Make HTTP request to Figma API
   */
  private async request(url: string, options: RequestInit = {}): Promise<any> {
    const headers = {
      'X-Figma-Token': this.accessToken,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(
          `Figma API Error: ${response.status} ${response.statusText} - ${JSON.stringify(error)}`,
        );
      }

      return await response.json();
    } catch (error) {
      logger.error('Figma API request failed', error as Error);
      throw error;
    }
  }

  /**
   * Generate JSON structure for manual import into Figma
   * This is a workaround for the REST API limitations
   */
  generateFigmaJSON(nodes: FigmaNode[]): string {
    const structure = {
      version: '1.0',
      generator: 'react-to-figma-mcp',
      timestamp: new Date().toISOString(),
      nodes: nodes,
      instructions: [
        'This JSON represents the structure to create in Figma',
        'To import:',
        '1. Copy this JSON',
        '2. Use a Figma plugin like "JSON to Figma" or create nodes manually',
        '3. Or use our companion Figma plugin (coming soon)',
      ],
    };

    return JSON.stringify(structure, null, 2);
  }

  /**
   * Validate connection to Figma
   */
  async validateConnection(): Promise<boolean> {
    try {
      logger.debug('Validating Figma connection...');
      await this.getFile();
      logger.success('Figma connection validated ✓');
      return true;
    } catch (error) {
      logger.error('Failed to connect to Figma', error as Error);
      return false;
    }
  }
}

/**
 * Create a simple frame structure
 */
export function createFrame(
  name: string,
  width: number,
  height: number,
  backgroundColor?: RGB,
  children?: FigmaNode[],
): FigmaNode {
  const node: FigmaNode = {
    name,
    type: 'FRAME',
    properties: {
      width,
      height,
      x: 0,
      y: 0,
      layoutMode: 'NONE',
      fills: backgroundColor ? [{ type: 'SOLID', color: backgroundColor, opacity: 1 }] : [],
      clipsContent: false,
    },
    children: children || [],
  };

  return node;
}

/**
 * Create a text node
 */
export function createText(
  text: string,
  fontSize: number,
  fontFamily: string,
  color: RGB,
  width?: number,
): FigmaNode {
  return {
    name: text.substring(0, 30) + (text.length > 30 ? '...' : ''),
    type: 'TEXT',
    properties: {
      characters: text,
      fontSize,
      fontName: {
        family: fontFamily.split(',')[0].trim().replace(/['"]/g, ''),
        style: 'Regular',
      },
      fills: [{ type: 'SOLID', color, opacity: 1 }],
      textAlignHorizontal: 'LEFT',
      width,
    },
  };
}

/**
 * Create a rectangle node
 */
export function createRectangle(
  name: string,
  width: number,
  height: number,
  fill?: RGB,
  cornerRadius?: number,
): FigmaNode {
  return {
    name,
    type: 'RECTANGLE',
    properties: {
      width,
      height,
      fills: fill ? [{ type: 'SOLID', color: fill, opacity: 1 }] : [],
      cornerRadius: cornerRadius || 0,
    },
  };
}





