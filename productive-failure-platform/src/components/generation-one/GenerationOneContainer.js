import React, { Component } from 'react';
import PatternDescription from './PatternDescription';
import GenerationOneSolutions from './GenerationOneSolutions';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';


export default class GenerationOneContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            patterns : [],
            showModal : true
        }
        
        this.requestPattern = this.requestPattern.bind(this);
        this.handleOpenCloseModal = this.handleOpenCloseModal.bind(this);
    }

    componentWillMount() {
        this.requestPattern()
    }

    handleOpenCloseModal() {
        this.setState({
            showModal : !this.state.showModal
        })
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
                />
            </div>
        );
    }
}
