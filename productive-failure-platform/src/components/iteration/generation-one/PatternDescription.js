import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { Rectangle, Circle, Triangle } from 'react-shapes';


// Panels containing the two patterns shown in the generation one
export default class PatternDescription extends Component {
    constructor(props) {
        super(props);

        this.renderPattern = this.renderPattern.bind(this);
    }

    // render given pattern
    renderPattern(givenPattern) {
        let patternArray = givenPattern.pattern.split('-');

        return patternArray.map((shape, id) => {
            if (shape === "circle") {
                return (
                    <div className="pattern--circle" key={id}>
                        <Circle r={15} fill={{color:'#fac863'}} stroke={{color:'#fac863'}} strokeWidth={3} />
                    </div>
                )
            } else if (shape === "triangle") {
                return (
                    <div className="pattern--triangle" key={id}>
                        <Triangle width={30} height={30} fill={{color:'#d9534f'}} stroke={{color:'#d9534f'}} strokeWidth={3} />
                    </div>
                )
            } else if (shape === "square") {
                return (
                    <div className="pattern--square" key={id}>
                        <Rectangle width={30} height={30} fill={{color:'#5cb85c'}} stroke={{color:'#5cb85c'}} strokeWidth={3} />
                    </div>
                )
            }
        })
    }
    
    
    render() {
        return (
            <div className="pattern-description-container">
                <Panel bsStyle="primary" className="pattern-description-one">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">First pattern</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <div className="PatternDescription--pattern">
                            {this.props.patterns.length > 0 && this.renderPattern(this.props.patterns[0])}
                        </div>
                    </Panel.Body>
                </Panel>
                <Panel bsStyle="primary" className="pattern-description-two">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">Second pattern</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <div className="PatternDescription--pattern">
                            {this.props.patterns.length > 0 && this.renderPattern(this.props.patterns[1])}
                        </div>
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}
