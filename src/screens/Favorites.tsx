import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, SafeAreaView, Text, List, ListItem } from "src/components";
import { observer } from "mobx-react";
import { HomeTabParamList, MainStackParamList } from 'src/types/navigation';
import { StatusBar } from "react-native";
import { useContext } from "react";
import { StoreContext } from 'src/context';
import { CoinItemProps } from "components/list-item";
import { renderItem } from "./CoinOverview";


type OverviewNavigationProps = CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, 'CoinOverview'>,
    NativeStackScreenProps<MainStackParamList>
>;

export default observer(function ({
    navigation,
    route,
}: OverviewNavigationProps) {

    const { store } = useContext(StoreContext)

    const onItemPress = ({ name, symbol, id }) => {
        navigation.navigate('CoinDetail', { title: `${name} (${symbol})`, id })
    }

    const onFavoritePress = ({ id }) => {
        if (store.coin.favorites.has(id)) {
            store.coin.removeCoin({ id })
        } else {
            store.coin.saveCoin({ id })
        }
    }

    return <Box
        flex={1}
        justifyContent="flex-start"
        backgroundColor="primary"
    >
        <StatusBar barStyle="light-content" />
        <SafeAreaView flex={1} backgroundColor="primary">
            <List
                data={Array.from(store.coin.favorites.values())}
                renderItem={renderItem({ onPress: onItemPress, onFavoritePress })}
            />
        </SafeAreaView>
    </Box>
})