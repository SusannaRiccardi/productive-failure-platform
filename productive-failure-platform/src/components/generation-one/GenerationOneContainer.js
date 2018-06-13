import React, { Component } from 'react';
import PatternDescription from './PatternDescription';
import GenerationOneSolutions from './GenerationOneSolutions';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import GenerationOneTutorial from './GenerationOneTutorial';
import Banner from '../Banner';
var _ = require('lodash');


export default class GenerationOneContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            patterns : [],
            showModal : true,
            activityPatterns : []
        }
        
        this.checkActivityPattern = this.checkActivityPattern.bind(this);
        this.handleOpenCloseModal = this.handleOpenCloseModal.bind(this);
    }

    componentWillMount() {
        this.checkActivityPattern();
    }

    handleOpenCloseModal() {
        this.setState({
            showModal : !this.state.showModal
        })
    }

    checkActivityPattern() {
        const id = localStorage.getItem('productive-failure')
        const auth = localStorage.getItem('jwt');

        axios.get(`http://localhost:3001/api/iteration/activity_patterns?productive_failure_id=${id}`, {
            headers: {
                Authorization: auth
            }
        })
        .then(response => {
            if (response.data === null || response.data.length === 0) {
                axios.get('http://localhost:3001/api/iteration/patterns', {
                    headers: {
                        Authorization: auth
                    }
                })
                .then(response => {
                    this.setState({
                        patterns: response.data
                    })

                    let activityPatterns = [];

                    for (let i = 0; i < response.data.length; i++) {
                        let activityPattern = {
                            activityPattern : {
                                productive_failure_id: id,
                                pattern_id: response.data[i].id
                            }
                        }
                        activityPatterns.push(activityPattern)
                    }

                    axios.post('http://localhost:3001/api/iteration/activity_patterns', {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: auth
                        }, data : JSON.stringify(activityPatterns)
                    })
                    .then(response => {
                        this.setState({
                            activityPatterns: response.data
                        })
                    })
                    .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
            } else {
                this.setState({
                    activityPatterns : response.data
                })

                for (let i = 0; i < response.data.length; i++) {
                    axios.get(`http://localhost:3001/api/iteration/patterns/${response.data[i].pattern_id}`, {
                        headers: {
                            Authorization: auth
                        }
                    })
                    .then(response => {
                        let patterns = _.cloneDeep(this.state.patterns)
                        patterns.push(response.data)

                        this.setState({
                            patterns: patterns
                        })
                    })
                    .catch(error => console.log(error))
                }
            }
        })
        .catch((error) => {
            this.props.history.replace('/')
        })
    }
    
    render() {
        if (this.state.patterns.length !== 2) {
            return (
                // Loading page
                <div></div>
            )
        } else {
            return (
                <div>
                    <Banner step={1}/>
                    <div className="stage-1-container">
                        <GenerationOneTutorial 
                            open={this.state.showModal}
                            close={this.handleOpenCloseModal}
                        />
        
                        <div className="stage-1--pattern">
                            <PatternDescription 
                                patterns={this.state.patterns}
                            />
                        </div>
        
                        <GenerationOneSolutions 
                            patterns={this.state.patterns}
                            activityPatterns={this.state.activityPatterns}
                        />
        
                        {!this.state.showModal && <Button bsStyle="info" onClick={this.handleOpenCloseModal}>Get info about this step</Button>}
                    </div>
                </div>
            );
        }
    }
}
