import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ProductiveFailureStageOneContainer from './ProductiveFailureStageOneContainer';
import ProductiveFailureStageTwoContainer from './ProductiveFailureStageTwoContainer';
import ProductiveFailureStageThreeContainer from './ProductiveFailureStageThreeContainer';

export default class Display extends Component {
	constructor(props) {
		super(props)
	}

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
