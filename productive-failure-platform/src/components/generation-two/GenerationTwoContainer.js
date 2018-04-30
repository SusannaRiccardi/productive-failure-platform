import React, { Component } from 'react';
import { Panel, Row, Col, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import PatternGeneration from './PatternGeneration';
var _ = require('lodash');


export default class GenerationTwoContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            representation : null,
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
            if (response.data == null || response.data.length == 0) {
                // Get pattern if no reconstruct_pattern with this productive_failure_id exists
                axios.get('http://localhost:3001/api/v1/representation')
                .then(response => {
                    this.setState({
                        representation: response.data
                    })

                    // create reconstruct_pattern
                    let reconstructPattern = {
                        productive_failure_id: id,
                        representation_id: response.data.id
                    }

                    axios.post('http://localhost:3001/api/v1/reconstruct_patterns', reconstructPattern)
                    .then(response => {
                        this.setState({
                            reconstructPattern : response.data
                        })
                    })
                })
                .catch(error => console.log(error))
            } else {
                this.setState({
                    reconstructPattern : response.data[0]
                })
                
                axios.get(`http://localhost:3001/api/v1/representations/${response.data[0].representation_id}`)
                .then(response => {
                    this.setState({
                        representation: response.data
                    })
                })
                .catch(error => console.log(error))
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

                <Row>
                    <Panel>
                        <Panel.Body>
                            {this.state.representation !== null && <div dangerouslySetInnerHTML={{__html: this.state.representation.svg}}/>}
                        </Panel.Body>
                    </Panel>
                </Row>

                <PatternGeneration />

                {!this.state.showModal && <Button bsStyle="info" onClick={this.handleOpenCloseModal}>Get info about this step</Button>}
            </div>
        );
    }
}
