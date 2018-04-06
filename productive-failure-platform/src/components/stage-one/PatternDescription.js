import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { Rectangle, Circle, Triangle } from 'react-shapes';

// Main page: login or home
export default class PatternDescription extends Component {
    render() {
        return (
            <Panel>
                <Panel.Body>
                    <div className="PatternDescription-description">
                        Described here is a pattern. Your goal is to try to come up with as many representations of the pattern as possible.
                        You can drag the elements in the <b>Elements</b> section and drop them in the <b>Solutions</b> section. You should 
                        submit four represenations. For each representation, you will have a constraint, which you need to respect in order
                        to come up with a solution. You can go through your represenations and modify them. When you think you are finished,
                        click on the button <b>Take me to the next stage</b>.
                    </div>

                    <div className="PatternDescription-title">
                        Here is the pattern you need to describe:
                    </div>

                    <div className="PatternDescription-pattern">
                        <Circle r={25} fill={{color:'#337ab7'}} stroke={{color:'#337ab7'}} strokeWidth={3} />
                        <Rectangle width={50} height={50} fill={{color:'#337ab7'}} stroke={{color:'#337ab7'}} strokeWidth={3} />
                        <Rectangle width={50} height={50} fill={{color:'#337ab7'}} stroke={{color:'#337ab7'}} strokeWidth={3} />
                        <Triangle width={50} height={50} fill={{color:'#337ab7'}} stroke={{color:'#337ab7'}} strokeWidth={3} />

                        <Circle r={25} fill={{color:'#337ab7'}} stroke={{color:'#337ab7'}} strokeWidth={3} />
                        <Rectangle width={50} height={50} fill={{color:'#337ab7'}} stroke={{color:'#337ab7'}} strokeWidth={3} />
                        <Rectangle width={50} height={50} fill={{color:'#337ab7'}} stroke={{color:'#337ab7'}} strokeWidth={3} />
                        <Triangle width={50} height={50} fill={{color:'#337ab7'}} stroke={{color:'#337ab7'}} strokeWidth={3} />

                        <Circle r={25} fill={{color:'#337ab7'}} stroke={{color:'#337ab7'}} strokeWidth={3} />
                        <Rectangle width={50} height={50} fill={{color:'#337ab7'}} stroke={{color:'#337ab7'}} strokeWidth={3} />
                        <Rectangle width={50} height={50} fill={{color:'#337ab7'}} stroke={{color:'#337ab7'}} strokeWidth={3} />
                        <Triangle width={50} height={50} fill={{color:'#337ab7'}} stroke={{color:'#337ab7'}} strokeWidth={3} />

                        <Circle r={25} fill={{color:'#337ab7'}} stroke={{color:'#337ab7'}} strokeWidth={3} />
                        <Rectangle width={50} height={50} fill={{color:'#337ab7'}} stroke={{color:'#337ab7'}} strokeWidth={3} />
                        <Rectangle width={50} height={50} fill={{color:'#337ab7'}} stroke={{color:'#337ab7'}} strokeWidth={3} />
                        <Triangle width={50} height={50} fill={{color:'#337ab7'}} stroke={{color:'#337ab7'}} strokeWidth={3} />

                        <Circle r={25} fill={{color:'#337ab7'}} stroke={{color:'#337ab7'}} strokeWidth={3} />
                        <Rectangle width={50} height={50} fill={{color:'#337ab7'}} stroke={{color:'#337ab7'}} strokeWidth={3} />
                        <Rectangle width={50} height={50} fill={{color:'#337ab7'}} stroke={{color:'#337ab7'}} strokeWidth={3} />
                        <Triangle width={50} height={50} fill={{color:'#337ab7'}} stroke={{color:'#337ab7'}} strokeWidth={3} />
                    </div>
                </Panel.Body>
            </Panel>
        );
    }
}
