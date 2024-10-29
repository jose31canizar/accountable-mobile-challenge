import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  BottomTabDescriptorMap,
  BottomTabNavigationEventMap,
} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import type {
  NavigationHelpers,
  ParamListBase,
  RouteProp,
  TabNavigationState,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react';
import React from 'react';
import {
  Box,
  Text,
  Pressable,
  SafeAreaView
} from 'src/components';
import { Coin, Search, Star } from 'src/icons';
import { CoinOverview, Favorites, SearchList } from 'src/screens';
import { palette } from 'src/theme';
import { MainStackParamList } from 'src/types/navigation';

const TAB_ICONS = (
  isFocused: boolean,
  size = 24,
) => ({
  CoinOverview: (
    <Coin
      size={size}
      selected={isFocused}
      color={palette.primary}
    />
  ),
  SearchList: (
    <Search
      size={size}
      selected={isFocused}
      disabled={false}
      color={palette.primary}
    />
  ),
  Favorites: (
    <Star
      size={size}
      selected={isFocused}
      disabled={false}
      color={palette.primary}
    />
  )
});

type TabbarProps = {
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
};

interface TabItemProps extends TabbarProps {
  route: RouteProp<ParamListBase>;
  index: number;
}

const Tab = createBottomTabNavigator();

type MainTabProps = NativeStackScreenProps<MainStackParamList, 'HomeTab'>;

export default observer(function ({ route }: MainTabProps) {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="CoinOverview"
        component={CoinOverview}
      />
      <Tab.Screen
        name="SearchList"
        component={SearchList}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
      />
    </Tab.Navigator>
  );
})

const TabItem = observer(function ({
  descriptors,
  navigation,
  state,
  route,
  index,
}: TabItemProps) {
  const { options } = descriptors[route.key];
  const label =
    options.tabBarLabel !== undefined
      ? options.tabBarLabel
      : options.title !== undefined
        ? options.title
        : route.name;

  const isFocused = state.index === index;

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      // The `merge: true` option makes sure that the params inside the tab screen are preserved
      navigation.navigate(route.name);
    }
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
    >
      {
        TAB_ICONS(isFocused)[
        label as string
        ]
      }
    </Pressable>
  );
});


function TabBar({ state, descriptors, navigation }: TabbarProps) {
  return (
    <SafeAreaView
      edges={['bottom']}
      marginBottom="m"
      marginTop='l'
      flexDirection="row"
      alignItems="center"
      justifyContent="space-around"
    >
      <TabItem
        descriptors={descriptors}
        navigation={navigation}
        state={state}
        route={state.routes[0]}
        index={0}
      />
      <TabItem
        descriptors={descriptors}
        navigation={navigation}
        state={state}
        route={state.routes[1]}
        index={1}
      />
      <TabItem
        descriptors={descriptors}
        navigation={navigation}
        state={state}
        route={state.routes[2]}
        index={2}
      />
    </SafeAreaView>
  );
}
