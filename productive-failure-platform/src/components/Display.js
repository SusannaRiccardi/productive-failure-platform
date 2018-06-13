import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import GenerationOneContainer from './iteration/generation-one/GenerationOneContainer';
import GenerationTwoContainer from './iteration/generation-two/GenerationTwoContainer';
import ConsolidationContainer from './iteration/consolidation/ConsolidationContainer';

export default class Display extends Component {
    render() {
        return (
            <Switch>
                <Route path="/productive-failure/:id/generation-one" component={GenerationOneContainer}/>
                <Route path="/productive-failure/:id/generation-two" component={GenerationTwoContainer}/>
                <Route path="/productive-failure/:id/consolidation" component={ConsolidationContainer}/>
                <Redirect to={'/'} />
            </Switch>
        );
    }
}
