import { API_URL } from '../config';

import axios from 'axios';

export default class UserService {
    constructor(apiUrl = API_URL) {
        this.apiUrl = apiUrl;
    }

    registerUser(user) {
        user['repeat_password'] = user['repeatPassword'];
        return axios.post(`${this.apiUrl}/users/register/`, user);
    }

    checkUsernameAvailability(username) {
        return axios.get(`${this.apiUrl}/users/check_username_availability/?username=${username}`)
                    .then(response => response.data);
    }

    loginUser(credentials) {
        return axios.post(`${this.apiUrl}/api-token-auth/`, credentials)
                    .then(response => response.data);
    }
}
