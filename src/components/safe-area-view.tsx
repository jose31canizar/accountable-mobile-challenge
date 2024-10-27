import {
  backgroundColor,
  BackgroundColorProps,
  composeRestyleFunctions,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
  useRestyle,
} from '@shopify/restyle';
import React, { PropsWithChildren, useCallback } from 'react';
import { ViewProps } from 'react-native';
import { Edge, useSafeAreaInsets } from 'react-native-safe-area-context';
import theme, { Theme } from 'src/theme';
import { Box } from './index';

const restyleFunctions = composeRestyleFunctions([
  spacing,
  backgroundColor,
  layout,
]);


interface SafeAreaViewProps
  extends BackgroundColorProps<Theme>,
  LayoutProps<Theme>,
  SpacingProps<Theme>,
  ViewProps {
  edges?: Edge[] | undefined;
}

const SafeAreaView = ({ children, edges, ...restProps }: PropsWithChildren<SafeAreaViewProps>) => {
  const insets = useSafeAreaInsets();
  // @ts-ignore
  const { style, ...rest } = useRestyle(restyleFunctions, restProps);

  const edgesStyle = useCallback(() => {
    if (edges.includes('bottom')) {
      return {
        paddingBottom: insets.bottom === 0 ? theme.spacing.m : insets.bottom,
      };
    } else {
      return { paddingTop: insets.top };
    }
  }, [edges, insets]);

  return (
    <Box
      style={[
        style,
        !edges || (edges.includes('top') && edges.includes('bottom'))
          ? {
            paddingTop: insets.top,
            paddingBottom:
              insets.bottom === 0 ? theme.spacing.m : insets.bottom,
          }
          : edgesStyle(),
      ]}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default SafeAreaView;
