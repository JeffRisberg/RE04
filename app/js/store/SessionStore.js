import React from 'react'

class SessionStore {
    constructor() {
        this.login = null;
        this.token = null;
    }

    addListener(eventType: string, fn: Function) {
        //this.emitter.addListener(eventType, fn);
    }

    setLogin(login) {
        this.login = login;
    }

    getLogin() {
        return this.login;
    }

    setPassword(password) {
        this.password = password;
    }

    getPassword() {
        return this.password;
    }

    setDonorId(donorId) {
        this.donorId = donorId;
    }

    getDonorId() {
        return this.donorId;
    }

    setOrderId(orderId) {
        this.orderId = orderId;
    }

    getOrderId() {
        return this.orderId;
    }

    setToken(token) {
        this.token = token;
        //this.emitter.emit('change');
    }

    getToken() {
        return this.token;
    }

    clearToken() {
        this.token = null;
        //this.emitter.emit('change');
    }

    isLoggedIn() {
        return this.token != null;
    }
}

export default new SessionStore();