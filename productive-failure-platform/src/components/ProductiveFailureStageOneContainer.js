import React, { Component } from 'react';
import { Panel, Row, Col } from 'react-bootstrap';
import PatternDescription from './PatternDescription';


export default class ProductiveFailureStageOneContainer extends Component {
	constructor(props) {
		super(props)
	}

    render() {
        return (
            <div className="stage-1-container">
                <div className="stage-1--pattern">
                    <PatternDescription />
                </div>

                <Row>
                    <Col sm={6} md={3}>
                        <div className="stage-1--elements">
                            <Panel>
                                <Panel.Body>Draggable elements</Panel.Body>
                            </Panel>
                        </div>
                    </Col>
                    <Col sm={6} md={9}>
                        <div className="stage-1--field">
                            <Panel>
                                <Panel.Body>Field for activity</Panel.Body>
                            </Panel>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
