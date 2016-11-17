import React from 'react';

import TweetService from '../services/TweetService';
import TweetComponent from './TweetComponent.jsx';

export default class TweetListComponent extends React.Component {

    constructor(props) {
        super(props);
        this.tweetService = new TweetService();
        this.state = {
            tweets: [],
            content: ''
        };
    }

    async componentDidMount() {
        const tweets = await this.tweetService.getTweets();
        this.setState({
            tweets
        });
    }

    _addTweet() {
        this.tweetService.addTweet(this.state.content).then(tweet => {
            const tweets = [tweet].concat(this.state.tweets);
            this.setState({
                tweets
            });
        });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <label>Tweet</label>
                    <textarea onChange={input => this.setState({content: input.target.value})} className="form-control" rows="2"></textarea>
                    <button onClick={this._addTweet.bind(this)} className="btn btn-default">Add</button>
                </div>
                {this.state.tweets.map((tweet, idx) => <TweetComponent key={idx} tweet={tweet}/>)}
            </div>
        )
    }
}