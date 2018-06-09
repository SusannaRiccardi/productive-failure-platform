import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';


export default class UserActivities extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="UserActivities--container">
                 <Panel className="UserActivites--createPanel" bsStyle="primary">
                    <Panel.Heading className="UserActivites__heading">
                        <Panel.Title componentClass="h3">Start new activity</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body className="pattern-generation-one__body">
                        <Button onClick={() => this.props.createActivity()}>Start</Button>
                    </Panel.Body>
                </Panel>
            </div>
        )
    }
}
