import React from 'react';

import AuthService from '../services/AuthService';

export default class NavigationComponent extends React.Component {

    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired,
        };
    }
    
    constructor(props) {
        super(props);
        this.authService = new AuthService();
    }

    _logout() {
        this.authService.logout();
        this.context.router.push('/login');
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Brand</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li><a onClick={this._logout.bind(this)}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>);
    }
}
