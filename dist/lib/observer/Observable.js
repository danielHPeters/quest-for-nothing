"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Observable {
    constructor() {
        this._observers = [];
        this._state = {};
    }
    register(observer) {
        this._observers.push(observer);
    }
    unRegister(observer) {
        this._observers = this._observers.filter(obs => {
            return obs !== observer;
        });
    }
    notify() {
        this._observers.forEach(observer => {
            observer.update(this._state);
        });
    }
    get observers() {
        return this._observers;
    }
    set observers(observers) {
        this._observers = observers;
    }
    get state() {
        return this._state;
    }
    set state(state) {
        this._state = state;
    }
}
exports.Observable = Observable;
