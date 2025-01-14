"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNews = exports.Sort = exports.getCryptoSnapshots = exports.getCryptoSnapshot = exports.getLatestCryptoXBBOs = exports.getLatestCryptoXBBO = exports.getLatestCryptoQuotes = exports.getLatestCryptoQuote = exports.getLatestCryptoTrades = exports.getLatestCryptoTrade = exports.getLatestCryptoBars = exports.getLatestCryptoBar = exports.getCryptoBars = exports.getCryptoQuotes = exports.getCryptoTrades = exports.getSnapshots = exports.getSnapshot = exports.getLatestBars = exports.getLatestBar = exports.getLatestQuotes = exports.getLatestQuote = exports.getLatestTrades = exports.getLatestTrade = exports.getMultiBarsAsync = exports.getMultiBars = exports.getBars = exports.getMultiQuotesAsync = exports.getMultiQuotes = exports.getQuotes = exports.getMultiTradesAsync = exports.getMultiTrades = exports.getTrades = exports.getMultiDataV2 = exports.getDataV2 = exports.dataV2HttpRequest = exports.TYPE = exports.Adjustment = void 0;
const axios_1 = __importDefault(require("axios"));
const entityv2_1 = require("./entityv2");
// Number of data points to return.
const V2_MAX_LIMIT = 10000;
const V2_NEWS_MAX_LIMIT = 50;
var Adjustment;
(function (Adjustment) {
    Adjustment["RAW"] = "raw";
    Adjustment["DIVIDEND"] = "dividend";
    Adjustment["SPLIT"] = "split";
    Adjustment["ALL"] = "all";
})(Adjustment = exports.Adjustment || (exports.Adjustment = {}));
var TYPE;
(function (TYPE) {
    TYPE["TRADES"] = "trades";
    TYPE["QUOTES"] = "quotes";
    TYPE["BARS"] = "bars";
})(TYPE = exports.TYPE || (exports.TYPE = {}));
function dataV2HttpRequest(url, queryParams, config) {
    const { dataBaseUrl, keyId, secretKey, oauth } = config;
    const headers = {
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip",
    };
    if (oauth == "") {
        headers["APCA-API-KEY-ID"] = keyId;
        headers["APCA-API-SECRET-KEY"] = secretKey;
    }
    else {
        headers["Authorization"] = "Bearer " + oauth;
    }
    return axios_1.default
        .get(`${dataBaseUrl}${url}`, {
        params: queryParams,
        headers: headers,
    })
        .catch((err) => {
        throw new Error(`code: ${err.response.status}, message: ${err.response.data.message}`);
    });
}
exports.dataV2HttpRequest = dataV2HttpRequest;
function getQueryLimit(totalLimit, pageLimit, received) {
    let limit = 0;
    if (pageLimit !== 0) {
        limit = pageLimit;
    }
    if (totalLimit !== 0) {
        const remaining = totalLimit - received;
        if (remaining <= 0) {
            // this should never happen
            return -1;
        }
        if (limit == 0 || limit > remaining) {
            limit = remaining;
        }
    }
    return limit;
}
function getDataV2(endpoint, path, options, config) {
    var _a;
    return __asyncGenerator(this, arguments, function* getDataV2_1() {
        let pageToken = null;
        let received = 0;
        const pageLimit = options.pageLimit
            ? Math.min(options.pageLimit, V2_MAX_LIMIT)
            : V2_MAX_LIMIT;
        delete options.pageLimit;
        options.limit = (_a = options.limit) !== null && _a !== void 0 ? _a : 0;
        while (options.limit > received || options.limit === 0) {
            let limit;
            if (options.limit !== 0) {
                limit = getQueryLimit(options.limit, pageLimit, received);
                if (limit == -1) {
                    break;
                }
            }
            else {
                limit = null;
            }
            const resp = yield __await(dataV2HttpRequest(path, Object.assign(Object.assign({}, options), { limit, page_token: pageToken }), config));
            const items = resp.data[endpoint] || [];
            for (const item of items) {
                yield yield __await(item);
            }
            received += items.length;
            pageToken = resp.data.next_page_token;
            if (!pageToken) {
                break;
            }
        }
    });
}
exports.getDataV2 = getDataV2;
function getMultiDataV2(symbols, endpoint, options, config) {
    var _a;
    return __asyncGenerator(this, arguments, function* getMultiDataV2_1() {
        let pageToken = null;
        let received = 0;
        const pageLimit = options.pageLimit
            ? Math.min(options.pageLimit, V2_MAX_LIMIT)
            : V2_MAX_LIMIT;
        delete options.pageLimit;
        options.limit = (_a = options.limit) !== null && _a !== void 0 ? _a : 0;
        while (options.limit > received || options.limit === 0) {
            let limit;
            if (options.limit !== 0) {
                limit = getQueryLimit(options.limit, pageLimit, received);
                if (limit == -1) {
                    break;
                }
            }
            else {
                limit = null;
            }
            const params = Object.assign(Object.assign({}, options), { symbols: symbols.join(","), limit: limit, page_token: pageToken });
            const resp = yield __await(dataV2HttpRequest(`/v2/stocks/${endpoint}`, params, config));
            const items = resp.data[endpoint];
            for (const symbol in items) {
                for (const data of items[symbol]) {
                    received++;
                    yield yield __await({ symbol: symbol, data: data });
                }
            }
            pageToken = resp.data.next_page_token;
            if (!pageToken) {
                break;
            }
        }
    });
}
exports.getMultiDataV2 = getMultiDataV2;
function getTrades(symbol, options, config) {
    return __asyncGenerator(this, arguments, function* getTrades_1() {
        var e_1, _a;
        const trades = getDataV2(TYPE.TRADES, `/v2/stocks/${symbol}/${TYPE.TRADES}`, options, config);
        try {
            for (var trades_1 = __asyncValues(trades), trades_1_1; trades_1_1 = yield __await(trades_1.next()), !trades_1_1.done;) {
                const trade = trades_1_1.value;
                yield yield __await((0, entityv2_1.AlpacaTradeV2)(trade));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (trades_1_1 && !trades_1_1.done && (_a = trades_1.return)) yield __await(_a.call(trades_1));
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
exports.getTrades = getTrades;
function getMultiTrades(symbols, options, config) {
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function* () {
        const multiTrades = getMultiTradesAsync(symbols, options, config);
        const trades = new Map();
        try {
            for (var multiTrades_1 = __asyncValues(multiTrades), multiTrades_1_1; multiTrades_1_1 = yield multiTrades_1.next(), !multiTrades_1_1.done;) {
                const t = multiTrades_1_1.value;
                const items = trades.get(t.Symbol) || new Array();
                trades.set(t.Symbol, [...items, t]);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (multiTrades_1_1 && !multiTrades_1_1.done && (_a = multiTrades_1.return)) yield _a.call(multiTrades_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return trades;
    });
}
exports.getMultiTrades = getMultiTrades;
function getMultiTradesAsync(symbols, options, config) {
    return __asyncGenerator(this, arguments, function* getMultiTradesAsync_1() {
        var e_3, _a;
        const multiTrades = getMultiDataV2(symbols, TYPE.TRADES, options, config);
        try {
            for (var multiTrades_2 = __asyncValues(multiTrades), multiTrades_2_1; multiTrades_2_1 = yield __await(multiTrades_2.next()), !multiTrades_2_1.done;) {
                const t = multiTrades_2_1.value;
                t.data = Object.assign(Object.assign({}, t.data), { S: t.symbol });
                yield yield __await((0, entityv2_1.AlpacaTradeV2)(t.data));
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (multiTrades_2_1 && !multiTrades_2_1.done && (_a = multiTrades_2.return)) yield __await(_a.call(multiTrades_2));
            }
            finally { if (e_3) throw e_3.error; }
        }
    });
}
exports.getMultiTradesAsync = getMultiTradesAsync;
function getQuotes(symbol, options, config) {
    return __asyncGenerator(this, arguments, function* getQuotes_1() {
        var e_4, _a;
        const quotes = getDataV2(TYPE.QUOTES, `/v2/stocks/${symbol}/${TYPE.QUOTES}`, options, config);
        try {
            for (var quotes_1 = __asyncValues(quotes), quotes_1_1; quotes_1_1 = yield __await(quotes_1.next()), !quotes_1_1.done;) {
                const quote = quotes_1_1.value;
                yield yield __await((0, entityv2_1.AlpacaQuoteV2)(quote));
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (quotes_1_1 && !quotes_1_1.done && (_a = quotes_1.return)) yield __await(_a.call(quotes_1));
            }
            finally { if (e_4) throw e_4.error; }
        }
    });
}
exports.getQuotes = getQuotes;
function getMultiQuotes(symbols, options, config) {
    var e_5, _a;
    return __awaiter(this, void 0, void 0, function* () {
        const multiQuotes = getMultiQuotesAsync(symbols, options, config);
        const quotes = new Map();
        try {
            for (var multiQuotes_1 = __asyncValues(multiQuotes), multiQuotes_1_1; multiQuotes_1_1 = yield multiQuotes_1.next(), !multiQuotes_1_1.done;) {
                const q = multiQuotes_1_1.value;
                const items = quotes.get(q.Symbol) || new Array();
                quotes.set(q.Symbol, [...items, q]);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (multiQuotes_1_1 && !multiQuotes_1_1.done && (_a = multiQuotes_1.return)) yield _a.call(multiQuotes_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return quotes;
    });
}
exports.getMultiQuotes = getMultiQuotes;
function getMultiQuotesAsync(symbols, options, config) {
    return __asyncGenerator(this, arguments, function* getMultiQuotesAsync_1() {
        var e_6, _a;
        const multiQuotes = getMultiDataV2(symbols, TYPE.QUOTES, options, config);
        try {
            for (var multiQuotes_2 = __asyncValues(multiQuotes), multiQuotes_2_1; multiQuotes_2_1 = yield __await(multiQuotes_2.next()), !multiQuotes_2_1.done;) {
                const q = multiQuotes_2_1.value;
                q.data = Object.assign(Object.assign({}, q.data), { S: q.symbol });
                yield yield __await((0, entityv2_1.AlpacaQuoteV2)(q.data));
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (multiQuotes_2_1 && !multiQuotes_2_1.done && (_a = multiQuotes_2.return)) yield __await(_a.call(multiQuotes_2));
            }
            finally { if (e_6) throw e_6.error; }
        }
    });
}
exports.getMultiQuotesAsync = getMultiQuotesAsync;
function getBars(symbol, options, config) {
    return __asyncGenerator(this, arguments, function* getBars_1() {
        var e_7, _a;
        const bars = getDataV2(TYPE.BARS, `/v2/stocks/${symbol}/${TYPE.BARS}`, options, config);
        try {
            for (var _b = __asyncValues(bars || []), _c; _c = yield __await(_b.next()), !_c.done;) {
                const bar = _c.value;
                yield yield __await((0, entityv2_1.AlpacaBarV2)(bar));
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) yield __await(_a.call(_b));
            }
            finally { if (e_7) throw e_7.error; }
        }
    });
}
exports.getBars = getBars;
function getMultiBars(symbols, options, config) {
    var e_8, _a;
    return __awaiter(this, void 0, void 0, function* () {
        const multiBars = getMultiBarsAsync(symbols, options, config);
        const bars = new Map();
        try {
            for (var multiBars_1 = __asyncValues(multiBars), multiBars_1_1; multiBars_1_1 = yield multiBars_1.next(), !multiBars_1_1.done;) {
                const b = multiBars_1_1.value;
                const items = bars.get(b.Symbol) || new Array();
                bars.set(b.Symbol, [...items, b]);
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (multiBars_1_1 && !multiBars_1_1.done && (_a = multiBars_1.return)) yield _a.call(multiBars_1);
            }
            finally { if (e_8) throw e_8.error; }
        }
        return bars;
    });
}
exports.getMultiBars = getMultiBars;
function getMultiBarsAsync(symbols, options, config) {
    return __asyncGenerator(this, arguments, function* getMultiBarsAsync_1() {
        var e_9, _a;
        const multiBars = getMultiDataV2(symbols, TYPE.BARS, options, config);
        try {
            for (var multiBars_2 = __asyncValues(multiBars), multiBars_2_1; multiBars_2_1 = yield __await(multiBars_2.next()), !multiBars_2_1.done;) {
                const b = multiBars_2_1.value;
                b.data = Object.assign(Object.assign({}, b.data), { S: b.symbol });
                yield yield __await((0, entityv2_1.AlpacaBarV2)(b.data));
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (multiBars_2_1 && !multiBars_2_1.done && (_a = multiBars_2.return)) yield __await(_a.call(multiBars_2));
            }
            finally { if (e_9) throw e_9.error; }
        }
    });
}
exports.getMultiBarsAsync = getMultiBarsAsync;
function getLatestTrade(symbol, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield dataV2HttpRequest(`/v2/stocks/${symbol}/trades/latest`, {}, config);
        return (0, entityv2_1.AlpacaTradeV2)(resp.data.trade);
    });
}
exports.getLatestTrade = getLatestTrade;
function getLatestTrades(symbols, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield dataV2HttpRequest(`/v2/stocks/${TYPE.TRADES}/latest`, { symbols: symbols.join(",") }, config);
        const multiLatestTrades = resp.data.trades;
        const multiLatestTradesResp = new Map();
        for (const symbol in multiLatestTrades) {
            multiLatestTradesResp.set(symbol, (0, entityv2_1.AlpacaTradeV2)(Object.assign({ S: symbol }, multiLatestTrades[symbol])));
        }
        return multiLatestTradesResp;
    });
}
exports.getLatestTrades = getLatestTrades;
function getLatestQuote(symbol, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield dataV2HttpRequest(`/v2/stocks/${symbol}/quotes/latest`, {}, config);
        return (0, entityv2_1.AlpacaQuoteV2)(resp.data.quote);
    });
}
exports.getLatestQuote = getLatestQuote;
function getLatestQuotes(symbols, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield dataV2HttpRequest(`/v2/stocks/${TYPE.QUOTES}/latest`, { symbols: symbols.join(",") }, config);
        const multiLatestQuotes = resp.data.quotes;
        const multiLatestQuotesResp = new Map();
        for (const symbol in multiLatestQuotes) {
            multiLatestQuotesResp.set(symbol, (0, entityv2_1.AlpacaQuoteV2)(Object.assign({ S: symbol }, multiLatestQuotes[symbol])));
        }
        return multiLatestQuotesResp;
    });
}
exports.getLatestQuotes = getLatestQuotes;
function getLatestBar(symbol, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield dataV2HttpRequest(`/v2/stocks/${symbol}/bars/latest`, {}, config);
        return (0, entityv2_1.AlpacaBarV2)(resp.data.bar);
    });
}
exports.getLatestBar = getLatestBar;
function getLatestBars(symbols, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield dataV2HttpRequest(`/v2/stocks/${TYPE.BARS}/latest`, { symbols: symbols.join(",") }, config);
        const multiLatestBars = resp.data.bars;
        const multiLatestBarsResp = new Map();
        for (const symbol in multiLatestBars) {
            multiLatestBarsResp.set(symbol, (0, entityv2_1.AlpacaBarV2)(Object.assign({ S: symbol }, multiLatestBars[symbol])));
        }
        return multiLatestBarsResp;
    });
}
exports.getLatestBars = getLatestBars;
function getSnapshot(symbol, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield dataV2HttpRequest(`/v2/stocks/${symbol}/snapshot`, {}, config);
        return (0, entityv2_1.AlpacaSnapshotV2)(resp.data);
    });
}
exports.getSnapshot = getSnapshot;
function getSnapshots(symbols, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield dataV2HttpRequest(`/v2/stocks/snapshots?symbols=${symbols.join(",")}`, {}, config);
        const result = Object.entries(resp.data).map(([key, val]) => {
            return (0, entityv2_1.AlpacaSnapshotV2)(Object.assign({ symbol: key }, val));
        });
        return result;
    });
}
exports.getSnapshots = getSnapshots;
function getCryptoTrades(symbol, options, config) {
    return __asyncGenerator(this, arguments, function* getCryptoTrades_1() {
        var e_10, _a;
        const cryptoTrades = getDataV2(TYPE.TRADES, `/v1beta1/crypto/${symbol}/trades`, options, config);
        try {
            for (var cryptoTrades_1 = __asyncValues(cryptoTrades), cryptoTrades_1_1; cryptoTrades_1_1 = yield __await(cryptoTrades_1.next()), !cryptoTrades_1_1.done;) {
                const t = cryptoTrades_1_1.value;
                yield yield __await((0, entityv2_1.AlpacaCryptoTrade)(Object.assign({ S: symbol }, t)));
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (cryptoTrades_1_1 && !cryptoTrades_1_1.done && (_a = cryptoTrades_1.return)) yield __await(_a.call(cryptoTrades_1));
            }
            finally { if (e_10) throw e_10.error; }
        }
    });
}
exports.getCryptoTrades = getCryptoTrades;
function getCryptoQuotes(symbol, options, config) {
    return __asyncGenerator(this, arguments, function* getCryptoQuotes_1() {
        var e_11, _a;
        const cryptoQuotes = getDataV2(TYPE.QUOTES, `/v1beta1/crypto/${symbol}/quotes`, options, config);
        try {
            for (var cryptoQuotes_1 = __asyncValues(cryptoQuotes), cryptoQuotes_1_1; cryptoQuotes_1_1 = yield __await(cryptoQuotes_1.next()), !cryptoQuotes_1_1.done;) {
                const q = cryptoQuotes_1_1.value;
                yield yield __await((0, entityv2_1.AlpacaCryptoQuote)(Object.assign({ S: symbol }, q)));
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (cryptoQuotes_1_1 && !cryptoQuotes_1_1.done && (_a = cryptoQuotes_1.return)) yield __await(_a.call(cryptoQuotes_1));
            }
            finally { if (e_11) throw e_11.error; }
        }
    });
}
exports.getCryptoQuotes = getCryptoQuotes;
function getCryptoBars(symbol, options, config) {
    return __asyncGenerator(this, arguments, function* getCryptoBars_1() {
        var e_12, _a;
        const cryptoBars = getDataV2(TYPE.BARS, `/v1beta1/crypto/${symbol}/bars`, options, config);
        try {
            for (var cryptoBars_1 = __asyncValues(cryptoBars), cryptoBars_1_1; cryptoBars_1_1 = yield __await(cryptoBars_1.next()), !cryptoBars_1_1.done;) {
                const b = cryptoBars_1_1.value;
                yield yield __await((0, entityv2_1.AlpacaCryptoBar)(Object.assign({ S: symbol }, b)));
            }
        }
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (cryptoBars_1_1 && !cryptoBars_1_1.done && (_a = cryptoBars_1.return)) yield __await(_a.call(cryptoBars_1));
            }
            finally { if (e_12) throw e_12.error; }
        }
    });
}
exports.getCryptoBars = getCryptoBars;
function getLatestCryptoBar(symbol, options, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield dataV2HttpRequest(`/v1beta1/crypto/${symbol}/bars/latest`, options, config);
        return (0, entityv2_1.AlpacaCryptoBar)(Object.assign({ S: resp.data.symbol }, resp.data.bar));
    });
}
exports.getLatestCryptoBar = getLatestCryptoBar;
function getLatestCryptoBars(symbols, options, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = Object.assign(Object.assign({}, options), { symbols: symbols.join(",") });
        const resp = yield dataV2HttpRequest(`/v1beta1/crypto/bars/latest`, params, config);
        const multiLatestCryptoBars = resp.data.bars;
        const result = new Map();
        for (const symbol in multiLatestCryptoBars) {
            const bar = multiLatestCryptoBars[symbol];
            result.set(symbol, (0, entityv2_1.AlpacaCryptoBar)(bar));
        }
        return result;
    });
}
exports.getLatestCryptoBars = getLatestCryptoBars;
function getLatestCryptoTrade(symbol, options, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield dataV2HttpRequest(`/v1beta1/crypto/${symbol}/trades/latest`, options, config);
        return (0, entityv2_1.AlpacaCryptoTrade)(Object.assign({ S: resp.data.symbol }, resp.data.trade));
    });
}
exports.getLatestCryptoTrade = getLatestCryptoTrade;
function getLatestCryptoTrades(symbols, options, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = Object.assign(Object.assign({}, options), { symbols: symbols.join(",") });
        const resp = yield dataV2HttpRequest(`/v1beta1/crypto/trades/latest`, params, config);
        const multiLatestCryptoTrades = resp.data.trades;
        const result = new Map();
        for (const symbol in multiLatestCryptoTrades) {
            const trade = multiLatestCryptoTrades[symbol];
            result.set(symbol, (0, entityv2_1.AlpacaCryptoTrade)(trade));
        }
        return result;
    });
}
exports.getLatestCryptoTrades = getLatestCryptoTrades;
function getLatestCryptoQuote(symbol, options, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield dataV2HttpRequest(`/v1beta1/crypto/${symbol}/quotes/latest`, options, config);
        return (0, entityv2_1.AlpacaCryptoQuote)(Object.assign({ S: resp.data.symbol }, resp.data.quote));
    });
}
exports.getLatestCryptoQuote = getLatestCryptoQuote;
function getLatestCryptoQuotes(symbols, options, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = Object.assign(Object.assign({}, options), { symbols: symbols.join(",") });
        const resp = yield dataV2HttpRequest(`/v1beta1/crypto/quotes/latest`, params, config);
        const multiLatestCryptoQuotes = resp.data.quotes;
        const result = new Map();
        for (const symbol in multiLatestCryptoQuotes) {
            const quote = multiLatestCryptoQuotes[symbol];
            result.set(symbol, (0, entityv2_1.AlpacaCryptoQuote)(quote));
        }
        return result;
    });
}
exports.getLatestCryptoQuotes = getLatestCryptoQuotes;
function getLatestCryptoXBBO(symbol, options, config) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const params = { exchanges: (_a = options.exchanges) === null || _a === void 0 ? void 0 : _a.join(",") };
        const resp = yield dataV2HttpRequest(`/v1beta1/crypto/${symbol}/xbbo/latest`, params, config);
        return (0, entityv2_1.AlpacaCryptoXBBO)(Object.assign({ S: resp.data.symbol }, resp.data.xbbo));
    });
}
exports.getLatestCryptoXBBO = getLatestCryptoXBBO;
function getLatestCryptoXBBOs(symbols, options, config) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            exchanges: (_a = options.exchanges) === null || _a === void 0 ? void 0 : _a.join(","),
            symbols: symbols.join(","),
        };
        const resp = yield dataV2HttpRequest(`/v1beta1/crypto/xbbos/latest`, params, config);
        const result = new Map();
        const multiLatestCryptoXBBOs = resp.data.xbbos;
        for (const symbol in multiLatestCryptoXBBOs) {
            const xbbo = multiLatestCryptoXBBOs[symbol];
            result.set(symbol, (0, entityv2_1.AlpacaCryptoXBBO)(xbbo));
        }
        return result;
    });
}
exports.getLatestCryptoXBBOs = getLatestCryptoXBBOs;
function getCryptoSnapshot(symbol, options, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield dataV2HttpRequest(`/v1beta1/crypto/${symbol}/snapshot`, options, config);
        return (0, entityv2_1.AlpacaCryptoSnapshot)(resp.data);
    });
}
exports.getCryptoSnapshot = getCryptoSnapshot;
function getCryptoSnapshots(symbols, options, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = Object.assign(Object.assign({}, options), { symbols: symbols.join(",") });
        const resp = yield dataV2HttpRequest(`/v1beta1/crypto/snapshots`, params, config);
        const snapshots = resp.data.snapshots;
        const result = new Map();
        for (const symbol in snapshots) {
            const snapshot = snapshots[symbol];
            result.set(symbol, (0, entityv2_1.AlpacaCryptoSnapshot)(snapshot));
        }
        return result;
    });
}
exports.getCryptoSnapshots = getCryptoSnapshots;
var Sort;
(function (Sort) {
    Sort["ASC"] = "asc";
    Sort["DESC"] = "desc";
})(Sort = exports.Sort || (exports.Sort = {}));
function getNewsParams(options) {
    var _a;
    const query = {};
    query.symbols =
        ((_a = options.symbols) === null || _a === void 0 ? void 0 : _a.length) > 0 ? options.symbols.join(",") : null;
    query.start = options.start;
    query.end = options.end;
    query.sort = options.sort;
    query.includeContent = options.includeContent;
    query.excludeContentless = options.excludeContentless;
    return query;
}
function getNews(options, config) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (options.totalLimit && options.totalLimit < 0) {
            throw new Error("negative total limit");
        }
        if (options.pageLimit && options.pageLimit < 0) {
            throw new Error("negative page limit");
        }
        let pageToken = null;
        let received = 0;
        const pageLimit = options.pageLimit
            ? Math.min(options.pageLimit, V2_NEWS_MAX_LIMIT)
            : V2_NEWS_MAX_LIMIT;
        delete options.pageLimit;
        const totalLimit = (_a = options.totalLimit) !== null && _a !== void 0 ? _a : 10;
        const result = [];
        const params = getNewsParams(options);
        let limit;
        for (;;) {
            limit = getQueryLimit(totalLimit, pageLimit, received);
            if (limit < 1) {
                break;
            }
            const resp = yield dataV2HttpRequest("/v1beta1/news", Object.assign(Object.assign({}, params), { limit: limit, page_token: pageToken }), config);
            resp.data.news.forEach((n) => result.push((0, entityv2_1.AlpacaNews)(n)));
            received += resp.data.news.length;
            pageToken = resp.data.next_page_token;
            if (!pageToken) {
                break;
            }
        }
        return result;
    });
}
exports.getNews = getNews;
