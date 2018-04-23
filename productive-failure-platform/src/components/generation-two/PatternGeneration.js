import React, { Component } from 'react';
import { Panel, Row, Col } from 'react-bootstrap';
import { Rectangle, Circle, Triangle } from 'react-shapes';


export default class GenerationTwoContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="PatternGeneration-container">
                <Row>
                    <Col sm={6} md={2}>
                        <Panel>
                            <Panel.Body>
                                <div className="PatternGeneration-elements">
                                    <div className="pattern--circle">
                                        <Circle r={20} fill={{color:'#17a2b8'}} stroke={{color:'#17a2b8'}} strokeWidth={3} />
                                    </div>

                                    <div className="pattern--triangle">
                                        <Triangle width={40} height={40} fill={{color:'#17a2b8'}} stroke={{color:'#17a2b8'}} strokeWidth={3} />
                                    </div>
            
                                    <div className="pattern--square">
                                        <Rectangle width={40} height={40} fill={{color:'#17a2b8'}} stroke={{color:'#17a2b8'}} strokeWidth={3} />
                                    </div>
                                </div>
                            </Panel.Body>
                        </Panel>
                    </Col>
                    <Col sm={6} md={10}>
                        <Panel>
                            <Panel.Body>
                                <div className="PatternGeneration-solution">
                                </div>
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>
            </div>
        );
    }
}
