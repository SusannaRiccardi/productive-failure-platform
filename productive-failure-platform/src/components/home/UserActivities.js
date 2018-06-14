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
        return this.state.productive_failures.map((rep, key) => {
            return (
                <tr key={key}>
                    <td>{rep.activity_type}</td>
                </tr>
            )
        })
    }
    
    render() {
        return (
            <div className="UserActivities--container">
                 <Panel className="UserActivites--createPanel" onClick={() => this.props.createActivity('iteration')}>
                    <Panel.Body>Start new Productive Failure activity on Iteration</Panel.Body>
                </Panel>

                <Table responsive striped>
                    <thead>
                        <tr>
                            <th>Type</th>
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
