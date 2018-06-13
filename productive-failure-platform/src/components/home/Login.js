import React, { Component } from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import axios from 'axios';


export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showButtons: true,
            isLogin: false,
            email: '',
            password: '',
            passwordConfirmation: ''
        }

        this.openLogin = this.openLogin.bind(this);
        this.openSignup = this.openSignup.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangePasswordConfirmation = this.handleChangePasswordConfirmation.bind(this);
        this.sendSignup = this.sendSignup.bind(this);
        this.sendLogin = this.sendLogin.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    openLogin() {
        this.setState({
            showButtons: false,
            isLogin: true
        })
    }

    openSignup() {
        this.setState({
            showButtons: false
        })
    }

    handleChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    handleChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleChangePasswordConfirmation(e) {
        this.setState({
            passwordConfirmation: e.target.value
        })
    }

    sendSignup() {
        let newUser = {
            user: {
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.passwordConfirmation
            }
        }

        axios.post('http://localhost:3001/api/iteration/users', newUser)
        .then(res => {
            localStorage.setItem("id", res.data.id)
            this.setState({
                isLogin: true,
                email: '',
                password: '',
                passwordConfirmation: ''

            })
        })
        // Todo: error in creation account
        .catch(err => console.log(err))
    }

    sendLogin() {
        const request = {
            auth: {
                email: this.state.email,
                password: this.state.password
            }
        }

        axios.post('http://localhost:3001/api/iteration/user_token', request)
        .then(res => {
            this.props.login(res, this.state.email);
        })
        // Todo: handle error
        .catch(err => console.log(err))
    }

    goBack() {
        this.setState({
            showButtons: true,
            isLogin: false,
            email: '',
            password: '',
            passwordConfirmation: ''
        })
    }
    
    render() {
        return (
            <Modal show={this.props.open}>
                <Modal.Header>
                    <Modal.Title>Login - Signup</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.showButtons && (
                        <div className="Login--Buttons__container">
                            <Button bsStyle="primary" className="button-login" onClick={() => this.openLogin()}>Login</Button>
                            <Button bsStyle="primary" className="button-login" onClick={() => this.openSignup()}>Signup</Button>
                        </div>
                    )}

                    {!this.state.showButtons && (
                        this.state.isLogin ? (
                            <div className="Login--login">
                                <form>
                                    <FormGroup>
                                        <ControlLabel>Email</ControlLabel>
                                        <FormControl
                                            type="text"
                                            value={this.state.email}
                                            placeholder="Enter email"
                                            onChange={this.handleChangeEmail}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>Password</ControlLabel>
                                        <FormControl
                                            type="password"
                                            value={this.state.password}
                                            placeholder="Enter password"
                                            onChange={this.handleChangePassword}
                                        />
                                    </FormGroup>
                                </form>
                                <div className="Login--button">
                                    <Button bsStyle="default" onClick={() => this.goBack()}>Back</Button>
                                    <Button bsStyle="primary" onClick={() => this.sendLogin()}>Login</Button>
                                </div>
                            </div>
                        ) : (
                            <div className="Login--signup">
                                <form>
                                    <FormGroup>
                                        <ControlLabel>Email</ControlLabel>
                                        <FormControl
                                            type="text"
                                            value={this.state.email}
                                            placeholder="Enter email"
                                            onChange={this.handleChangeEmail}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>Password</ControlLabel>
                                        <FormControl
                                            type="password"
                                            value={this.state.password}
                                            placeholder="Enter password"
                                            onChange={this.handleChangePassword}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <ControlLabel>Confirm password</ControlLabel>
                                        <FormControl
                                            type="password"
                                            value={this.state.passwordConfirmation}
                                            placeholder="Enter password"
                                            onChange={this.handleChangePasswordConfirmation}
                                        />
                                    </FormGroup>
                                </form>
                                <div className="Login--button">
                                    <Button bsStyle="default" onClick={() => this.goBack()}>Back</Button>
                                    <Button bsStyle="primary" onClick={() => this.sendSignup()}>Create account</Button>
                                </div>
                            </div>
                        )
                    )}
                </Modal.Body>
            </Modal>
        )
    }
}
