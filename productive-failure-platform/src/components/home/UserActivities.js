import React, { Component } from 'react';
import { Button, Panel, Table } from 'react-bootstrap';
import axios from 'axios';


export default class UserActivities extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productive_failures : []
        }

        this.renderRepresentations = this.renderRepresentations.bind(this);
    }

    componentDidMount() {
        let id = localStorage.getItem('id');
        if (id) {
            axios.get(`http://localhost:3001/api/iteration/productive_failures?owner_id=${id}`)
            .then(res => {
                this.setState({
                    productive_failures: res.data
                })
            })
            .catch(err => console.log(err))
        }
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
                 <Panel className="UserActivites--createPanel" bsStyle="primary">
                    <Panel.Body className="pattern-generation-one__body">
                        <Button onClick={() => this.props.createActivity('iteration')}>Start new activity</Button>
                    </Panel.Body>
                </Panel>

                <Table responsive>
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
