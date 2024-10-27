import { NavigatorScreenParams } from "@react-navigation/core";

export type HomeTabParamList = {
    CoinOverview: {};
    SearchList: {};
  };


  export type MainStackParamList =
  {
    HomeTab: NavigatorScreenParams<HomeTabParamList>,
    CoinDetail: { id: string, title: string }
  };