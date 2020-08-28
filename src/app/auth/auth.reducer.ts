import { Action } from '@ngrx/store';
import { AuthActions, SET_AUTHNETICATION, SET_UNAUTHENTICATION } from './auth.actions';
export interface State {
    isAuthenticate: boolean;
}


const initialState: State = {
    isAuthenticate: false
};


export function authReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case SET_AUTHNETICATION:
            return {
                isAuthenticate: true
            };

        case SET_UNAUTHENTICATION:
            return {
                isAuthenticate: false
            };

        default:
            return state;
    }
}

export const getIsAuthenticate = (state: State) => state.isAuthenticate;