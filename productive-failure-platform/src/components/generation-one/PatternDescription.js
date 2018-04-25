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

    renderPattern(givenPattern) {
        let patternArray = givenPattern.pattern.split('-');
        // Duplicate pattern
        let patternCopy = _.cloneDeep(patternArray);
        let pattern = patternArray.concat(patternCopy, patternCopy)

        return pattern.map((shape, id) => {
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
            <Panel>
                <Panel.Body>
                    <div className="PatternDescription pattern-titles">
                        <div className="PatternDescription--pattern">
                            <h4>First pattern</h4>
                        </div>
                        <div className="PatternDescription--pattern">
                            <h4>Second pattern</h4>
                        </div>
                    </div>
                    <div className="PatternDescription">
                        <div className="PatternDescription--pattern">
                            {this.props.patterns.length > 0 && this.renderPattern(this.props.patterns[0])}
                        </div>
                        <div className="PatternDescription--pattern second-pattern">
                            {this.props.patterns.length > 0 && this.renderPattern(this.props.patterns[1])}
                        </div>
                    </div>
                </Panel.Body>
            </Panel>
        );
    }
}
