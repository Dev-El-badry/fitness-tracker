import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { TrainingActions, SET_AVAILABLE_TRAININGS, SET_FINISHED_TRAININGS, SET_START_TRAINING, SET_STOP_TRAINING } from './training.actions';
import { Excerice } from './excerice.model';
import * as fromRoot from '../app.reducer';

export interface TrainingState {
    availableExercises: Excerice[];
    finishedExercises: Excerice[];
    activeExercises: Excerice;
}

export interface State extends fromRoot.State {
    training: TrainingState;
}


const initialState: TrainingState = {
    availableExercises : [],
    finishedExercises: [],
    activeExercises: null
};


export function trainingReducer(state = initialState, action: TrainingActions) {
    switch (action.type) {
        case SET_AVAILABLE_TRAININGS:
            return {    
                ...state,
                availableExercises: action.payload
            };
        case SET_FINISHED_TRAININGS:
            return {
                ...state,
                finishedExercises: action.payload
            };
        case SET_START_TRAINING:
            return {
                ...state,
                activeExercises: {...state.availableExercises.find(ex => ex.id === action.payload)}
            };
        case SET_STOP_TRAINING:
            return {
                ...state,
                activeExercises: null
            };

        default:
            return state;
    }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableTrainings = createSelector(getTrainingState,(state: TrainingState) => state.availableExercises );
export const getFinishedTrainings = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getActiveTrainings = createSelector(getTrainingState, (state: TrainingState) => state.activeExercises);
export const getIsOpened = createSelector(getTrainingState, (state: TrainingState) => state.activeExercises != null);