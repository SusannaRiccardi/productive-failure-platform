import React, { Component } from 'react';
import Login from './Login';
import UserActivities from './UserActivities';
import axios from 'axios';
import Banner from '../Banner';
import { Button } from 'react-bootstrap';


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showLogin: false,
            productiveFailures: []
        }

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.createActivity = this.createActivity.bind(this);
    }

    componentDidMount() {
        var jwt = localStorage.getItem("jwt");
        if (!jwt) {
            this.setState({
                showLogin: true,
            })
        }

        let id = localStorage.getItem('id')
        if (id) {
            axios.get(`http://localhost:3001/api/iteration/productive_failures?owner_id=${id}`)
            .then(res => {
                this.setState({
                    productiveFailures: res.data
                })
            })
            .catch(err => console.log(err))
        }
    }

    login(res, email) {
        localStorage.setItem("jwt", res.data.jwt)

        if (!localStorage.getItem('id')) {
            axios.get(`http://localhost:3001/api/iteration/users?email=${email}`)
            .then(res => {
                localStorage.setItem('id', res.data[0].id)

                axios.get(`http://localhost:3001/api/iteration/productive_failures?owner_id=${res.data[0].id}`)
                .then(res => {
                    this.setState({
                        productiveFailures: res.data
                    })
                })
                .catch(err => console.log(err))
            })
            // todo: catch error
            .catch(err => console.log(err))
        }

        this.setState({
            showLogin: false
        })
    }

    logout() {
        localStorage.clear();
        window.location.reload();
    }
    
    createActivity(type) {
        let productive_failure = {
            productive_failure: {
                owner_id: localStorage.getItem('id'),
                activity_type: type
            }
        }

        axios.post('http://localhost:3001/api/iteration/productive_failures', productive_failure)
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
                <Banner/>
                <Login 
                    open={this.state.showLogin}
                    login={this.login}
                />

                <div className="Home--UserActivities">
                    {!this.state.showLogin && (
                        <UserActivities
                            createActivity={this.createActivity}
                            productive_failures={this.state.productiveFailures}
                        />
                    )}

                {!this.state.showLogin && <Button bsStyle="primary" className="Logout-button" onClick={() => this.logout()}>Logout</Button>}
                </div>
            </div>
        );
    }
}
