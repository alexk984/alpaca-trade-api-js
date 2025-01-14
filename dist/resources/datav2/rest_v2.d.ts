import { AxiosResponse } from "axios";
import { CryptoXBBO, CryptoQuote, CryptoTrade, CryptoBar, CryptoSnapshot, AlpacaSnapshot, AlpacaQuote, AlpacaTrade, AlpacaBar, AlpacaNews } from "./entityv2";
export declare enum Adjustment {
    RAW = "raw",
    DIVIDEND = "dividend",
    SPLIT = "split",
    ALL = "all"
}
export declare enum TYPE {
    TRADES = "trades",
    QUOTES = "quotes",
    BARS = "bars"
}
export declare function dataV2HttpRequest(url: string, queryParams: any, config: any): Promise<AxiosResponse<any>>;
export declare function getDataV2(endpoint: TYPE, path: string, options: any, config: any): AsyncGenerator<any, void, unknown>;
export declare function getMultiDataV2(symbols: Array<string>, endpoint: string, options: any, config: any): AsyncGenerator<{
    symbol: string;
    data: any;
}, void, unknown>;
export interface GetTradesParams {
    start: string;
    end?: string;
    page_limit?: number;
    limit?: number;
    feed?: string;
    asof?: string;
    page_token?: string;
}
export declare function getTrades(symbol: string, options: GetTradesParams, config: any): AsyncGenerator<AlpacaTrade, void, unknown>;
export declare function getMultiTrades(symbols: Array<string>, options: GetTradesParams, config: any): Promise<Map<string, any[]>>;
export declare function getMultiTradesAsync(symbols: Array<string>, options: GetTradesParams, config: any): AsyncGenerator<AlpacaTrade, void, unknown>;
export interface GetQuotesParams {
    start: string;
    end?: string;
    page_limit?: number;
    limit?: number;
    feed?: string;
    asof?: string;
    page_token?: string;
}
export declare function getQuotes(symbol: string, options: GetQuotesParams, config: any): AsyncGenerator<AlpacaQuote, void, unknown>;
export declare function getMultiQuotes(symbols: Array<string>, options: GetQuotesParams, config: any): Promise<Map<string, any[]>>;
export declare function getMultiQuotesAsync(symbols: Array<string>, options: GetQuotesParams, config: any): AsyncGenerator<AlpacaQuote, void, unknown>;
export interface GetBarsParams {
    timeframe: string;
    adjustment?: Adjustment;
    start: string;
    end?: string;
    page_limit?: number;
    limit?: number;
    feed?: string;
    asof?: string;
    page_token?: string;
}
export declare function getBars(symbol: string, options: GetBarsParams, config: any): AsyncGenerator<AlpacaBar, void, unknown>;
export declare function getMultiBars(symbols: Array<string>, options: GetBarsParams, config: any): Promise<Map<string, any[]>>;
export declare function getMultiBarsAsync(symbols: Array<string>, options: GetBarsParams, config: any): AsyncGenerator<AlpacaBar, void, unknown>;
export declare function getLatestTrade(symbol: string, config: any): Promise<AlpacaTrade>;
export declare function getLatestTrades(symbols: Array<string>, config: any): Promise<Map<string, AlpacaTrade>>;
export declare function getLatestQuote(symbol: string, config: any): Promise<AlpacaQuote>;
export declare function getLatestQuotes(symbols: Array<string>, config: any): Promise<Map<string, AlpacaQuote>>;
export declare function getLatestBar(symbol: string, config: any): Promise<AlpacaBar>;
export declare function getLatestBars(symbols: Array<string>, config: any): Promise<Map<string, AlpacaBar>>;
export declare function getSnapshot(symbol: string, config: any): Promise<AlpacaSnapshot>;
export declare function getSnapshots(symbols: Array<string>, config: any): Promise<AlpacaSnapshot[]>;
export interface GetCryptoTradesParams {
    start: string;
    end?: string;
    limit?: number;
    page_limit?: number;
    exchanges?: Array<string>;
}
export declare function getCryptoTrades(symbol: string, options: GetCryptoTradesParams, config: any): AsyncGenerator<CryptoTrade, void, unknown>;
export interface GetCryptoQuotesParams {
    start: string;
    end?: string;
    limit?: number;
    page_limit?: number;
    exchanges?: Array<string>;
}
export declare function getCryptoQuotes(symbol: string, options: GetCryptoQuotesParams, config: any): AsyncGenerator<CryptoQuote, void, unknown>;
export interface GetCryptoBarsParams {
    start: string;
    end?: string;
    timeframe: string;
    limit?: number;
    page_limit?: number;
    exchanges?: Array<string>;
}
export declare function getCryptoBars(symbol: string, options: GetCryptoBarsParams, config: any): AsyncGenerator<CryptoBar, void, unknown>;
export declare function getLatestCryptoBar(symbol: string, options: {
    exchange: string;
}, config: any): Promise<CryptoBar>;
export declare function getLatestCryptoBars(symbols: Array<string>, options: {
    exchange: string;
}, config: any): Promise<Map<string, CryptoBar>>;
export declare function getLatestCryptoTrade(symbol: string, options: {
    exchange: string;
}, config: any): Promise<CryptoTrade>;
export declare function getLatestCryptoTrades(symbols: Array<string>, options: {
    exchange: string;
}, config: any): Promise<Map<string, CryptoTrade>>;
export declare function getLatestCryptoQuote(symbol: string, options: {
    exchange: string;
}, config: any): Promise<CryptoQuote>;
export declare function getLatestCryptoQuotes(symbols: Array<string>, options: {
    exchange: string;
}, config: any): Promise<Map<string, CryptoQuote>>;
export declare function getLatestCryptoXBBO(symbol: string, options: {
    exchanges?: Array<string>;
}, config: any): Promise<CryptoXBBO>;
export declare function getLatestCryptoXBBOs(symbols: Array<string>, options: {
    exchanges?: Array<string>;
}, config: any): Promise<Map<string, CryptoXBBO>>;
export declare function getCryptoSnapshot(symbol: string, options: {
    exchange: string;
}, config: any): Promise<CryptoSnapshot>;
export declare function getCryptoSnapshots(symbols: Array<string>, options: {
    exchange: string;
}, config: any): Promise<Map<string, CryptoSnapshot>>;
export declare enum Sort {
    ASC = "asc",
    DESC = "desc"
}
export interface GetNewsParams {
    symbols: Array<string>;
    start?: string;
    end?: string;
    sort?: Sort;
    includeContent?: boolean;
    excludeContentless?: boolean;
    totalLimit?: number;
    pageLimit?: number;
}
export declare function getNews(options: GetNewsParams, config: any): Promise<AlpacaNews[]>;
