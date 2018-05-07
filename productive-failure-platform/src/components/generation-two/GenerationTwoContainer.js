import React, { Component } from 'react';
import { Panel, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import PatternGeneration from './PatternGeneration';
var _ = require('lodash');


export default class GenerationTwoContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            representations : [],
            showModal : true
        }

        this.getReconstructPattern = this.getReconstructPattern.bind(this);
        this.handleOpenCloseModal = this.handleOpenCloseModal.bind(this);
    }
    
    componentWillMount() {
        this.getReconstructPattern();
    }

    getReconstructPattern() {
        // TODO: look at better way to have id of productive failure activity
        let url = window.location.href;
        let splitString = _.split(url, '/');
        let id = splitString[splitString.length - 2];

        axios.get(`http://localhost:3001/api/v1/reconstruct_patterns?productive_failure_id=${id}`)
        .then(response => {
            if (response.data === null || response.data.length === 0) {
                // Get pattern if no reconstruct_pattern with this productive_failure_id exists
                axios.get('http://localhost:3001/api/v1/representation')
                .then(response => {
                    this.setState({
                        representations: response.data
                    })

                    let reconstructPatterns = [];

                    for (let i = 0; i < response.data.length; i++) {
                        let reconstructPattern = {
                            reconstructPattern : {
                                productive_failure_id: id,
                                representation_id: response.data[i].id
                            }
                        }
                        reconstructPatterns.push(reconstructPattern)
                    }

                    axios.post('http://localhost:3001/api/v1/reconstruct_patterns', {
                        headers: {
                            'Content-Type': 'application/json'
                        }, data : JSON.stringify(reconstructPatterns)
                    })
                    .then(response => {
                        this.setState({
                            reconstructPattern : response.data
                        })
                    })
                    .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
            } else {
                this.setState({
                    reconstructPatterns : response.data
                })

                for (let i = 0; i < response.data.length; i++) {
                    axios.get(`http://localhost:3001/api/v1/representations/${response.data[i].representation_id}`)
                    .then(response => {
                        let representations = _.cloneDeep(this.state.representations)
                        representations.push(response.data)

                        this.setState({
                            representations: representations
                        })
                    })
                    .catch(error => console.log(error))
                }
            }
        })
        .catch(error => console.log(error))
    }

    handleOpenCloseModal() {
        this.setState({
            showModal : !this.state.showModal
        })
    }

    render() {
        return (
            <div className="generation-two-container">
                <Modal show={this.state.showModal} onHide={this.handleOpenCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Productive Failure activity - generation, step two</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>How it works</h4>
                        In this stage, you will see a description of a pattern by someone else. Your goal here is to reproduce
                        the original pattern from the given representation. Drag the elements below and complete the pattern.

                        <div className="modal-button">
                            <Button bsStyle="primary" onClick={this.handleOpenCloseModal}>Gotcha</Button>
                        </div>
                    </Modal.Body>
                </Modal>
                {this.state.representations.length === 2 && (
                    <div className="representations-container">
                        <Panel className="representation-one" bsStyle="info">
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">First representation</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body className="representation-stage-two">
                                <div className="representation-stage-two" dangerouslySetInnerHTML={{__html: this.state.representations[0].svg}}/>
                            </Panel.Body>
                        </Panel>
                        <Panel className="representation-two" bsStyle="info">
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">Second representation</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body className="representation-stage-two">
                                <div className="representation-stage-two" dangerouslySetInnerHTML={{__html: this.state.representations[1].svg}}/>
                            </Panel.Body>
                        </Panel>
                    </div>
                )}

                <PatternGeneration />

                {!this.state.showModal && <Button bsStyle="info" onClick={this.handleOpenCloseModal}>Get info about this step</Button>}
            </div>
        );
    }
}
