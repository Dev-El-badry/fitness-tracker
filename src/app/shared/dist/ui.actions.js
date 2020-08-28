"use strict";
exports.__esModule = true;
exports.StopLoading = exports.StartLoading = exports.STOP_LOADING = exports.START_LOADING = void 0;
exports.START_LOADING = '[UI] Start Loading';
exports.STOP_LOADING = '[UI] Stop Loading';
var StartLoading = /** @class */ (function () {
    function StartLoading() {
        this.type = exports.START_LOADING;
    }
    return StartLoading;
}());
exports.StartLoading = StartLoading;
var StopLoading = /** @class */ (function () {
    function StopLoading() {
        this.type = exports.STOP_LOADING;
    }
    return StopLoading;
}());
exports.StopLoading = StopLoading;
