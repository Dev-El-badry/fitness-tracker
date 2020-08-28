import { Action } from '@ngrx/store';

export const SET_AUTHNETICATION = '[Auth] Set Authentication';
export const SET_UNAUTHENTICATION = '[Auth] Set Unauthentication';

export class SetAuthentication implements Action {
    readonly type = SET_AUTHNETICATION;
}


export class SetUnauthentication implements Action {
    readonly type = SET_UNAUTHENTICATION;
}

export type AuthActions = SetAuthentication | SetUnauthentication;