"use strict";
const { omitBy, isNil } = require("lodash");
function get() {
    return this.sendRequest("/account");
}
function updateConfigs(configs) {
    return this.sendRequest("/account/configurations", null, configs, "PATCH");
}
function getConfigs() {
    return this.sendRequest("/account/configurations");
}
function getActivities({ activityTypes, until, after, direction, date, pageSize, pageToken, }) {
    if (Array.isArray(activityTypes)) {
        activityTypes = activityTypes.join(",");
    }
    const queryParams = omitBy({
        activity_types: activityTypes,
        until,
        after,
        direction,
        date,
        page_size: pageSize,
        page_token: pageToken,
    }, isNil);
    return this.sendRequest("/account/activities", queryParams);
}
function getPortfolioHistory({ date_start, date_end, period, timeframe, extended_hours, }) {
    const queryParams = omitBy({
        date_start,
        date_end,
        period,
        timeframe,
        extended_hours,
    }, isNil);
    return this.sendRequest("/account/portfolio/history", queryParams);
}
module.exports = {
    get,
    getConfigs,
    updateConfigs,
    getActivities,
    getPortfolioHistory,
};
