import { CoinResult } from "src/store/coin-store";

export const transformCoin = (currency: string) => (coin: CoinResult) =>{
  return {
    id: Number(coin.CoinInfo.Id),
    name: coin.CoinInfo.Name,
    symbol: coin?.RAW?.[currency]?.FROMSYMBOL ?? '',
    displaySymbol: coin?.DISPLAY?.[currency]?.FROMSYMBOL ?? '',
    currentUSDPrice: coin?.RAW?.[currency]?.PRICE ?? 0,
    marketCap: coin?.RAW?.[currency]?.PRICE ?? 0,
    dailyPriceChangePercentage: coin?.RAW?.[currency]?.CHANGEPCT24HOUR ?? 0,
    circulatingSupply: coin?.RAW?.[currency]?.CIRCULATINGSUPPLY ?? 0,
    supply: coin?.RAW?.[currency]?.SUPPLY ?? 0,
    totalDailyVolume: coin?.RAW?.[currency]?.TOTALVOLUME24H ?? 0,
    highDay: coin?.RAW?.[currency]?.HIGHDAY ?? 0,
    lowDay: coin?.RAW?.[currency]?.LOWDAY ?? 0,
    }
}

export function transformCoins(coins: CoinResult[], currency: string = 'USD') {
    return coins.map((coin: CoinResult) => (transformCoin(currency)(coin)))
}