import React from 'react';

import NavigationComponent from '../components/NavigationComponent.jsx';
import TweetListComponent from '../components/TweetListComponent.jsx';

export default class HomeComponent extends React.Component {
    render() {
        return (
            <div>
                <NavigationComponent />
                <div className="container">
                    <TweetListComponent />
                </div>
            </div>
        );
    }
}