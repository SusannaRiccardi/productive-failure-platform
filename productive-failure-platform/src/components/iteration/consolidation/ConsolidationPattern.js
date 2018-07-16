import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { Rectangle, Circle, Triangle } from 'react-shapes';


// Component for showing the pattern in the consolidation phase
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
            <Panel bsStyle="primary" className="consolidation-pattern">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">Pattern</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <div className="consolidation-pattern--pattern">
                        {this.renderPattern()}
                    </div>
                </Panel.Body>
            </Panel>
        );
    }
}
