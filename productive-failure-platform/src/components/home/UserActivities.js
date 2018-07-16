import React, { Component } from 'react';
import { Button, Panel, Table } from 'react-bootstrap';
import axios from 'axios';


export default class UserActivities extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productive_failures : props.productive_failures
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            productive_failures: props.productive_failures
        })
    }

    renderRepresentations() {
        if (this.state.productive_failures.length == 0) {
            return (
                <tr>
                    <td colSpan="2">You have not started any activity yet.</td>
                </tr>
            )
        } else {
            return this.state.productive_failures.map((rep, key) => {
                let date = new Date(rep.created_at);
                let day = date.getDate();
                let month = date.getMonth() + 1;
                if (month < 10) month = '0' + month
                let year = date.getFullYear();
                let hour = date.getHours();
                if (hour < 10) hour = '0' + month
                let minutes = date.getMinutes();
                if (minutes < 10) minutes = '0' + minutes
    
                let stringDate = day + '-' + month + '-' + year + ', ' + hour + ':' + minutes;
                return (
                    <tr key={key}>
                        <td>{rep.activity_type}</td>
                        <td>{stringDate}</td>
                    </tr>
                )
            })
        }
    }
    
    render() {
        return (
            <div className="UserActivities--container">
                <Table responsive bordered>
                    <thead>
                        <tr>
                            <th>Activities</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><Button bsStyle="link" onClick={() => this.props.createActivity('Iteration')}>Start new activity on Iteration</Button></td>
                        </tr>
                    </tbody>
                </Table>

                <Table responsive striped bordered>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRepresentations()}
                    </tbody>
                </Table>
            </div>
        )
    }
}
