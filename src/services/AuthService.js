import { API_URL } from '../config';

import jwt_decode from 'jwt-decode';

export default class AuthService {
    constructor(apiUrl = API_URL) {
        this.apiUrl = apiUrl;
    }

    login(token) {
        localStorage.setItem('id_token', token)
    }

    loggedIn() {
        const token = localStorage.getItem('id_token');
        if (!token) {
            return false;
        }
        const expirationDate = new Date(0);
        expirationDate.setUTCSeconds(jwt_decode(token).exp);
        return expirationDate.valueOf() > new Date().valueOf();
    }

    logout() {
        localStorage.removeItem('id_token');
    }

    getToken() {
        return localStorage.getItem('id_token');
    }
}
