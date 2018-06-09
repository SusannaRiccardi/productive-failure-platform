import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import GenerationOneContainer from './generation-one/GenerationOneContainer';
import GenerationTwoContainer from './generation-two/GenerationTwoContainer';
import ConsolidationContainer from './consolidation/ConsolidationContainer';

export default class Display extends Component {
    render() {
        return (
            <div>
                <Route path="/productive-failure/:id/generation-one" component={GenerationOneContainer}/>
                <Route path="/productive-failure/:id/generation-two" component={GenerationTwoContainer}/>
                <Route path="/productive-failure/:id/consolidation" component={ConsolidationContainer}/>
            </div>
        );
    }
}
