import React from 'react';
import { Pressable } from 'react-native';
import { hideMessage, MessageComponentProps } from 'react-native-flash-message';
import theme from 'src/theme';
import { Close } from 'src/icons';
import { Box, Text, SafeAreaView } from './index'

export type TMessage = {
  message: string;
  onPress?: () => void;
  onClick?: () => void;
  isClosable?: boolean;
};
interface FlashBoxProps extends MessageComponentProps {
  message: TMessage;
  icon: any;
}
export default function ({
  message,
  icon,
  renderFlashMessageIcon,
}: FlashBoxProps) {
  return (
    <Pressable
      onPress={() => {
        message.onPress?.();
      }}
    >
      <SafeAreaView>
        <Box
          marginVertical="xs"
          marginHorizontal="s"
        >
          <Box
            padding="s"
            backgroundColor="black70"
            borderRadius={16}
            justifyContent="flex-start"
            flexGrow={1}
          >
            <Box flexDirection="row">
              <Box
                flex={icon || renderFlashMessageIcon ? 7 : 1}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text
                  variant="subtitle"
                  color="black10"
                >
                  {message.message}
                </Text>
              </Box>
              {message.isClosable ? (
                <Pressable onPress={() => hideMessage()}>
                  <Close color={theme.colors.primary} />
                </Pressable>
              ) : null}
            </Box>
            {icon ? (
              <Box
                alignItems="center"
                justifyContent="center"
                flex={1}
                paddingTop="xs"
              >
                <Pressable
                  onPress={() => {
                    message.onClick();
                  }}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 8,
                    flex: 1,
                    width: '100%',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    color="black"
                    margin="xs"
                  >
                    {icon.icon}
                  </Text>
                </Pressable>
              </Box>
            ) : null}
          </Box>
        </Box>
      </SafeAreaView>
    </Pressable>
  );
}
