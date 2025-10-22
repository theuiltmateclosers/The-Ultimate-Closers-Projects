/**
 * Types DOM pour la capture et analyse
 */

export interface CapturedElement {
  selector: string;
  tagName: string;
  boundingBox: BoundingBox;
  computedStyles: ComputedStyles;
  children: CapturedElement[];
  textContent?: string;
  attributes: Record<string, string>;
  screenshot?: string; // Base64
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface ComputedStyles {
  // Layout
  display: string;
  position: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;

  // Box model
  width: string;
  height: string;
  margin: string;
  marginTop: string;
  marginRight: string;
  marginBottom: string;
  marginLeft: string;
  padding: string;
  paddingTop: string;
  paddingRight: string;
  paddingBottom: string;
  paddingLeft: string;

  // Background
  backgroundColor: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;

  // Border
  border: string;
  borderRadius: string;
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
  borderBottomRightRadius?: string;
  borderBottomLeftRadius?: string;
  borderColor: string;
  borderWidth: string;
  borderStyle: string;

  // Typography
  color: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: string;
  textAlign: string;
  textTransform?: string;
  textDecoration?: string;

  // Effects
  boxShadow?: string;
  opacity: string;
  filter?: string;
  transform?: string;

  // Other
  overflow?: string;
  zIndex?: string;
}

export interface PageAnalysis {
  url: string;
  title: string;
  viewport: {
    width: number;
    height: number;
  };
  sections: CapturedElement[];
  colorPalette: string[];
  fontFamilies: string[];
  timestamp: number;
}

export interface ConversionOptions {
  url: string;
  selector?: string;
  pageName?: string;
  createComponents?: boolean;
  responsive?: boolean;
  includeScreenshots?: boolean;
  headless?: boolean;
  viewport?: {
    width: number;
    height: number;
  };
}

export interface ConversionResult {
  success: boolean;
  figmaFileUrl?: string;
  figmaPageId?: string;
  nodesCreated?: number;
  message?: string;
  error?: string;
}




