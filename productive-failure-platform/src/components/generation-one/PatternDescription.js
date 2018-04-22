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
                    <div className="PatternDescription-description">
                        In this box you see a pattern, composed of shapes. Your goal in this first step is to try to come up with 
                        as many representations of the pattern as possible.
                        You can click on the elements in the <b>Elements</b> section: this will allow you to use the selected tool 
                        in the <b>Representations</b> section. <br/>
                        You can add multiple descriptions for the pattern: just click on the <b>Forward</b> and <b>Back</b> buttons. <br/>
                        For each representation, you will be provided with a constraint: this means that you won't be able to use certain tools. <br/>
                        You can modify the representations as many times as you want. Once you are ready to move on, click on
                        the <b>Take me to the next stage</b> button.
                    </div>

                    <div className="PatternDescription-title">
                        Here is the pattern you need to describe:
                    </div>

                    <div className="PatternDescription-pattern">
                        {this.props.patterns.length > 0 && this.renderPattern()}
                    </div>
                </Panel.Body>
            </Panel>
        );
    }
}
