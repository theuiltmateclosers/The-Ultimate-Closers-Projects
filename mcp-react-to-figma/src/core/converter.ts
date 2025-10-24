/**
 * Convert analyzed DOM elements to Figma node structures
 */

import { CapturedElement } from '../types/dom.js';
import { FigmaNode, FigmaNodeProperties, RGB } from '../types/figma.js';
import { AnalyzedComponent, StyleAnalyzer } from './analyzer.js';
import {
  cssColorToRGB,
  parsePx,
  parseShadow,
  parseBorderRadius,
  mapFontWeight,
  generateNodeId,
  sanitizeNodeName,
} from '../utils/helpers.js';
import { logger } from '../utils/logger.js';

export class DOMToFigmaConverter {
  private analyzer: StyleAnalyzer;

  constructor() {
    this.analyzer = new StyleAnalyzer();
  }

  /**
   * Convert analyzed component to Figma node
   */
  convertComponent(analyzed: AnalyzedComponent): FigmaNode {
    const { element, layout, isComponent, componentType } = analyzed;
    const styles = element.computedStyles;

    // Determine node type
    let nodeType: FigmaNode['type'] = 'FRAME';
    if (componentType === 'text' && element.textContent) {
      nodeType = 'TEXT';
    } else if (componentType === 'image') {
      nodeType = 'RECTANGLE'; // Will use image fill
    }

    // Base properties
    const width = parsePx(styles.width) || 100;
    const height = parsePx(styles.height) || 100;

    const properties: FigmaNodeProperties = {
      width,
      height,
      x: element.boundingBox.x,
      y: element.boundingBox.y,
    };

    // Layout properties
    if (layout.type === 'flex') {
      properties.layoutMode = layout.direction === 'horizontal' ? 'HORIZONTAL' : 'VERTICAL';
      properties.itemSpacing = layout.spacing || 0;

      // Padding
      properties.paddingTop = parsePx(styles.paddingTop);
      properties.paddingRight = parsePx(styles.paddingRight);
      properties.paddingBottom = parsePx(styles.paddingBottom);
      properties.paddingLeft = parsePx(styles.paddingLeft);
    }

    // Background color
    const bgColor = cssColorToRGB(styles.backgroundColor);
    if (
      bgColor &&
      styles.backgroundColor !== 'rgba(0, 0, 0, 0)' &&
      styles.backgroundColor !== 'transparent'
    ) {
      properties.fills = [
        {
          type: 'SOLID',
          color: bgColor,
          opacity: parseFloat(styles.opacity) || 1,
        },
      ];
    } else {
      properties.fills = [];
    }

    // Border
    if (styles.borderWidth && parsePx(styles.borderWidth) > 0) {
      const borderColor = cssColorToRGB(styles.borderColor);
      if (borderColor) {
        properties.strokes = [
          {
            type: 'SOLID',
            color: borderColor,
          },
        ];
        properties.strokeWeight = parsePx(styles.borderWidth);
      }
    }

    // Border radius
    const borderRadius = parseBorderRadius(styles.borderRadius);
    if (typeof borderRadius === 'number') {
      properties.cornerRadius = borderRadius;
    } else if (Array.isArray(borderRadius)) {
      properties.rectangleCornerRadii = borderRadius;
    }

    // Shadow
    if (styles.boxShadow && styles.boxShadow !== 'none') {
      const shadows = parseShadow(styles.boxShadow);
      if (shadows) {
        properties.effects = shadows;
      }
    }

    // Text specific properties
    if (nodeType === 'TEXT' && element.textContent) {
      properties.characters = element.textContent;
      properties.fontSize = parsePx(styles.fontSize) || 16;

      const textColor = cssColorToRGB(styles.color);
      if (textColor) {
        properties.fills = [
          {
            type: 'SOLID',
            color: textColor,
            opacity: 1,
          },
        ];
      }

      properties.fontName = {
        family: styles.fontFamily.split(',')[0].trim().replace(/['"]/g, ''),
        style: mapFontWeight(styles.fontWeight),
      };

      // Text alignment
      const align = styles.textAlign;
      if (align === 'center') {
        properties.textAlignHorizontal = 'CENTER';
      } else if (align === 'right') {
        properties.textAlignHorizontal = 'RIGHT';
      } else {
        properties.textAlignHorizontal = 'LEFT';
      }

      // Line height
      if (styles.lineHeight !== 'normal') {
        const lineHeight = parseFloat(styles.lineHeight);
        if (!isNaN(lineHeight)) {
          properties.lineHeight = {
            value: lineHeight,
            unit: styles.lineHeight.includes('px') ? 'PIXELS' : 'PERCENT',
          };
        }
      }

      // Letter spacing
      if (styles.letterSpacing && styles.letterSpacing !== 'normal') {
        const letterSpacing = parsePx(styles.letterSpacing);
        if (letterSpacing !== 0) {
          properties.letterSpacing = {
            value: letterSpacing,
            unit: 'PIXELS',
          };
        }
      }
    }

    // Opacity
    if (styles.opacity && parseFloat(styles.opacity) < 1) {
      properties.opacity = parseFloat(styles.opacity);
    }

    // Create node
    const node: FigmaNode = {
      id: generateNodeId(),
      name: sanitizeNodeName(
        element.attributes.id ||
          element.attributes.class ||
          componentType ||
          element.tagName.toLowerCase(),
      ),
      type: isComponent ? 'COMPONENT' : nodeType,
      properties,
      children: [],
    };

    // Convert children
    if (analyzed.children.length > 0 && nodeType !== 'TEXT') {
      node.children = analyzed.children
        .map((child) => this.convertComponent(child))
        .filter((child) => child !== null);
    }

    return node;
  }

  /**
   * Convert multiple elements
   */
  convertElements(elements: CapturedElement[]): FigmaNode[] {
    logger.info('Converting DOM elements to Figma structures...');

    const analyzed = this.analyzer.analyzePage(elements);
    const converted = analyzed.map((a) => this.convertComponent(a));

    logger.success(`Converted ${converted.length} element tree(s) to Figma nodes`);

    return converted;
  }

  /**
   * Create a frame wrapper for converted nodes
   */
  createPageFrame(nodes: FigmaNode[], pageName: string, width: number, height: number): FigmaNode {
    return {
      id: generateNodeId(),
      name: pageName,
      type: 'FRAME',
      properties: {
        width,
        height,
        x: 0,
        y: 0,
        layoutMode: 'NONE',
        fills: [
          {
            type: 'SOLID',
            color: { r: 0.96, g: 0.94, b: 0.91 }, // #F5F0E8 - Background color
            opacity: 1,
          },
        ],
        clipsContent: true,
      },
      children: nodes,
    };
  }
}





