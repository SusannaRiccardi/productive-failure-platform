import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
var lc;

// Main page: login or home
export default class StageOneRepresentations extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        lc = window.LC.init(document.getElementsByClassName('literally-core-container')[0]);
    }

    render() {
        return (
            <Panel>
                <Panel.Heading>
                    <Panel.Title componentClass="h3">Representations</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    Constraint: {this.props.representation.constraint}

                    <div className="literally-core-container">
                    </div>
                    
                </Panel.Body>
            </Panel>
        );
    }
}
