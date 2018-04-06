import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import PatternDescription from './PatternDescription';
import StageOneSolutions from './StageOneSolutions';
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

                <StageOneSolutions />
            </div>
        );
    }
}
