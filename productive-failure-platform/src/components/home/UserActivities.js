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
                    <Panel.Body className="pattern-generation-one__body">
                        <Button onClick={() => this.props.createActivity('iteration')}>Start new activity</Button>
                    </Panel.Body>
                </Panel>
            </div>
        )
    }
}
