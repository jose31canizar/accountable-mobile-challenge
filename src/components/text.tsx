import {createText} from '@shopify/restyle';
import {MAX_FONT_SIZE_MULTIPLIER, Theme} from '../theme';
const Text = createText<Theme>();

Text.defaultProps = {
  ...Text.defaultProps,
  maxFontSizeMultiplier: MAX_FONT_SIZE_MULTIPLIER,
  allowFontScaling: false,
};

export default Text;
