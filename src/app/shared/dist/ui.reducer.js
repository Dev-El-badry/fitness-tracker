"use strict";
exports.__esModule = true;
exports.getIsLoading = exports.uiReducer = void 0;
var ui_actions_1 = require("./ui.actions");
var initialState = {
    isLoading: false
};
function uiReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case ui_actions_1.START_LOADING:
            return {
                isLoading: true
            };
        case ui_actions_1.STOP_LOADING:
            return {
                isLoading: false
            };
        default:
            return state;
    }
}
exports.uiReducer = uiReducer;
exports.getIsLoading = function (state) { return state.isLoading; };
