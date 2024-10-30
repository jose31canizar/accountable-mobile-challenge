import { CoinResult } from "src/store/coin-store";

export const transformCoin = (currency: string) => (coin: CoinResult) =>{
  return {
    id: Number(coin.id),
    name: coin.fullName,
    symbol: coin?.name ?? '',
    displaySymbol: coin?.name ?? '',
    currentUSDPrice: coin?.pastHour?.high ?? 0,
    marketCap: coin?.marketData?.mktCap ?? 0,
    hourlyPriceChangePercentage: coin?.pastHour?.changePct ?? 0,
    supply: coin?.marketData?.supply ?? 0,
    totalDailyVolume: coin?.volumeData?.totalVolume24H ?? 0,
    highDay: coin?.pastDay?.high ?? 0,
    lowDay: coin?.pastDay?.low ?? 0
    }
}

export function transformCoins(coins: CoinResult[], currency: string = 'USD') {
    return coins.map((coin: CoinResult) => (transformCoin(currency)(coin)))
}