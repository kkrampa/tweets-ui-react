import React from 'react';

import { sinceNow } from '../utils';

export default class TweetComponent extends React.Component {
    render() {
        return (
            <div className="col-md-12">
                <div className="row">
                    <strong>{this.props.tweet.author.username}</strong>
                    <span style={{color: 'grey'}}> {sinceNow(this.props.tweet.created_at)} ago</span>
                </div>
                <div className="row">
                    <p>{this.props.tweet.content}</p>
                </div>
            </div>
        )
    }
}
