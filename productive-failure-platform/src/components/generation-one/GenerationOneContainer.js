import React, { Component } from 'react';
import PatternDescription from './PatternDescription';
import GenerationOneSolutions from './GenerationOneSolutions';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
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

    // TODO: please refactor this
    checkActivityPattern() {
        // TODO: look at better way to have id of productive failure activity
        let url = window.location.href;
        let splitString = _.split(url, '/');
        let id = splitString[splitString.length - 2];

        axios.get(`http://localhost:3001/api/v1/activity_patterns?productive_failure_id=${id}`)
        .then(response => {
            if (response.data === null || response.data.length === 0) {
                axios.get('http://localhost:3001/api/v1/patterns')
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

                    axios.post('http://localhost:3001/api/v1/activity_patterns', {
                        headers: {
                            'Content-Type': 'application/json'
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
                    axios.get(`http://localhost:3001/api/v1/patterns/${response.data[i].pattern_id}`)
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
        .catch(error => console.log(error))
    }
    
    render() {
        if (this.state.patterns.length !== 2) {
            return (
                // Loading page
                <div></div>
            )
        } else {
            return (
                <div className="stage-1-container">
                    <Modal show={this.state.showModal} onHide={this.handleOpenCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Productive Failure activity - generation, step one</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4>How it works</h4>
                            <p>In this box you see a pattern, composed of shapes. Your goal in this first step is to try to come up with 
                            as many representations of the pattern as possible.</p>
                            <p>You can click on the elements in the <b>Elements</b> section: this will allow you to use the selected tool 
                            in the <b>Representations</b> section.</p>
                            <p>You can add multiple descriptions for the pattern: just click on the <b>Forward</b> and <b>Back</b> buttons.</p>
                            <p> For each representation, you will be provided with a constraint: this means that you won't be able to use certain 
                            tools.</p>
                            <p>You can modify the representations as many times as you want. Once you are ready to move on, click on
                            the <b>Take me to the next stage</b> button.</p>
    
                            <div className="modal-button">
                                <Button bsStyle="primary" onClick={this.handleOpenCloseModal}>Gotcha</Button>
                            </div>
                        </Modal.Body>
                    </Modal>
    
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
            );
        }
    }
}
