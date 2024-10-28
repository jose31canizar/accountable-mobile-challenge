import { CoinResult } from "src/store/coin-store";


export function transformCoins(coins: CoinResult[]) {
    return coins.map((coin: CoinResult) => ({
        id: Number(coin.Id),
        name: coin.CoinName,
        symbol: coin.Symbol,
        currentUSDPrice: 0,
        marketCapRank: 0,
        dailyPriceChangePercentage: coin.FakePriceChangePercentage24h,
        weeklyPriceChangePercentage: coin.FakePriceChangePercentage7d
      }))
}