import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, Method } from "axios";
import {
    API_URL
  } from '@env';
import { paginationProps } from "src/screens/CoinOverview";
import { CoinHistoryProps } from "src/store/coin-store";

  const NETWORK_REQUEST_TIMEOUT_MESSAGE = "Network request timed out"

  type internalOptions = {
    passError: string;
    fallbackMessage: string;
    excludeHeaders: boolean;
  };

  type requestProps = {
    method: Method;
    path: string;
    params: any[];
    options?: {headers: Record<string, string>};
    internalOptions?: internalOptions;
  };

class ApiBase {
    axios: AxiosInstance;
    constructor() {
      this.axios = axios.create({baseURL: API_URL});
    }

  
    generator =
      (method: Method) =>
      (...params: any[]) => {
        return typeof params[0] === 'string'
          ? this.request({method, path: params[0] as string, params: params[1]})
          : this.request({method, ...params[0]});
      };
  
    retrieve = this.generator('get');
    post = this.generator('post');
    put = this.generator('put');
    delete = this.generator('delete');
  
    request = async ({
      method = 'post',
      path,
      params,
      options,
      internalOptions,
    }: requestProps) => {
      this.axios.interceptors.response.use(
        response => {
          return response;
        },
        error => {
            return Promise.reject(error);
        },
      );
  
      try {
        const response = await this.axios[method](path, params, {
          ...(options || {}),
        });
  
        return response.data;
      } catch (error: AxiosError | unknown) {
        if (axios.isAxiosError(error)) {
          return Promise.reject(error.response?.data);
        } else {
          return Promise.reject({message: NETWORK_REQUEST_TIMEOUT_MESSAGE});
        }
      }
    };

    getCoinHistory = async ({ symbol, currency, timeframe, limit}: CoinHistoryProps) => {
      return await this.retrieve(`coins/${symbol}/history?currency=${currency}&timeframe=${timeframe}&limit=${limit}`)
    }

    getCoinInfo = async ({ currency, symbol }) => {
      return await this.retrieve(`coins/${symbol}?currency=${currency}`)
    }

    getCoins = async ({ page = 1, limit = 10}: paginationProps
      ): Promise<any> => {
        return await this.retrieve(`/coins?page=${page}&limit=${limit}`);
      };

    searchCoins = async ({ query }) => {
      return await this.retrieve(`/coins/search?query=${query}`)
    }
  }
  
  const API = new ApiBase();
  export default API;