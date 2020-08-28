"use strict";
exports.__esModule = true;
exports.getIsAuthenticate = exports.getAuthState = exports.getIsLoading = exports.getUiState = exports.reducers = void 0;
var fromUI = require("./shared/ui.reducer");
var fromAuth = require("./auth/auth.reducer");
var store_1 = require("@ngrx/store");
exports.reducers = {
    ui: fromUI.uiReducer,
    auth: fromAuth.authReducer
};
exports.getUiState = store_1.createFeatureSelector('ui');
exports.getIsLoading = store_1.createSelector(exports.getUiState, fromUI.getIsLoading);
exports.getAuthState = store_1.createFeatureSelector('auth');
exports.getIsAuthenticate = store_1.createSelector(exports.getAuthState, fromAuth.getIsAuthenticate);
