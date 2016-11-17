import React from 'react';

import { FormGroup, FormControl, HelpBlock, ControlLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router';

import UserService from '../services/UserService';

export default class RegisterFormComponent extends React.Component {

    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                email: '',
                firstName: '',
                lastName: '',
                password: '',
                repeatPassword: ''
            },
            errors: {},
            loading: false
        };
        this.userService = new UserService();
        this._onChange = this._onChange.bind(this);
    }

    async _validate() {
        const user = this.state.user;
        const errors = {};

        if (!user.username) {
            errors.username = 'Username is required';
        } else {
            const response = await this.userService.checkUsernameAvailability(user.username);
            if (!response.available) {
                errors.username = 'Username is already taken';
            }
        }

        if (!user.email) {
            errors.email = 'Email is required';
        } else if (!user.email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            errors.email = 'Provide valid email';
        }

        if (!user.password) {
            errors.password = 'Password is required';
        }

        if (!user.repeatPassword) {
            errors.repeatPassword = 'Confirm your password';
        }

        if(user.password && user.repeatPassword && user.password !== user.repeatPassword) {
            errors.repeatPassword = 'Passwords don\'t match';
        }

        this.setState({
            errors
        });

        return Object.keys(errors).length === 0;
    }

    async _onSubmit() {
        this.setState({
            loading: true
        })
        if (this._validate()) {
            try {
                await this.userService.registerUser(this.state.user);
                this.context.router.push('/login');
            } catch(e) {
                // TODO
            }
        }
        this.setState({loading: false});
    }

    _onChange(e) {
        const input = e.target;
        const user = this.state.user;
        user[input.id] = input.value;
        this.setState({
            user
        });
    }

    render() {
        return (
            <div>
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <div className="panel-title">Sign Up</div>
                        <div style={{float: 'right', fontSize: '85%', position: 'relative', top: -10}}>
                            <Link to="/login">Sign in</Link>
                        </div>
                    </div>
                    <div className="panel-body">
                        <form>
                            <FormGroup
                            validationState={this.state.errors.username ? 'error' : null}
                            controlId="username">
                                <ControlLabel>Username</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.user.username}
                                    placeholder="Enter username"
                                    onChange={this._onChange}
                                />
                                <HelpBlock>
                                    {this.state.errors.username}
                                </HelpBlock>
                                <FormControl.Feedback />    
                            </FormGroup>
                            <FormGroup
                            validationState={this.state.errors.email ? 'error' : null}
                            controlId="email">
                                <ControlLabel>Email</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.user.email}
                                    placeholder="Enter email"
                                    onChange={this._onChange}
                                />
                                <FormControl.Feedback />
                                <HelpBlock>
                                    {this.state.errors.email}
                                </HelpBlock>
                            </FormGroup>
                            <FormGroup
                            validationState={this.state.errors.firstName ? 'error' : null}
                            controlId="firstName">
                                <ControlLabel>First Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.user.firstName}
                                    placeholder="Enter First Name"
                                    onChange={this._onChange}
                                />
                                <FormControl.Feedback />
                                <HelpBlock>
                                    {this.state.errors.firstName}
                                </HelpBlock>
                            </FormGroup>
                            <FormGroup
                            validationState={this.state.errors.lastName ? 'error' : null}
                            controlId="lastName">
                                <ControlLabel>Last Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.user.lastName}
                                    placeholder="Enter Last Name"
                                    onChange={this._onChange}
                                />
                                <FormControl.Feedback />
                                <HelpBlock>{this.state.errors.lastName}</HelpBlock>
                            </FormGroup>
                            <FormGroup
                            validationState={this.state.errors.password ? 'error' : null}
                            controlId="password">
                                <ControlLabel>Password</ControlLabel>
                                <FormControl
                                    type="password"
                                    value={this.state.user.password}
                                    placeholder="Enter Password"
                                    onChange={this._onChange}
                                />
                                <FormControl.Feedback />
                                <HelpBlock>{this.state.errors.password}</HelpBlock>
                            </FormGroup>
                            <FormGroup
                            validationState={this.state.errors.repeatPassword ? 'error' : null}
                            controlId="repeatPassword">
                                <ControlLabel>Repeat Password</ControlLabel>
                                <FormControl
                                    type="password"
                                    value={this.state.user.repeatPassword}
                                    placeholder="Repeat Password"
                                    onChange={this._onChange}
                                />
                                <FormControl.Feedback />
                                <HelpBlock>{this.state.errors.repeatPassword}</HelpBlock>
                            </FormGroup>
                            <Button disabled={this.state.loading} onClick={this._onSubmit.bind(this)}>Submit</Button>
                        </form>
                    </div>
                </div>
            </div>
            )
    }
}