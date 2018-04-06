import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ProductiveFailureStageOneContainer from './stage-one/ProductiveFailureStageOneContainer';
import ProductiveFailureStageTwoContainer from './ProductiveFailureStageTwoContainer';
import ProductiveFailureStageThreeContainer from './ProductiveFailureStageThreeContainer';

export default class Display extends Component {
    render() {
        return (
            <div>
                <Route path="/productive-failure/:id/stage-1" component={ProductiveFailureStageOneContainer}/>
                <Route path="/productive-failure/:id/stage-2" component={ProductiveFailureStageTwoContainer}/>
                <Route path="/productive-failure/:id/stage-3" component={ProductiveFailureStageThreeContainer}/>
            </div>
        );
    }
}
