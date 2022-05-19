import { Syringe } from 'mana-syringe';
import type { DisplayObject } from '../display-objects';

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type
 */
export enum PropertySyntax {
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#coordinate
   */
  COORDINATE = '<coordinate>',
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#color
   */
  COLOR = '<color>',
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#paint
   */
  PAINT = '<paint>',
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#number
   */
  NUMBER = '<number>',
  /**
   * <number> with range 0..1
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#opacity_value
   */
  OPACITY_VALUE = '<opacity-value>',
  /**
   * <number> with range 0..Infinity
   */
  SHADOW_BLUR = '<shadow-blur>',
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#length
   */
  LENGTH = '<length>',
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#percentage
   */
  PERCENTAGE = '<percentage>',
  LENGTH_PERCENTAGE = '<length> | <percentage>',

  LENGTH_PERCENTAGE_12 = '[<length> | <percentage>]{1,2}',
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/margin#formal_syntax
   */
  LENGTH_PERCENTAGE_14 = '[<length> | <percentage>]{1,4}',
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#list-of-ts
   */
  LIST_OF_POINTS = '<list-of-points>',
  PATH = '<path>',
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/filter#formal_syntax
   */
  FILTER = '<filter>',
  Z_INDEX = '<z-index>',
  OFFSET_PATH = '<offset-path>',
  OFFSET_DISTANCE = '<offset-distance>',
  CLIP_PATH = '<clip-path>',
  TRANSFORM = '<transform>',
  TRANSFORM_ORIGIN = '<transform-origin>',
  TEXT = '<text>',
  TEXT_TRANSFORM = '<text-transform>',
}

export interface PropertyMetadata {
  name: string;

  /**
   * The interpolable flag indicates whether a property can be animated smoothly.
   * Default to `false`.
   */
  interpolable?: boolean;

  /**
   * The property will inherit by default if no value is specified.
   * Default to `false`.
   */
  inherited?: boolean;

  /**
   * This property affects only one field on ComputedStyle, and can be set
   * directly during inheritance instead of forcing a recalc.
   */
  independent?: boolean;

  /**
   * This specifies the default value for this field.
   * - for keyword fields, this is the initial keyword
   * - for other fields, this is a string containg the C++ expression that is used to initialise the field.
   */
  defaultValue?: string;

  /**
   * The resolved value used for getComputedStyle() depends on layout for this
   * property, which means we may need to update layout to return the correct
   * value from getComputedStyle().
   */
  layoutDependent?: boolean;

  /**
   * This specifies all valid keyword values for the property.
   */
  keywords?: string[];

  /**
   * eg. strokeWidth is an alias of lineWidth
   */
  alias?: string[];

  /**
   * sort before init attributes according to this priority
   */
  parsePriority?: number;

  /**
   * eg. <color> <paint> <number>
   */
  syntax?: string;
}

export const StyleValueRegistry = Syringe.defineToken('StyleValueRegistry');
// eslint-disable-next-line @typescript-eslint/no-redeclare
export interface StyleValueRegistry {
  recalc: (displayObject: DisplayObject) => void;
  registerMetadata: (metadata: PropertyMetadata) => void;
  unregisterMetadata: (name: string) => void;
  getMetadata: (name: string) => PropertyMetadata;
}
