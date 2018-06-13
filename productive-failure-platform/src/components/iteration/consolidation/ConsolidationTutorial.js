import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';


// Tutorial component for consolidation phase
export default class ConsolidationTutorial extends Component {
    render() {
        return (
            <Modal show={this.props.open} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Productive Failure activity - consolidation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="tutorial-container">
                        <h4>How it works</h4>
                        <p className="tutorial-text">In this final step, you will see a pattern and <b>six representations</b> that are related to the pattern.</p>
                        <p className="tutorial-text">Your <b>goal</b> here is to rank the representations, from best to worst.</p>
                    </div>
                    <div className="modal-button">
                        <Button bsStyle="primary" onClick={this.props.close}>Got it</Button>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}
