export interface AlpacaTrade {
    Symbol: string;
    ID: number;
    Exchange: string;
    Price: number;
    Size: number;
    Timestamp: string;
    Conditions: Array<string>;
    Tape: string;
}
export interface RawTrade {
    T: string;
    S: string;
    i: number;
    x: string;
    p: number;
    s: number;
    t: string;
    c: Array<string>;
    z: string;
}
export interface AlpacaQuote {
    Symbol: string;
    BidExchange: string;
    BidPrice: number;
    BidSize: number;
    AskExchange: string;
    AskPrice: number;
    AskSize: number;
    Timestamp: string;
    Conditions: Array<string>;
    Tape: string;
}
export interface RawQuote {
    T: string;
    S: string;
    bx: string;
    bp: number;
    bs: number;
    ax: string;
    ap: number;
    as: number;
    t: string;
    c: Array<string>;
    z: string;
}
export interface AlpacaBar {
    Symbol: string;
    OpenPrice: number;
    HighPrice: number;
    LowPrice: number;
    ClosePrice: number;
    Volume: number;
    Timestamp: string;
    VWAP: number;
    TradeCount: number;
}
export interface RawBar {
    T: string;
    S: string;
    o: number;
    h: number;
    l: number;
    c: number;
    v: number;
    t: string;
    vw: number;
    n: number;
}
export interface AlpacaSnapshot {
    Symbol: string;
    LatestTrade: AlpacaTrade;
    LatestQuote: AlpacaQuote;
    MinuteBar: AlpacaBar;
    DailyBar: AlpacaBar;
    PrevDailyBar: AlpacaBar;
}
export interface AlpacaStatus {
    Symbol: string;
    StatusCode: string;
    StatusMessage: string;
    ReasonCode: string;
    ReasonMessage: string;
    Timestamp: string;
    Tape: string;
}
export interface RawStatus {
    T: string;
    S: string;
    sc: string;
    sm: string;
    rc: string;
    rm: string;
    t: string;
    z: string;
}
export interface AlpacaLuld {
    Symbol: string;
    LimitUpPrice: number;
    LimitDownPrice: number;
    Indicator: string;
    Timestamp: string;
    Tape: string;
}
export interface RawLuld {
    T: string;
    S: string;
    u: number;
    d: number;
    i: string;
    t: string;
    z: string;
}
export interface AlpacaCancelError {
    Symbol: string;
    ID: number;
    Exchange: string;
    Price: number;
    Size: number;
    CancelErrorAction: string;
    Tape: string;
    Timestamp: string;
}
export interface RawCancelError {
    T: string;
    S: string;
    i: number;
    x: string;
    p: number;
    s: number;
    a: string;
    z: string;
    t: string;
}
export interface AlpacaCorrection {
    Symbol: string;
    Exchange: string;
    OriginalID: number;
    OriginalPrice: number;
    OriginalSize: number;
    OriginalConditions: Array<string>;
    CorrectedID: number;
    CorrectedPrice: number;
    CorrectedSize: number;
    CorrectedConditions: Array<string>;
    Tape: string;
    Timestamp: string;
}
export interface RawCorrection {
    T: string;
    S: string;
    x: string;
    oi: number;
    op: number;
    os: number;
    oc: Array<string>;
    ci: number;
    cp: number;
    cs: number;
    cc: Array<string>;
    z: string;
    t: string;
}
export interface CryptoTrade {
    Symbol: string;
    Timestamp: string;
    Exchange: string;
    Price: number;
    Size: number;
    TakerSide: string;
    Id: number;
}
export interface RawCryptoTrade {
    T: string;
    S: string;
    t: string;
    x: string;
    p: number;
    s: number;
    tks: string;
    i: number;
}
export interface CryptoQuote {
    Symbol: string;
    Timestamp: string;
    Exchange: string;
    BidPrice: number;
    BidSize: number;
    AskPrice: number;
    AskSize: number;
}
export interface RawCryptoQuote {
    T: string;
    S: string;
    t: string;
    x: string;
    bp: number;
    bs: number;
    ap: number;
    as: number;
}
export interface CryptoBar {
    Symbol: string;
    Timestamp: string;
    Exchange: string;
    Open: number;
    High: number;
    Low: number;
    Close: number;
    Volume: number;
    VWAP: number;
    TradeCount: number;
}
export interface RawCryptoBar {
    T: string;
    S: string;
    x: string;
    t: string;
    o: number;
    h: number;
    l: number;
    c: number;
    v: number;
    vw: number;
    n: number;
}
export interface CryptoXBBO {
    Symbol: string;
    Timestamp: string;
    BidExchange: string;
    BidPrice: number;
    BidSize: number;
    AskExchange: string;
    AskPrice: number;
    AskSize: number;
}
export interface RawCryptoXBBO {
    T: string;
    S: string;
    t: string;
    bx: string;
    bp: number;
    bs: number;
    ax: string;
    ap: number;
    as: number;
}
export interface CryptoSnapshot {
    LatestTrade: CryptoTrade;
    LatestQuote: CryptoQuote;
    MinuteBar: CryptoBar;
    DailyBar: CryptoBar;
    PrevDailyBar: CryptoBar;
}
export interface CryptoOrderbookEntry {
    Price: number;
    Size: number;
}
export interface CryptoOrderbook {
    Symbol: string;
    Timestamp: string;
    Exchange: string;
    Bids: Array<CryptoOrderbookEntry>;
    Asks: Array<CryptoOrderbookEntry>;
}
export interface RawCryptoOrderbook {
    T: string;
    S: string;
    t: string;
    x: string;
    b: Array<CryptoOrderbookEntry>;
    a: Array<CryptoOrderbookEntry>;
}
export interface NewsImage {
    Size: string;
    URL: string;
}
export interface RawAlpacaNews {
    T: string;
    ID: number;
    Author: string;
    CreatedAt: string;
    UpdatedAt: string;
    Headline: string;
    Summary: string;
    Content: string;
    Images: Array<NewsImage>;
    URL: string;
    Symbols: Array<string>;
    Source: string;
}
export interface AlpacaNews {
    ID: number;
    Author: string;
    CreatedAt: string;
    UpdatedAt: string;
    Headline: string;
    Summary: string;
    Content: string;
    Images: Array<NewsImage>;
    URL: string;
    Symbols: Array<string>;
    Source: string;
}
export declare function AlpacaTradeV2(data: RawTrade): AlpacaTrade;
export declare function AlpacaQuoteV2(data: RawQuote): AlpacaQuote;
export declare function AlpacaBarV2(data: RawBar): AlpacaBar;
export declare function AlpacaSnapshotV2(data: any): AlpacaSnapshot;
export declare function AlpacaStatusV2(data: RawStatus): AlpacaStatus;
export declare function AlpacaLuldV2(data: RawLuld): AlpacaLuld;
export declare function AlpacaCancelErrorV2(data: RawCancelError): AlpacaCancelError;
export declare function AlpacaCorrectionV2(data: RawCorrection): AlpacaCorrection;
export declare function AlpacaCryptoTrade(data: RawCryptoTrade): CryptoTrade;
export declare function AlpacaCryptoQuote(data: RawCryptoQuote): CryptoQuote;
export declare function AlpacaCryptoBar(data: RawCryptoBar): CryptoBar;
export declare function AlpacaCryptoSnapshot(data: any): CryptoSnapshot;
export declare function AlpacaCryptoOrderbook(data: RawCryptoOrderbook): CryptoOrderbook;
export declare function AlpacaCryptoXBBO(data: RawCryptoXBBO): CryptoXBBO;
export declare function AlpacaNews(data: RawAlpacaNews): AlpacaNews;
export declare enum TimeFrameUnit {
    MIN = "Min",
    HOUR = "Hour",
    DAY = "Day",
    WEEK = "Week",
    MONTH = "Month"
}
export declare function NewTimeframe(amount: number, unit: TimeFrameUnit): string;
