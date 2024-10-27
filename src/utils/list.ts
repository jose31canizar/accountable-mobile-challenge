import { CoinItemProps } from "components/list-item";

export const keyExtractor = (item: CoinItemProps, index: number) => `${item.id}`;