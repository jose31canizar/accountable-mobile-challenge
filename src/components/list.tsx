import { FlashList } from '@shopify/flash-list'
import React, { useState } from 'react'
import { RefreshControl } from 'react-native';
import { palette } from 'src/theme';
import { keyExtractor } from 'src/utils/list';
import { Box, Text } from './index'

interface ListProps {
  data: any[];
  renderItem: (arg0: any) => React.JSX.Element;
  estimatedItemSize?: number;
  onRefresh?: () => void;
  onEndReached?: () => void;
  refreshing?: boolean;
}



export default function ({ data, renderItem, estimatedItemSize = 200, onRefresh, refreshing, onEndReached }: ListProps) {
  return <FlashList
    onEndReachedThreshold={0.2}
    contentContainerStyle={{
      backgroundColor: palette.primary,
    }}
    {...(onEndReached ? { onEndReached } : {})}
    ListHeaderComponent={
      <Box
        flex={1}
        alignItems="flex-start"
        padding='s'
        backgroundColor="primary"
      >{
          refreshing ? <Text variant='title' color='black'>Loading...</Text> :
            <Text variant='title' color='black'>Cryptocurrencies</Text>
        }
      </Box>
    }
    data={data}
    renderItem={renderItem}
    keyExtractor={keyExtractor}
    showsVerticalScrollIndicator={false}
    ListEmptyComponent={() => (
      <Box flex={1} alignItems='center' backgroundColor='black50' paddingVertical='m'>
        <Text variant='title' color='black10'>No coin data retrieved.</Text>
      </Box>
    )}
    estimatedItemSize={estimatedItemSize}
    refreshing={refreshing}
    onRefresh={onRefresh}
  />
}