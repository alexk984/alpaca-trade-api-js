"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewTimeframe = exports.TimeFrameUnit = exports.AlpacaNews = exports.AlpacaCryptoXBBO = exports.AlpacaCryptoOrderbook = exports.AlpacaCryptoSnapshot = exports.AlpacaCryptoBar = exports.AlpacaCryptoQuote = exports.AlpacaCryptoTrade = exports.AlpacaCorrectionV2 = exports.AlpacaCancelErrorV2 = exports.AlpacaLuldV2 = exports.AlpacaStatusV2 = exports.AlpacaSnapshotV2 = exports.AlpacaBarV2 = exports.AlpacaQuoteV2 = exports.AlpacaTradeV2 = void 0;
const mapKeys_1 = __importDefault(require("lodash/mapKeys"));
const mapValues_1 = __importDefault(require("lodash/mapValues"));
const trade_mapping_v2 = {
    S: "Symbol",
    i: "ID",
    x: "Exchange",
    p: "Price",
    s: "Size",
    t: "Timestamp",
    c: "Conditions",
    z: "Tape",
};
const quote_mapping_v2 = {
    S: "Symbol",
    bx: "BidExchange",
    bp: "BidPrice",
    bs: "BidSize",
    ax: "AskExchange",
    ap: "AskPrice",
    as: "AskSize",
    t: "Timestamp",
    c: "Conditions",
    z: "Tape",
};
const bar_mapping_v2 = {
    S: "Symbol",
    o: "OpenPrice",
    h: "HighPrice",
    l: "LowPrice",
    c: "ClosePrice",
    v: "Volume",
    t: "Timestamp",
    vw: "VWAP",
    n: "TradeCount",
};
const snapshot_mapping_v2 = {
    symbol: "symbol",
    latestTrade: "LatestTrade",
    latestQuote: "LatestQuote",
    minuteBar: "MinuteBar",
    dailyBar: "DailyBar",
    prevDailyBar: "PrevDailyBar",
};
const status_mapping_v2 = {
    S: "Symbol",
    sc: "StatusCode",
    sm: "StatusMessage",
    rc: "ReasonCode",
    rm: "ReasonMessage",
    t: "Timestamp",
    z: "Tape",
};
const luld_mapping_v2 = {
    S: "Symbol",
    u: "LimitUpPrice",
    d: "LimitDownPrice",
    i: "Indicator",
    t: "Timestamp",
    z: "Tape",
};
const cancel_error_mapping_v2 = {
    S: "Symbol",
    i: "ID",
    x: "Exchange",
    p: "Price",
    s: "Size",
    a: "CancelErrorAction",
    z: "Tape",
    t: "Timestamp",
};
const correction_mapping_v2 = {
    S: "Symbol",
    x: "Exchange",
    oi: "OriginalID",
    op: "OriginalPrice",
    os: "OriginalSize",
    oc: "OriginalConditions",
    ci: "CorrectedID",
    cp: "CorrectedPrice",
    cs: "CorrectedSize",
    cc: "CorrectedConditions",
    z: "Tape",
    t: "Timestamp",
};
const crypto_trade_mapping = {
    S: "Symbol",
    t: "Timestamp",
    x: "Exchange",
    p: "Price",
    s: "Size",
    tks: "TakerSide",
    i: "ID",
};
const crypto_quote_mapping = {
    S: "Symbol",
    t: "Timestamp",
    x: "Exchange",
    bp: "BidPrice",
    bs: "BidSize",
    ap: "AskPrice",
    as: "AskSize",
};
const crypto_bar_mapping = {
    S: "Symbol",
    t: "Timestamp",
    x: "Exchange",
    o: "Open",
    h: "High",
    l: "Low",
    c: "Close",
    v: "Volume",
    vw: "VWAP",
    n: "TradeCount",
};
const crypto_xbbo_mapping = {
    S: "Symbol",
    t: "Timestamp",
    ap: "AskPrice",
    as: "AskSize",
    ax: "AskExchange",
    bp: "BidPrice",
    bs: "BidSize",
    bx: "BidExchange",
};
const crypto_snapshot_mapping = {
    latestTrade: "LatestTrade",
    latestQuote: "LatestQuote",
    minuteBar: "MinuteBar",
    dailyBar: "DailyBar",
    prevDailyBar: "PrevDailyBar",
};
const crypto_orderbook_entry_mapping = {
    p: "Price",
    s: "Size",
};
const crypto_orderbook_mapping = {
    S: "Symbol",
    t: "Timestamp",
    x: "Exchange",
    b: "Bids",
    a: "Asks",
};
const news_image_mapping = {
    size: "Size",
    url: "URL",
};
const news_mapping = {
    id: "ID",
    author: "Author",
    created_at: "CreatedAt",
    updated_at: "UpdatedAt",
    headline: "Headline",
    summary: "Summary",
    content: "Content",
    images: "Images",
    url: "URL",
    symbols: "Symbols",
    source: "Source",
};
function AlpacaTradeV2(data) {
    return aliasObjectKey(data, trade_mapping_v2);
}
exports.AlpacaTradeV2 = AlpacaTradeV2;
function AlpacaQuoteV2(data) {
    return aliasObjectKey(data, quote_mapping_v2);
}
exports.AlpacaQuoteV2 = AlpacaQuoteV2;
function AlpacaBarV2(data) {
    return aliasObjectKey(data, bar_mapping_v2);
}
exports.AlpacaBarV2 = AlpacaBarV2;
function AlpacaSnapshotV2(data) {
    const snapshot = aliasObjectKey(data, snapshot_mapping_v2);
    return (0, mapValues_1.default)(snapshot, (value, key) => {
        return convertSnapshotData(key, value, false);
    });
}
exports.AlpacaSnapshotV2 = AlpacaSnapshotV2;
function AlpacaStatusV2(data) {
    return aliasObjectKey(data, status_mapping_v2);
}
exports.AlpacaStatusV2 = AlpacaStatusV2;
function AlpacaLuldV2(data) {
    return aliasObjectKey(data, luld_mapping_v2);
}
exports.AlpacaLuldV2 = AlpacaLuldV2;
function AlpacaCancelErrorV2(data) {
    return aliasObjectKey(data, cancel_error_mapping_v2);
}
exports.AlpacaCancelErrorV2 = AlpacaCancelErrorV2;
function AlpacaCorrectionV2(data) {
    return aliasObjectKey(data, correction_mapping_v2);
}
exports.AlpacaCorrectionV2 = AlpacaCorrectionV2;
function AlpacaCryptoTrade(data) {
    return aliasObjectKey(data, crypto_trade_mapping);
}
exports.AlpacaCryptoTrade = AlpacaCryptoTrade;
function AlpacaCryptoQuote(data) {
    return aliasObjectKey(data, crypto_quote_mapping);
}
exports.AlpacaCryptoQuote = AlpacaCryptoQuote;
function AlpacaCryptoBar(data) {
    return aliasObjectKey(data, crypto_bar_mapping);
}
exports.AlpacaCryptoBar = AlpacaCryptoBar;
function AlpacaCryptoSnapshot(data) {
    const snapshot = aliasObjectKey(data, crypto_snapshot_mapping);
    return (0, mapValues_1.default)(snapshot, (value, key) => {
        return convertSnapshotData(key, value, true);
    });
}
exports.AlpacaCryptoSnapshot = AlpacaCryptoSnapshot;
function AlpacaCryptoOrderbook(data) {
    const mappedOrderbook = aliasObjectKey(data, crypto_orderbook_mapping);
    mappedOrderbook.Bids.forEach((element, index) => {
        mappedOrderbook.Bids[index] = aliasObjectKey(element, crypto_orderbook_entry_mapping);
    });
    mappedOrderbook.Asks.forEach((element, index) => {
        mappedOrderbook.Asks[index] = aliasObjectKey(element, crypto_orderbook_entry_mapping);
    });
    return mappedOrderbook;
}
exports.AlpacaCryptoOrderbook = AlpacaCryptoOrderbook;
function aliasObjectKey(data, mapping) {
    return (0, mapKeys_1.default)(data, (_value, key) => {
        return mapping.hasOwnProperty(key) ? mapping[key] : key;
    });
}
function AlpacaCryptoXBBO(data) {
    return aliasObjectKey(data, crypto_xbbo_mapping);
}
exports.AlpacaCryptoXBBO = AlpacaCryptoXBBO;
function convertSnapshotData(key, data, isCrypto) {
    switch (key) {
        case "LatestTrade":
            return isCrypto ? AlpacaCryptoTrade(data) : AlpacaTradeV2(data);
        case "LatestQuote":
            return isCrypto ? AlpacaCryptoQuote(data) : AlpacaQuoteV2(data);
        case "MinuteBar":
        case "DailyBar":
        case "PrevDailyBar":
            return isCrypto ? AlpacaCryptoBar(data) : AlpacaBarV2(data);
        default:
            return data;
    }
}
function AlpacaNews(data) {
    const mappedNews = aliasObjectKey(data, news_mapping);
    if (mappedNews.Images) {
        mappedNews.Images.forEach((element) => {
            return aliasObjectKey(element, news_image_mapping);
        });
    }
    return mappedNews;
}
exports.AlpacaNews = AlpacaNews;
var TimeFrameUnit;
(function (TimeFrameUnit) {
    TimeFrameUnit["MIN"] = "Min";
    TimeFrameUnit["HOUR"] = "Hour";
    TimeFrameUnit["DAY"] = "Day";
    TimeFrameUnit["WEEK"] = "Week";
    TimeFrameUnit["MONTH"] = "Month";
})(TimeFrameUnit = exports.TimeFrameUnit || (exports.TimeFrameUnit = {}));
function NewTimeframe(amount, unit) {
    if (amount <= 0) {
        throw new Error("amount must be a positive integer value");
    }
    if (unit == TimeFrameUnit.MIN && amount > 59) {
        throw new Error("minute timeframe can only be used with amount between 1-59");
    }
    if (unit == TimeFrameUnit.HOUR && amount > 23) {
        throw new Error("hour timeframe can only be used with amounts 1-23");
    }
    if ((unit == TimeFrameUnit.DAY || unit == TimeFrameUnit.WEEK) &&
        amount != 1) {
        throw new Error("day and week timeframes can only be used with amount 1");
    }
    if (unit == TimeFrameUnit.MONTH && ![1, 2, 3, 6, 12].includes(amount)) {
        throw new Error("month timeframe can only be used with amount 1, 2, 3, 6 and 12");
    }
    return `${amount}${unit}`;
}
exports.NewTimeframe = NewTimeframe;
