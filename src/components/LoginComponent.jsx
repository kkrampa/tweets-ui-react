import React from 'react';

import { Link } from 'react-router'

import UserService from '../services/UserService';
import AuthService from '../services/AuthService';

export default class LoginComponent extends React.Component {

    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired,
        };
    }

    constructor(props) {
        super(props);
        this.userService = new UserService();
        this.authService = new AuthService();
    }

    _login() {
        this.userService.loginUser(this.state).then((data) => {
            this.authService.login(data.token);
            this.context.router.push('/');
        });
    }

    render() {
        return (
            <div id="loginbox" style={{marginTop: 50}} className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <div className="panel-title">Sign In</div>
                    </div>
                    <div style={{paddingTop: 30}} className="panel-body">
                        <form id="loginform" className="form-horizontal" role="form" method="post">
                            <div style={{marginBottom: 25}} className="input-group">
                                <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                <input id="login-username"
                                       onChange={(e) => this.setState({username: e.target.value})}
                                       type="text"
                                       className="form-control"
                                       name="username"
                                       placeholder="username" required/>
                            </div>

                            <div style={{marginBottom: 25}} className="input-group">
                                <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                                <input id="login-password"
                                       onChange={(e) => this.setState({password: e.target.value})}
                                       type="password"
                                       className="form-control"
                                       name="password"
                                       placeholder="password" required/>
                            </div>

                            <div className="input-group">
                                <div className="checkbox">
                                    <label>
                                        <input id="login-remember" type="checkbox" name="remember" value="1" /> Remember me
                                    </label>
                                </div>
                            </div>


                            <div style={{marginTop: 10}} className="form-group">

                                <div className="col-sm-12 controls">
                                    <button id="btn-login" 
                                            type="button"
                                            className="btn btn-success"
                                            onClick={this._login.bind(this)}>Login</button>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-md-12 control">
                                    <div>
                                        Don't have an account!
                                        <Link to="/register">Sign Up</Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
