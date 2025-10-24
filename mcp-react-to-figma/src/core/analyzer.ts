/**
 * Analyze captured elements and extract design information
 */

import { CapturedElement, ComputedStyles } from '../types/dom.js';
import { isFlexLayout, isGridLayout, parsePx } from '../utils/helpers.js';

export interface AnalyzedLayout {
  type: 'flex' | 'grid' | 'absolute' | 'static';
  direction?: 'horizontal' | 'vertical';
  alignment?: {
    main: string;
    cross: string;
  };
  spacing?: number;
  gridTemplate?: {
    columns: string;
    rows: string;
  };
}

export interface AnalyzedComponent {
  element: CapturedElement;
  layout: AnalyzedLayout;
  isComponent: boolean;
  componentType?: 'button' | 'card' | 'text' | 'image' | 'container';
  children: AnalyzedComponent[];
}

export class StyleAnalyzer {
  /**
   * Analyze layout type and properties
   */
  analyzeLayout(styles: ComputedStyles): AnalyzedLayout {
    if (isFlexLayout(styles.display)) {
      return this.analyzeFlexLayout(styles);
    }

    if (isGridLayout(styles.display)) {
      return this.analyzeGridLayout(styles);
    }

    if (styles.position === 'absolute' || styles.position === 'fixed') {
      return { type: 'absolute' };
    }

    return { type: 'static' };
  }

  /**
   * Analyze flexbox layout
   */
  private analyzeFlexLayout(styles: ComputedStyles): AnalyzedLayout {
    const direction =
      styles.flexDirection === 'column' || styles.flexDirection === 'column-reverse'
        ? 'vertical'
        : 'horizontal';

    const spacing = parsePx(styles.gap || '0');

    return {
      type: 'flex',
      direction,
      alignment: {
        main: styles.justifyContent || 'flex-start',
        cross: styles.alignItems || 'stretch',
      },
      spacing,
    };
  }

  /**
   * Analyze grid layout
   */
  private analyzeGridLayout(styles: ComputedStyles): AnalyzedLayout {
    return {
      type: 'grid',
      gridTemplate: {
        columns: styles.gridTemplateColumns || 'none',
        rows: styles.gridTemplateRows || 'none',
      },
      spacing: parsePx(styles.gap || '0'),
    };
  }

  /**
   * Detect component type based on element characteristics
   */
  detectComponentType(
    element: CapturedElement,
  ): 'button' | 'card' | 'text' | 'image' | 'container' | null {
    const tag = element.tagName.toLowerCase();
    const hasText = !!element.textContent && element.textContent.trim().length > 0;
    const hasChildren = element.children.length > 0;
    const styles = element.computedStyles;

    // Button detection
    if (tag === 'button' || (tag === 'a' && hasText && !hasChildren)) {
      return 'button';
    }

    // Image detection
    if (tag === 'img' || (styles.backgroundImage && styles.backgroundImage !== 'none')) {
      return 'image';
    }

    // Text detection
    if (
      hasText &&
      !hasChildren &&
      ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)
    ) {
      return 'text';
    }

    // Card detection (container with shadow and border radius)
    if (
      hasChildren &&
      styles.boxShadow &&
      styles.boxShadow !== 'none' &&
      parsePx(styles.borderRadius) > 0
    ) {
      return 'card';
    }

    // Container detection
    if (hasChildren && (isFlexLayout(styles.display) || isGridLayout(styles.display))) {
      return 'container';
    }

    return null;
  }

  /**
   * Determine if element should be a Figma component
   */
  isReusableComponent(element: CapturedElement): boolean {
    const type = this.detectComponentType(element);

    // Buttons, cards, and complex containers are good candidates for components
    return type === 'button' || type === 'card';
  }

  /**
   * Analyze element and its children recursively
   */
  analyzeElement(element: CapturedElement): AnalyzedComponent {
    const layout = this.analyzeLayout(element.computedStyles);
    const componentType = this.detectComponentType(element);
    const isComponent = this.isReusableComponent(element);

    const children = element.children.map((child) => this.analyzeElement(child));

    return {
      element,
      layout,
      isComponent,
      componentType: componentType || undefined,
      children,
    };
  }

  /**
   * Analyze entire page structure
   */
  analyzePage(elements: CapturedElement[]): AnalyzedComponent[] {
    return elements.map((el) => this.analyzeElement(el));
  }
}





