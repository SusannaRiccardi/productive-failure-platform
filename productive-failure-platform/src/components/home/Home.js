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

    login(res, email) {
        localStorage.setItem("jwt", res.data.jwt)

        if (!localStorage.getItem('id')) {
            axios.get(`http://localhost:3001/api/v1/users?email=${email}`)
            .then(res => {
                localStorage.setItem('id', res.data[0].id)
            })
            // todo: catch error
            .catch(err => console.log(err))
        }

        this.setState({
            showLogin: false
        })
    }
    
    createActivity(type) {
        let productive_failure = {
            productive_failure: {
                owner_id: localStorage.getItem('id'),
                type: type
            }
        }

        axios.post('http://localhost:3001/api/v1/productive_failures', productive_failure)
        .then(res => {
            localStorage.setItem('productive-failure', res.data.id)
            // todo: iteration
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
                    login={this.login}
                />

                <div className="Home--UserActivities">
                    {!this.state.showLogin && (
                        <UserActivities
                            createActivity={this.createActivity}
                        />
                    )}
                </div>
            </div>
        );
    }
}
