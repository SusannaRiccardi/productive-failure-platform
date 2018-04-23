import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { Rectangle, Circle, Triangle } from 'react-shapes';
var _ = require('lodash');


// Main page: login or home
export default class PatternDescription extends Component {
    constructor(props) {
        super(props);

        this.renderPattern = this.renderPattern.bind(this);
    }

    renderPattern() {
        let pattern = this.props.patterns[0].pattern.split('-');
        // TODO: duplicate pattern

        return pattern.map((shape, id) => {
            if (shape === "circle") {
                return (
                    <div className="pattern--circle" key={id}>
                        <Circle r={20} fill={{color:'#17a2b8'}} stroke={{color:'#17a2b8'}} strokeWidth={3} />
                    </div>
                )
            } else if (shape === "triangle") {
                return (
                    <div className="pattern--triangle" key={id}>
                        <Triangle width={40} height={40} fill={{color:'#17a2b8'}} stroke={{color:'#17a2b8'}} strokeWidth={3} />
                    </div>
                )
            } else if (shape === "square") {
                return (
                    <div className="pattern--square" key={id}>
                        <Rectangle width={40} height={40} fill={{color:'#17a2b8'}} stroke={{color:'#17a2b8'}} strokeWidth={3} />
                    </div>
                )
            }
        })
    }
    
    
    render() {
        return (
            <Panel>
                <Panel.Body>
                    <div className="PatternDescription-pattern">
                        {this.props.patterns.length > 0 && this.renderPattern()}
                    </div>
                </Panel.Body>
            </Panel>
        );
    }
}
