import React, { Component } from 'react';
import { Navbar, Nav, ProgressBar } from 'react-bootstrap';
var _ = require('lodash');


export default class Banner extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            step : this.findStep(props)
        }

        this.findStep = this.findStep.bind(this);
    }

    findStep(props) {
        let step = 1;
        if (props.step === 1) {
            step = 33
        } else if (props.step === 2) {
            step = 66
        } else if (props.step === 3) {
            step = 100
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
                <ProgressBar label={`Progress: ${this.props.step} / 3`} now={this.state.step} />
            </Navbar>
        );
    }
}
