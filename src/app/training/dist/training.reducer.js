"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.getIsOpened = exports.getActiveTrainings = exports.getFinishedTrainings = exports.getAvailableTrainings = exports.getTrainingState = exports.trainingReducer = void 0;
var store_1 = require("@ngrx/store");
var training_actions_1 = require("./training.actions");
var initialState = {
    availableExercises: [],
    finishedExercises: [],
    activeExercises: null
};
function trainingReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case training_actions_1.SET_AVAILABLE_TRAININGS:
            return __assign(__assign({}, state), { availableExercises: action.payload });
        case training_actions_1.SET_FINISHED_TRAININGS:
            return __assign(__assign({}, state), { finishedExercises: action.payload });
        case training_actions_1.SET_START_TRAINING:
            return __assign(__assign({}, state), { activeExercises: __assign({}, state.availableExercises.find(function (ex) { return ex.id === action.payload; })) });
        case training_actions_1.SET_STOP_TRAINING:
            return __assign(__assign({}, state), { activeExercises: null });
        default:
            return state;
    }
}
exports.trainingReducer = trainingReducer;
exports.getTrainingState = store_1.createFeatureSelector('training');
exports.getAvailableTrainings = store_1.createSelector(exports.getTrainingState, function (state) { return state.availableExercises; });
exports.getFinishedTrainings = store_1.createSelector(exports.getTrainingState, function (state) { return state.finishedExercises; });
exports.getActiveTrainings = store_1.createSelector(exports.getTrainingState, function (state) { return state.activeExercises; });
exports.getIsOpened = store_1.createSelector(exports.getTrainingState, function (state) { return state.activeExercises != null; });
