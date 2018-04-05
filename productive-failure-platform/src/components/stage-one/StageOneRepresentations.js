import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

// Main page: login or home
export default class StageOneRepresentations extends Component {
	constructor(props) {
		super(props)
	}

    render() {
        return (
            <Panel>
                <Panel.Heading>
                    <Panel.Title componentClass="h3">Representations</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    
                </Panel.Body>
            </Panel>
        );
    }
}
