import React, { Component } from 'react';
import Login from './Login';


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showLogin: false
        }

        // this.login = this.login.bind(this);
        // this.getProductiveFailures = this.getProductiveFailures.bind(this);
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        var jwt = localStorage.getItem("jwt");
        if (!jwt) {
            this.setState({
                showLogin: true
            })
        }
    }

    signup(res) {
        localStorage.setItem("jwt", res.data.password_digest)

        this.setState({
            showLogin: false
        })
    }

    login(res) {
        localStorage.setItem("jwt", res.data.jwt)

        this.setState({
            showLogin: false
        })
    }
    
    // getProductiveFailures() {
    //     let token = "Bearer " + localStorage.getItem("jwt")
    //     console.log(token)

    //     axios.get('http://localhost:3001/api/v1/activity_patterns', {
    //         headers: {
    //             authorization: token
    //         }
    //     })
    //     .then(res => {
    //         console.log(res)
    //     })
    //     .catch(err => console.log(err))
    // // $.ajax({
    // //   url: "http://localhost:3000/api/bananas",
    // //   type: "GET",
    // //   beforeSend: function(xhr){xhr.setRequestHeader('Authorization', token)},
    // //   context: this, // Allows us to use this.setState inside success
    // //   success: function (result) {
    // //     console.log(result)
    // //     this.setState({bananasReceived: JSON.stringify(result)})
    // //   }
    // // })
    // }

    render() {
        return (
            <div className="Home">
                <Login 
                    open={this.state.showLogin}
                    signup={this.signup}
                    login={this.login}
                />

                {!this.state.showLogin && (
                    <p>todo show getProductiveFailures</p>
                )}

                {/* <h1 style={{marginTop: "20vh", marginBottom: "5vh"}}>
                    Login
                </h1> */}

                {/* Todo: show modal with input and save into state */}
                {/* <form>
                    <label htmlFor="email">Email: </label>
                    <br />
                    <input
                        name="email"
                        id="email"
                        type="email"
                    />
                    <br /><br />
                    <label htmlFor="password">Password:</label>
                    <br />
                    <input
                        name="password"
                        id="password"
                        type="password"
                    />
                </form>
                <br />
                <button
                    onClick={this.login}
                >
                    Login
                </button> */}
                {/* <br />
                <button
                    onClick={this.getProductiveFailures}
                    style={{marginTop: "10vh"}}
                >
                    get bananas?
                </button>
                <p>{this.state.bananasReceived}</p> */}
            </div>
        );
    }
}
