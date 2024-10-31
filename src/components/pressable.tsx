import React, { PropsWithChildren } from "react";
import { Pressable as RNPressable, View } from "react-native";
import {
    useRestyle,
    spacing,
    border,
    backgroundColor,
    SpacingProps,
    BorderProps,
    BackgroundColorProps,
    composeRestyleFunctions,
    layout,
    LayoutProps,
} from '@shopify/restyle';
import { Theme } from 'src/theme';

interface RestyleProps extends SpacingProps<Theme>,
    LayoutProps<Theme>,
    BorderProps<Theme>,
    BackgroundColorProps<Theme> { }

interface PressableProps extends RestyleProps {
    onPress: () => void;
};

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
    spacing,
    layout,
    //@ts-ignore
    border,
    backgroundColor
]);


export default function ({ children, onPress, ...rest }: PropsWithChildren<PressableProps>) {
    const props = useRestyle(
        restyleFunctions, rest);

    return <RNPressable {...props} onPress={onPress}>
        {children}
    </RNPressable>
}