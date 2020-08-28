import { Action } from '@ngrx/store';
import { Excerice } from './excerice.model';
export const SET_AVAILABLE_TRAININGS = '[Training] Set Available Trainings';
export const SET_FINISHED_TRAININGS = '[Training] Set Finishing Trainings';
export const SET_START_TRAINING = '[Training] Set Start Training';
export const SET_STOP_TRAINING = '[Training] Set Stop Training';

export class SetAvailableTrainings implements Action {
    readonly type = SET_AVAILABLE_TRAININGS;

    constructor(public payload: Excerice[]) {}
}

export class SetFinishedTrainings implements Action {
    readonly type = SET_FINISHED_TRAININGS;
    constructor(public payload: Excerice[]) { }
}

export class SetStartTraining implements Action {
    readonly type = SET_START_TRAINING;
    constructor(public payload: string) { }
}

export class SetStopTraining implements Action {
    readonly type = SET_STOP_TRAINING;
}


export type TrainingActions = SetAvailableTrainings | SetFinishedTrainings | SetStartTraining | SetStopTraining;