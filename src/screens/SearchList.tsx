import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, SafeAreaView, Text, List, ListItem, TextInput } from "src/components";
import { observer } from "mobx-react";
import { HomeTabParamList, MainStackParamList } from 'src/types/navigation';
import { StatusBar } from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import { StoreContext } from 'src/context';
import { CoinItemProps } from "components/list-item";
import { showMessage } from "react-native-flash-message";

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
    const [query, setQuery] = useState('')
    const [isListRefreshing, setRefreshing] = useState(false)

    const fetchCoins = useCallback(async () => {
        try {
            setRefreshing(true)
            const newCoins = await store.coin.searchCoins({ query })
            setCoins(newCoins)
        } catch (err) {
            showMessage({ message: err });
        } finally {
            setRefreshing(false)
        }
    }, [coins])

    useEffect(() => {
        fetchCoins()
    }, [])


    const onRefresh = () => {
        setCoins([])
        fetchCoins()
    }

    const onItemPress = ({ name, symbol, id }) => {
        navigation.navigate('CoinDetail', { title: `${name} (${symbol})`, id })
    }

    return <Box
        flex={1}
        justifyContent="flex-start"
        backgroundColor="primary">
        <StatusBar barStyle="light-content" />
        <SafeAreaView flex={1} backgroundColor="primary">
            <TextInput value={query} />
            <List
                data={coins}
                renderItem={renderItem({ onPress: onItemPress })}
                onRefresh={onRefresh}
                refreshing={isListRefreshing}
            />
        </SafeAreaView>
    </Box>
})