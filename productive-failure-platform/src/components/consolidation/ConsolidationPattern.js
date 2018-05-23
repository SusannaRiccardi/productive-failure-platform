import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { Rectangle, Circle, Triangle } from 'react-shapes';
var _ = require('lodash');


export default class ConsolidationPattern extends Component {
    constructor(props) {
        super(props);

        this.renderPattern = this.renderPattern.bind(this);
    }

    renderPattern() {
        let patternArray = this.props.pattern.split('-');

        return patternArray.map((shape, id) => {
            if (shape === "circle") {
                return (
                    <div className="pattern--circle" key={id}>
                        <Circle r={15} fill={{color:'#17a2b8'}} stroke={{color:'#17a2b8'}} strokeWidth={3} />
                    </div>
                )
            } else if (shape === "triangle") {
                return (
                    <div className="pattern--triangle" key={id}>
                        <Triangle width={30} height={30} fill={{color:'#17a2b8'}} stroke={{color:'#17a2b8'}} strokeWidth={3} />
                    </div>
                )
            } else if (shape === "square") {
                return (
                    <div className="pattern--square" key={id}>
                        <Rectangle width={30} height={30} fill={{color:'#17a2b8'}} stroke={{color:'#17a2b8'}} strokeWidth={3} />
                    </div>
                )
            }
        })
    }
    
    
    render() {
        return (
            <Panel className="consolidation-pattern">
                <Panel.Body>
                    <div className="consolidation-pattern--pattern">
                        {this.renderPattern()}
                    </div>
                </Panel.Body>
            </Panel>
        );
    }
}
