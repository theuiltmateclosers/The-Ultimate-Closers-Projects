/**
 * DOM Capture using Puppeteer
 */

import puppeteer, { Browser, Page } from 'puppeteer';
import {
  CapturedElement,
  BoundingBox,
  ComputedStyles,
  PageAnalysis,
  ConversionOptions,
} from '../types/dom.js';
import { logger } from '../utils/logger.js';
import { extractColorPalette, extractFontFamilies } from '../utils/helpers.js';

export class DOMCapture {
  private browser: Browser | null = null;
  private page: Page | null = null;

  /**
   * Initialize Puppeteer browser
   */
  async initialize(headless: boolean = true): Promise<void> {
    logger.debug('Launching Puppeteer browser...');

    this.browser = await puppeteer.launch({
      headless: headless ? 'new' : false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
      ],
    });

    this.page = await this.browser.newPage();

    logger.success('Browser launched successfully');
  }

  /**
   * Navigate to URL and wait for page load
   */
  async navigateTo(url: string, viewport?: { width: number; height: number }): Promise<void> {
    if (!this.page) {
      throw new Error('Browser not initialized. Call initialize() first.');
    }

    if (viewport) {
      await this.page.setViewport(viewport);
    } else {
      await this.page.setViewport({ width: 1440, height: 900 });
    }

    logger.info(`Navigating to: ${url}`);

    await this.page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    logger.success('Page loaded successfully');
  }

  /**
   * Capture elements from the page
   */
  async captureElements(selector?: string): Promise<CapturedElement[]> {
    if (!this.page) {
      throw new Error('Page not initialized');
    }

    logger.info('Capturing DOM elements...');

    // If selector provided, capture that element, otherwise capture body
    const targetSelector = selector || 'body';

    const elements = await this.page.evaluate((sel) => {
      function getComputedStylesForElement(element: Element): any {
        const computed = window.getComputedStyle(element);

        return {
          // Layout
          display: computed.display,
          position: computed.position,
          flexDirection: computed.flexDirection,
          justifyContent: computed.justifyContent,
          alignItems: computed.alignItems,
          gap: computed.gap,
          gridTemplateColumns: computed.gridTemplateColumns,
          gridTemplateRows: computed.gridTemplateRows,

          // Box model
          width: computed.width,
          height: computed.height,
          margin: computed.margin,
          marginTop: computed.marginTop,
          marginRight: computed.marginRight,
          marginBottom: computed.marginBottom,
          marginLeft: computed.marginLeft,
          padding: computed.padding,
          paddingTop: computed.paddingTop,
          paddingRight: computed.paddingRight,
          paddingBottom: computed.paddingBottom,
          paddingLeft: computed.paddingLeft,

          // Background
          backgroundColor: computed.backgroundColor,
          backgroundImage: computed.backgroundImage,
          backgroundSize: computed.backgroundSize,
          backgroundPosition: computed.backgroundPosition,
          backgroundRepeat: computed.backgroundRepeat,

          // Border
          border: computed.border,
          borderRadius: computed.borderRadius,
          borderTopLeftRadius: computed.borderTopLeftRadius,
          borderTopRightRadius: computed.borderTopRightRadius,
          borderBottomRightRadius: computed.borderBottomRightRadius,
          borderBottomLeftRadius: computed.borderBottomLeftRadius,
          borderColor: computed.borderColor,
          borderWidth: computed.borderWidth,
          borderStyle: computed.borderStyle,

          // Typography
          color: computed.color,
          fontFamily: computed.fontFamily,
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight,
          lineHeight: computed.lineHeight,
          letterSpacing: computed.letterSpacing,
          textAlign: computed.textAlign,
          textTransform: computed.textTransform,
          textDecoration: computed.textDecoration,

          // Effects
          boxShadow: computed.boxShadow,
          opacity: computed.opacity,
          filter: computed.filter,
          transform: computed.transform,

          // Other
          overflow: computed.overflow,
          zIndex: computed.zIndex,
        };
      }

      function captureElement(element: Element, depth: number = 0): any {
        if (depth > 10) return null; // Limit recursion depth

        const rect = element.getBoundingClientRect();
        const styles = getComputedStylesForElement(element);

        // Get text content for text nodes
        let textContent = '';
        if (element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE) {
          textContent = (element.childNodes[0] as Text).textContent?.trim() || '';
        }

        // Get attributes
        const attributes: Record<string, string> = {};
        for (const attr of element.attributes) {
          attributes[attr.name] = attr.value;
        }

        // Capture children recursively
        const children: any[] = [];
        for (const child of element.children) {
          // Skip script, style, noscript tags
          if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(child.tagName)) {
            continue;
          }

          const captured = captureElement(child, depth + 1);
          if (captured) {
            children.push(captured);
          }
        }

        return {
          selector: element.tagName.toLowerCase() + (element.id ? `#${element.id}` : ''),
          tagName: element.tagName,
          boundingBox: {
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
            left: rect.left,
          },
          computedStyles: styles,
          textContent,
          attributes,
          children,
        };
      }

      const targetElement = document.querySelector(sel);
      if (!targetElement) {
        throw new Error(`Element not found: ${sel}`);
      }

      return [captureElement(targetElement)];
    }, targetSelector);

    logger.success(`Captured ${elements.length} element tree(s)`);

    return elements as CapturedElement[];
  }

  /**
   * Take screenshot of an element
   */
  async captureScreenshot(selector: string): Promise<string> {
    if (!this.page) {
      throw new Error('Page not initialized');
    }

    logger.debug(`Taking screenshot of: ${selector}`);

    const element = await this.page.$(selector);
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }

    const screenshot = await element.screenshot({ encoding: 'base64' });
    return `data:image/png;base64,${screenshot}`;
  }

  /**
   * Analyze page structure and extract design tokens
   */
  async analyzePage(url: string, options: Partial<ConversionOptions> = {}): Promise<PageAnalysis> {
    await this.initialize(options.headless !== false);
    await this.navigateTo(url, options.viewport);

    const elements = await this.captureElements(options.selector);

    // Extract color palette
    const colors: string[] = [];
    const fonts: string[] = [];

    function extractFromElement(el: CapturedElement) {
      if (el.computedStyles.backgroundColor) {
        colors.push(el.computedStyles.backgroundColor);
      }
      if (el.computedStyles.color) {
        colors.push(el.computedStyles.color);
      }
      if (el.computedStyles.fontFamily) {
        fonts.push(el.computedStyles.fontFamily);
      }

      el.children.forEach(extractFromElement);
    }

    elements.forEach(extractFromElement);

    const title = await this.page!.title();
    const viewport = this.page!.viewport();

    return {
      url,
      title,
      viewport: {
        width: viewport?.width || 1440,
        height: viewport?.height || 900,
      },
      sections: elements,
      colorPalette: extractColorPalette(colors),
      fontFamilies: extractFontFamilies(fonts),
      timestamp: Date.now(),
    };
  }

  /**
   * Close browser
   */
  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
      logger.debug('Browser closed');
    }
  }
}





