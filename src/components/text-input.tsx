import React, { LegacyRef, useState } from 'react';
import {
  Appearance,
  TextInput as RNTextInput,
  TextInput,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { palette } from 'src/theme';
import { RFValue } from 'src/utils/font';
import { Box, Text } from './index'

interface YTextInputProps extends ViewStyle, TextInputProps {
  style?: ViewStyle;
  value: string;
  enumerated?: boolean;
  index?: number;
  placeholder?: string;
  maxLength?: number;
  onChangeText?: (val: string) => void;
  color?: string;
  blueBackground?: boolean;
  onFocusHandler?: (event?: any) => void;
  onBlurHandler?: (event?: any) => void;
  flexEnabled?: boolean;
  textInputPadding?: number;
  enumeratedPaddingTop?: number;
}
export default React.forwardRef(function (
  props: YTextInputProps,
  ref: LegacyRef<TextInput> | undefined,
) {
  const {
    style,
    value,
    flexEnabled,
    onChangeText,
    onFocusHandler,
    onBlurHandler,
    textInputPadding = 16,
    enumeratedPaddingTop = 12,
    ...rest
  } = props;
  const [focused, setFocused] = useState(false);

  const onFocus = event => {
    setFocused(true);
    onFocusHandler?.(event);
  };

  const onBlur = event => {
    setFocused(false);
    onBlurHandler?.(event);
  };

  const focusedStyle = {
    borderColor: palette.black30,
    borderWidth: 1,
    paddingVertical: textInputPadding - 1,
    paddingHorizontal: textInputPadding - 1,
  };

  return (
    <Box
      justifyContent="center"
      {...(flexEnabled ? { flex: 1 } : {})}
    >
      <RNTextInput
        ref={ref}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        allowFontScaling={false}
        style={[
          {
            paddingHorizontal: textInputPadding,
            paddingVertical: textInputPadding,
            backgroundColor: rest.backgroundColor || palette.black10,
            fontSize: RFValue(16),
            borderRadius: 8,
          },
          focused ? focusedStyle : {},
          props.enumerated ? { paddingLeft: 58 } : {},
          style,
        ]}
        keyboardAppearance={
          Appearance.getColorScheme() === 'dark' ? 'dark' : 'default'
        }
        onChangeText={onChangeText}
        {...rest}
      />
    </Box>
  );
});
