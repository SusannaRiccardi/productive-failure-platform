import React, { Component } from 'react';
import { Navbar, ProgressBar } from 'react-bootstrap';


export default class Banner extends Component {
    constructor(props) {
        super(props);

        this.renderStep = this.renderStep.bind(this);
    }

    renderStep(step) {
        switch (step) {
            case 1:
                return "Identify and Describe Patterns";
                break;
            case 2:
                return "Interpret Pattern Descriptions";
                break;
            case 3: 
                return "Combine Insights from Different Solutions";
                break;
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
