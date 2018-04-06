import React, { Component } from 'react';
import PatternDescription from './PatternDescription';
import StageOneSolutions from './StageOneSolutions';

export default class ProductiveFailureStageOneContainer extends Component {
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
