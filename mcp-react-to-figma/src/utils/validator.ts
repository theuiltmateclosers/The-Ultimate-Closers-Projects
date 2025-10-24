/**
 * Input validation utilities
 */

import { ConversionOptions } from '../types/dom.js';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validateUrl(url: string): void {
  try {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new ValidationError(`Invalid protocol: ${parsed.protocol}. Must be http: or https:`);
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }
    throw new ValidationError(`Invalid URL: ${url}`);
  }
}

export function validateFigmaToken(token: string): void {
  if (!token || token.trim() === '') {
    throw new ValidationError('Figma access token is required');
  }

  if (token === 'your_figma_token_here') {
    throw new ValidationError('Please set a valid Figma access token in .env file');
  }

  // Figma tokens are typically 39-44 characters long
  if (token.length < 30) {
    throw new ValidationError('Figma access token appears to be invalid (too short)');
  }
}

export function validateFigmaFileKey(fileKey: string): void {
  if (!fileKey || fileKey.trim() === '') {
    throw new ValidationError('Figma file key is required');
  }

  if (fileKey === 'your_file_key_here') {
    throw new ValidationError('Please set a valid Figma file key in .env file');
  }

  // Figma file keys are typically alphanumeric
  if (!/^[a-zA-Z0-9]+$/.test(fileKey)) {
    throw new ValidationError('Figma file key contains invalid characters');
  }
}

export function validateConversionOptions(options: ConversionOptions): void {
  validateUrl(options.url);

  if (options.selector && typeof options.selector !== 'string') {
    throw new ValidationError('Selector must be a string');
  }

  if (options.pageName && typeof options.pageName !== 'string') {
    throw new ValidationError('Page name must be a string');
  }

  if (options.viewport) {
    if (options.viewport.width <= 0 || options.viewport.height <= 0) {
      throw new ValidationError('Viewport dimensions must be positive');
    }
    if (options.viewport.width > 10000 || options.viewport.height > 10000) {
      throw new ValidationError('Viewport dimensions are too large (max 10000px)');
    }
  }
}

export function sanitizePageName(name: string): string {
  // Remove invalid characters for Figma page names
  return name
    .replace(/[<>:"/\\|?*]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 100); // Limit length
}

export function sanitizeNodeName(name: string): string {
  return name.replace(/\s+/g, ' ').trim().substring(0, 50);
}





