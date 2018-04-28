import React, { Component } from 'react';
import { Panel, Row, Col, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import PatternGeneration from './PatternGeneration';
var lc;


export default class GenerationTwoContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            representation : null,
            showModal : true
        }

        this.handleOpenCloseModal = this.handleOpenCloseModal.bind(this);
    }
    
    componentWillMount() {
        axios.get('http://localhost:3001/api/v1/representation')
        .then(response => {
            this.setState({
                representation: response.data
            }, () => {
                lc = window.LC.init(document.getElementsByClassName('literally-core-container')[0]);
                lc.loadSnapshot(JSON.parse(this.state.representation.svg));
            })
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
                            <div className="literally-core-container">
                            </div>
                        </Panel.Body>
                    </Panel>
                </Row>

                <PatternGeneration />

                {!this.state.showModal && <Button bsStyle="info" onClick={this.handleOpenCloseModal}>Get info about this step</Button>}
            </div>
        );
    }
}
