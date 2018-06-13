import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';


// Navbar at the top of the activity.
export default class Banner extends Component {
    constructor(props) {
        super(props);

        this.renderStep = this.renderStep.bind(this);
    }

    // Based on the step of the activity we are currently in, return the title of the step. 
    // (Only for Iteration at the moment)
    renderStep(step) {
        switch (step) {
            case 1:
                return "Identify and Describe Patterns";
            case 2:
                return "Interpret Pattern Descriptions";
            case 3: 
                return "Combine Insights from Different Solutions";
        }
    }
    
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        Productive Failure
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Text>
                    Step <b>{this.props.step} / 3</b>: {this.renderStep(this.props.step)}
                </Navbar.Text>
            </Navbar>
        );
    }
}
