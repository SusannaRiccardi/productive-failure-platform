import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PatternDescription from './PatternDescription';
import StageOneElements from './StageOneElements';
import StageOneRepresentations from './StageOneRepresentations';

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
                        <StageOneElements />
                    </Col>
                    <Col sm={6} md={9}>
                        <StageOneRepresentations />
                    </Col>
                </Row>
            </div>
        );
    }
}
