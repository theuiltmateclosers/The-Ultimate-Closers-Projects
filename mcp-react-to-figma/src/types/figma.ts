/**
 * Types Figma pour la conversion DOM → Figma
 */

export interface FigmaNode {
  id?: string;
  name: string;
  type: FigmaNodeType;
  children?: FigmaNode[];
  properties?: FigmaNodeProperties;
}

export type FigmaNodeType =
  | 'FRAME'
  | 'GROUP'
  | 'RECTANGLE'
  | 'TEXT'
  | 'COMPONENT'
  | 'INSTANCE'
  | 'VECTOR'
  | 'LINE'
  | 'ELLIPSE';

export interface FigmaNodeProperties {
  // Layout
  width?: number;
  height?: number;
  x?: number;
  y?: number;

  // Auto Layout
  layoutMode?: 'HORIZONTAL' | 'VERTICAL' | 'NONE';
  layoutAlign?: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH';
  primaryAxisSizingMode?: 'FIXED' | 'AUTO';
  counterAxisSizingMode?: 'FIXED' | 'AUTO';
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  itemSpacing?: number;

  // Fill
  fills?: FigmaFill[];

  // Stroke
  strokes?: FigmaStroke[];
  strokeWeight?: number;

  // Corner
  cornerRadius?: number;
  rectangleCornerRadii?: [number, number, number, number];

  // Effects
  effects?: FigmaEffect[];

  // Text specific
  characters?: string;
  fontSize?: number;
  fontName?: FigmaFontName;
  fontWeight?: number;
  textAlignHorizontal?: 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED';
  textAlignVertical?: 'TOP' | 'CENTER' | 'BOTTOM';
  lineHeight?: FigmaLineHeight;
  letterSpacing?: FigmaLetterSpacing;

  // Constraints
  constraints?: {
    horizontal: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'SCALE';
    vertical: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'SCALE';
  };

  // Opacity
  opacity?: number;

  // Blend mode
  blendMode?: string;

  // Clipping
  clipsContent?: boolean;
}

export interface FigmaFill {
  type: 'SOLID' | 'GRADIENT_LINEAR' | 'GRADIENT_RADIAL' | 'IMAGE';
  color?: RGB;
  opacity?: number;
  imageRef?: string;
  gradientStops?: GradientStop[];
}

export interface FigmaStroke {
  type: 'SOLID';
  color: RGB;
  opacity?: number;
}

export interface FigmaEffect {
  type: 'DROP_SHADOW' | 'INNER_SHADOW' | 'LAYER_BLUR';
  color?: RGBA;
  offset?: { x: number; y: number };
  radius?: number;
  spread?: number;
  visible?: boolean;
}

export interface RGB {
  r: number; // 0-1
  g: number; // 0-1
  b: number; // 0-1
}

export interface RGBA extends RGB {
  a: number; // 0-1
}

export interface GradientStop {
  position: number; // 0-1
  color: RGBA;
}

export interface FigmaFontName {
  family: string;
  style: string;
}

export interface FigmaLineHeight {
  value: number;
  unit: 'PIXELS' | 'PERCENT' | 'AUTO';
}

export interface FigmaLetterSpacing {
  value: number;
  unit: 'PIXELS' | 'PERCENT';
}

// API Response types
export interface FigmaFileResponse {
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  version: string;
  document: FigmaDocumentNode;
}

export interface FigmaDocumentNode {
  id: string;
  name: string;
  type: 'DOCUMENT';
  children: FigmaPageNode[];
}

export interface FigmaPageNode {
  id: string;
  name: string;
  type: 'CANVAS';
  children: FigmaNode[];
}

// API Request types
export interface CreateFrameRequest {
  name: string;
  width: number;
  height: number;
  x?: number;
  y?: number;
  backgroundColor?: RGB;
  children?: FigmaNode[];
}

export interface FigmaClientConfig {
  accessToken: string;
  fileKey: string;
}





