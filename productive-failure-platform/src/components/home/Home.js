import React, { Component } from 'react';
import Login from './Login';
import UserActivities from './UserActivities';
import axios from 'axios';


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showLogin: false,
            productiveFailures: []
        }

        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
        this.createActivity = this.createActivity.bind(this);
    }

    componentDidMount() {
        var jwt = localStorage.getItem("jwt");
        if (!jwt) {
            this.setState({
                showLogin: true,
            })
        }
    }

    signup(res) {
        localStorage.setItem("jwt", res.data.password_digest)
        localStorage.setItem("email", res.data.email)

        this.setState({
            showLogin: false
        })
    }

    login(res, email) {
        localStorage.setItem("jwt", res.data.jwt)
        localStorage.setItem("email", email)

        this.setState({
            showLogin: false
        })
    }
    
    createActivity(email) {
        let productive_failure = {
            productive_failure: {
                owner_id: localStorage.getItem('email')
            }
        }

        axios.post('http://localhost:3001/api/v1/productive_failures', productive_failure)
        .then(res => {
            this.props.history.push(`productive-failure/${res.data.id}/generation-one`)
        })
        // Todo: error in creation account
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="Home">
                <Login 
                    open={this.state.showLogin}
                    signup={this.signup}
                    login={this.login}
                />

                {!this.state.showLogin && (
                    <UserActivities
                        createActivity={this.createActivity}
                    />
                )}
            </div>
        );
    }
}
