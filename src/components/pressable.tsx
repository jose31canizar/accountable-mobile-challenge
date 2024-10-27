import React, { PropsWithChildren } from "react";
import { Pressable as RNPressable } from "react-native";
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

type RestyleProps = SpacingProps<Theme> &
    LayoutProps<Theme> &
    BorderProps<Theme> &
    BackgroundColorProps<Theme>;

type PressableProps = RestyleProps & {
    onPress: () => void;
};

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
    spacing,
    layout,
    // @ts-ignore
    border,
    backgroundColor,
]);


export default function ({ children, ...rest }: PropsWithChildren<PressableProps>) {
    const props = useRestyle(
        // @ts-ignore
        restyleFunctions, rest);

    return <RNPressable {...props}>{children}</RNPressable>
}