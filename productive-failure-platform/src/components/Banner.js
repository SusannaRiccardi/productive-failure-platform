import React, { Component } from 'react';
import { Navbar, Nav, ProgressBar } from 'react-bootstrap';
var _ = require('lodash');


export default class Banner extends Component {
    constructor() {
        super();
        
        this.state = {
            step : this.findStep()
        }

        this.findStep = this.findStep.bind(this);
    }

    findStep() {
        // TODO: look at better way to have the step
        let url = window.location.href;
        let splitString = _.split(url, '/');
        
        let step;
        if (splitString[splitString.length - 1] === 'generation-one') {
            step = 33
        } else if (splitString[splitString.length - 1] === 'generation-two') {
            step = 66
        }

        return step;
    }
    
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        Productive Failure
                    </Navbar.Brand>
                </Navbar.Header>
                <ProgressBar label={`Progress: ${this.state.step/33} / 3`} now={this.state.step} />
            </Navbar>
        );
    }
}
