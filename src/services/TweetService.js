import { API_URL } from '../config';

import axios from 'axios';

export default class TweetService {
    constructor(apiUrl = API_URL) {
        this.apiUrl = apiUrl;
    }

    addTweet(content) {
        return axios.post(`${this.apiUrl}/tweets/`, {content}).then(response => response.data);
    }

    getTweets() {
        return axios.get(`${this.apiUrl}/tweets/`).then(response => response.data);
    }
}
