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
                        <div className="circle">
                            <Circle r={20} fill={{color:'#17a2b8'}} stroke={{color:'#17a2b8'}} strokeWidth={3} />
                        </div>
                        <div className="rectangle">
                            <Rectangle width={40} height={40} fill={{color:'#17a2b8'}} stroke={{color:'#17a2b8'}} strokeWidth={3} />
                        </div>
                        <div className="rectangle">
                            <Rectangle width={40} height={40} fill={{color:'#17a2b8'}} stroke={{color:'#17a2b8'}} strokeWidth={3} />
                        </div>
                        <div className="triangle">
                            <Triangle width={40} height={40} fill={{color:'#17a2b8'}} stroke={{color:'#17a2b8'}} strokeWidth={3} />
                        </div>

                        <div className="circle">
                            <Circle r={20} fill={{color:'#17a2b8'}} stroke={{color:'#17a2b8'}} strokeWidth={3} />
                        </div>
                        <div className="rectangle">
                            <Rectangle width={40} height={40} fill={{color:'#17a2b8'}} stroke={{color:'#17a2b8'}} strokeWidth={3} />
                        </div>
                        <div className="rectangle">
                            <Rectangle width={40} height={40} fill={{color:'#17a2b8'}} stroke={{color:'#17a2b8'}} strokeWidth={3} />
                        </div>
                        <div className="triangle">
                            <Triangle width={40} height={40} fill={{color:'#17a2b8'}} stroke={{color:'#17a2b8'}} strokeWidth={3} />
                        </div>

                        <div className="circle">
                            <Circle r={20} fill={{color:'#17a2b8'}} stroke={{color:'#17a2b8'}} strokeWidth={3} />
                        </div>
                        <div className="rectangle">
                            <Rectangle width={40} height={40} fill={{color:'#17a2b8'}} stroke={{color:'#17a2b8'}} strokeWidth={3} />
                        </div>
                        <div className="rectangle">
                            <Rectangle width={40} height={40} fill={{color:'#17a2b8'}} stroke={{color:'#17a2b8'}} strokeWidth={3} />
                        </div>
                        <div className="triangle">
                            <Triangle width={40} height={40} fill={{color:'#17a2b8'}} stroke={{color:'#17a2b8'}} strokeWidth={3} />
                        </div>

                        <div className="circle">
                            <Circle r={20} fill={{color:'#17a2b8'}} stroke={{color:'#17a2b8'}} strokeWidth={3} />
                        </div>
                        <div className="rectangle">
                            <Rectangle width={40} height={40} fill={{color:'#17a2b8'}} stroke={{color:'#17a2b8'}} strokeWidth={3} />
                        </div>
                        <div className="rectangle">
                            <Rectangle width={40} height={40} fill={{color:'#17a2b8'}} stroke={{color:'#17a2b8'}} strokeWidth={3} />
                        </div>
                        <div className="triangle">
                            <Triangle width={40} height={40} fill={{color:'#17a2b8'}} stroke={{color:'#17a2b8'}} strokeWidth={3} />
                        </div>

                    </div>
                </Panel.Body>
            </Panel>
        );
    }
}
