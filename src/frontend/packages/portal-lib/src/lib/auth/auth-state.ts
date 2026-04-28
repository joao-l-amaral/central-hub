import {Injectable, signal} from '@angular/core';

interface State {
    isLoggedIn: boolean;
    userName: string;
    idToken: string;
}


@Injectable()
export class AuthState {

    private readonly defaultState = {
        isLoggedIn: false,
        userName: "",
        idToken: "",
    }

    readonly state = signal<State>(this.defaultState)

    restoreState() {
        this.state.set(this.defaultState);
    }
}
