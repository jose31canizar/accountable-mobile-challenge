import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, SafeAreaView, Text, List, ListItem, TextInput, Button, SearchBar } from "src/components";
import { observer } from "mobx-react";
import { HomeTabParamList, MainStackParamList } from 'src/types/navigation';
import { NativeSyntheticEvent, StatusBar, TextInputChangeEventData } from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import { StoreContext } from 'src/context';
import { CoinItemProps } from "components/list-item";
import { showMessage } from "react-native-flash-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DEVICE_WIDTH } from "src/utils/dimensions";
import { palette } from "src/theme";
import { renderItem } from "./CoinOverview";

type OverviewNavigationProps = CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, 'CoinOverview'>,
    NativeStackScreenProps<MainStackParamList>
>;

const INPUT_PLACEHOLDER = "Search a crypto coin..."


export default observer(function ({
    navigation,
    route,
}: OverviewNavigationProps) {

    const { store } = useContext(StoreContext)
    const [coins, setCoins] = useState([])
    const [error, setError] = useState(false)
    const [query, setQuery] = useState('')
    const [isListRefreshing, setRefreshing] = useState(false)

    const searchCoins = useCallback(async () => {
        try {
            setRefreshing(true)
            const newCoins = await store.coin.queryCoins({ query })
            setCoins(newCoins)
        } catch (err) {
            showMessage({ message: err });
        } finally {
            setRefreshing(false)
        }
    }, [coins, query])

    const onSearch = () => {
        if (query.length > 2) {
            searchCoins()
        }
    }

    const onRefresh = () => {
        setCoins([])
        searchCoins()
    }

    const onItemPress = ({ name, symbol, id }) => {
        if (store.network.isOffline) {
            showMessage({ message: "Oh no! Looks like we've lost connection 😔" })
        } else {
            navigation.navigate('CoinDetail', { title: `${name} (${symbol})`, id })
        }
    }

    const onChangeText = (value: string) => {
        setQuery(value)
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
        backgroundColor="primary">
        <StatusBar barStyle="light-content" />
        <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            extraHeight={250}
            keyboardOpeningTime={0}
        >
            <SearchBar
                placeholder={INPUT_PLACEHOLDER}
                onSearch={onSearch}
                query={query}
                onChangeText={onChangeText}
                error={error}
                disabled={store.network.isOffline}
            />
            <List
                data={coins}
                renderItem={renderItem({ onPress: onItemPress, onFavoritePress })}
                onRefresh={onRefresh}
                refreshing={isListRefreshing}
            />
        </KeyboardAwareScrollView>
    </Box>
})