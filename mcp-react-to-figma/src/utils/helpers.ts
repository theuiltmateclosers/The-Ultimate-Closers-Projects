/**
 * Helper utilities for conversion and parsing
 */

import { RGB, RGBA } from '../types/figma.js';

/**
 * Convert CSS color to Figma RGB format (0-1 range)
 */
export function cssColorToRGB(color: string): RGB | null {
  // Handle rgb/rgba format
  const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1]) / 255,
      g: parseInt(rgbaMatch[2]) / 255,
      b: parseInt(rgbaMatch[3]) / 255,
    };
  }

  // Handle hex format
  const hexMatch = color.match(/^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (hexMatch) {
    return {
      r: parseInt(hexMatch[1], 16) / 255,
      g: parseInt(hexMatch[2], 16) / 255,
      b: parseInt(hexMatch[3], 16) / 255,
    };
  }

  // Handle short hex format
  const shortHexMatch = color.match(/^#([a-f\d])([a-f\d])([a-f\d])$/i);
  if (shortHexMatch) {
    return {
      r: parseInt(shortHexMatch[1] + shortHexMatch[1], 16) / 255,
      g: parseInt(shortHexMatch[2] + shortHexMatch[2], 16) / 255,
      b: parseInt(shortHexMatch[3] + shortHexMatch[3], 16) / 255,
    };
  }

  // Handle named colors (simplified - could be expanded)
  const namedColors: Record<string, RGB> = {
    white: { r: 1, g: 1, b: 1 },
    black: { r: 0, g: 0, b: 0 },
    red: { r: 1, g: 0, b: 0 },
    green: { r: 0, g: 1, b: 0 },
    blue: { r: 0, g: 0, b: 1 },
    transparent: { r: 0, g: 0, b: 0 },
  };

  return namedColors[color.toLowerCase()] || null;
}

/**
 * Convert CSS color with opacity to Figma RGBA
 */
export function cssColorToRGBA(color: string, opacity: string = '1'): RGBA | null {
  const rgb = cssColorToRGB(color);
  if (!rgb) return null;

  return {
    ...rgb,
    a: parseFloat(opacity),
  };
}

/**
 * Parse CSS pixel value to number
 */
export function parsePx(value: string): number {
  const match = value.match(/^([\d.]+)px$/);
  return match ? parseFloat(match[1]) : 0;
}

/**
 * Parse CSS box-shadow to Figma effect
 */
export function parseShadow(shadow: string): Array<{
  type: 'DROP_SHADOW' | 'INNER_SHADOW';
  color: RGBA;
  offset: { x: number; y: number };
  radius: number;
  spread: number;
}> | null {
  if (!shadow || shadow === 'none') return null;

  // Simplified parser - handles basic drop-shadow
  const match = shadow.match(/([\d.]+)px\s+([\d.]+)px\s+([\d.]+)px\s+([\d.]+)px\s+(.+)/);
  if (!match) return null;

  const offsetX = parseFloat(match[1]);
  const offsetY = parseFloat(match[2]);
  const blur = parseFloat(match[3]);
  const spread = parseFloat(match[4]);
  const colorStr = match[5];

  const color = cssColorToRGBA(colorStr);
  if (!color) return null;

  return [
    {
      type: 'DROP_SHADOW',
      color,
      offset: { x: offsetX, y: offsetY },
      radius: blur,
      spread,
    },
  ];
}

/**
 * Parse CSS border-radius
 */
export function parseBorderRadius(borderRadius: string): number | [number, number, number, number] {
  const values = borderRadius.split(/\s+/).map((v) => parsePx(v));

  if (values.length === 1) {
    return values[0];
  }

  if (values.length === 4) {
    return [values[0], values[1], values[2], values[3]];
  }

  return 0;
}

/**
 * Detect if element uses flexbox
 */
export function isFlexLayout(display: string): boolean {
  return display === 'flex' || display === 'inline-flex';
}

/**
 * Detect if element uses grid
 */
export function isGridLayout(display: string): boolean {
  return display === 'grid' || display === 'inline-grid';
}

/**
 * Map CSS font-weight to Figma font style
 */
export function mapFontWeight(weight: string): string {
  const weightMap: Record<string, string> = {
    '100': 'Thin',
    '200': 'Extra Light',
    '300': 'Light',
    '400': 'Regular',
    '500': 'Medium',
    '600': 'Semi Bold',
    '700': 'Bold',
    '800': 'Extra Bold',
    '900': 'Black',
    normal: 'Regular',
    bold: 'Bold',
  };

  return weightMap[weight] || 'Regular';
}

/**
 * Extract unique colors from captured elements
 */
export function extractColorPalette(colors: string[]): string[] {
  const unique = new Set(
    colors.filter((c) => c && c !== 'transparent' && c !== 'rgba(0, 0, 0, 0)'),
  );
  return Array.from(unique);
}

/**
 * Extract unique font families
 */
export function extractFontFamilies(fonts: string[]): string[] {
  const unique = new Set(
    fonts
      .map((f) => f.split(',')[0].trim().replace(/['"]/g, ''))
      .filter((f) => f && !f.includes('system')),
  );
  return Array.from(unique);
}

/**
 * Generate a safe Figma node ID
 */
export function generateNodeId(): string {
  return `node_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Slugify a string for use as identifier
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}




