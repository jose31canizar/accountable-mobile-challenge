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

type OverviewNavigationProps = CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, 'CoinOverview'>,
    NativeStackScreenProps<MainStackParamList>
>;

export interface paginationProps {
    page?: number;
    limit?: number;
}

interface RenderItemProps {
    item: CoinItemProps;
}

interface RenderItemGeneratorProps {
    onPress: ({ id, name, symbol: string }) => void
}

const INPUT_PLACEHOLDER = "Search a crypto coin..."

const renderItem = ({ onPress }: RenderItemGeneratorProps) => (props: RenderItemProps) => {
    const { id, name, symbol, currentUSDPrice, marketCapRank, dailyPriceChangePercent, weeklyPriceChangePercent } = props.item;
    return <ListItem
        onPress={() => onPress({ id, name, symbol })}
        id={id}
        name={name}
        symbol={symbol}
        currentUSDPrice={currentUSDPrice}
        marketCapRank={marketCapRank}
        dailyPriceChangePercent={dailyPriceChangePercent}
        weeklyPriceChangePercent={weeklyPriceChangePercent}
    />
}

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
        navigation.navigate('CoinDetail', { title: `${name} (${symbol})`, id })
    }

    const onChangeText = (value: string) => {
        setQuery(value)
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
                renderItem={renderItem({ onPress: onItemPress })}
                onRefresh={onRefresh}
                refreshing={isListRefreshing}
            />
        </KeyboardAwareScrollView>
    </Box>
})