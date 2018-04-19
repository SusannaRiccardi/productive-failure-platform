import React, { Component } from 'react';
import PatternDescription from './PatternDescription';
import GenerationOneSolutions from './GenerationOneSolutions';

export default class GenerationOneContainer extends Component {
    render() {
        return (
            <div className="stage-1-container">
                <div className="stage-1--pattern">
                    <PatternDescription />
                </div>

                <GenerationOneSolutions />
            </div>
        );
    }
}
