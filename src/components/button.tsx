import {
    backgroundColor,
    BackgroundColorProps,
    border,
    BorderProps,
    color,
    ColorProps,
    composeRestyleFunctions,
    createVariant,
    layout,
    LayoutProps,
    ResponsiveValue,
    spacing,
    SpacingProps,
    useRestyle,
} from '@shopify/restyle';
import React from 'react';
import { Pressable, ViewStyle } from 'react-native';
import theme, { palette, Theme } from 'src/theme';
import { Box, Text } from './index'

type TextVariantsKeys = keyof typeof theme.textVariants;
type VariantKeys = Exclude<TextVariantsKeys, 'defaults'>;

export interface ButtonProps
    extends BackgroundColorProps<Theme>,
    BorderProps<Theme>,
    LayoutProps<Theme>,
    SpacingProps<Theme>,
    ColorProps<Theme> {
    onPress: () => void;
    disabled?: boolean;
    children: React.ReactChild;
    variant?: ResponsiveValue<VariantKeys, {}>;
    style?: ViewStyle;
    renderIcon?: () => React.ReactNode;
    startColor?: string;
}
const Button = ({
    onPress,
    disabled = false,
    renderIcon,
    children,
    ...rest
}: ButtonProps) => {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={{
                ...(rest.style || {}),
            }}
        >
            {({ pressed }) => (
                <Box
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius={16}
                    height={50}
                >
                    {renderIcon?.()}
                    <Text
                        variant={rest.variant}
                        color={rest.color}
                        textAlign="center"
                    >
                        {children}
                    </Text>
                </Box>
            )}
        </Pressable>
    );
};

export default Button;
