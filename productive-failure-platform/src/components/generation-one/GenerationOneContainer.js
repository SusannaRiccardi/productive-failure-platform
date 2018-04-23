import React, { Component } from 'react';
import PatternDescription from './PatternDescription';
import GenerationOneSolutions from './GenerationOneSolutions';
import axios from 'axios';

export default class GenerationOneContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            patterns : []
        }
        
        this.requestPattern = this.requestPattern.bind(this);
    }

    componentWillMount() {
        this.requestPattern()
    }

    requestPattern() {
        // Request patterns that we'll use to be rendered in generation one
        axios.get('http://localhost:3001/api/v1/patterns')
        .then(response => {
            this.setState({
                patterns: response.data
            })
        })
        .catch(error => console.log(error))
    }
    
    render() {
        return (
            <div className="generation-one-container">
                <div className="generation-one-pattern">
                    <PatternDescription 
                        patterns={this.state.patterns}
                    />
                </div>

                <GenerationOneSolutions 
                    patterns={this.state.patterns}
                />
            </div>
        );
    }
}
