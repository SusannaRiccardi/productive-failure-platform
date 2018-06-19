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
                        <p className="tutorial-text">In this final step, you will see a pattern and <b>six representations</b> that are related to the pattern that 
                        you can see at the top of the page.</p>
                        <p className="tutorial-text">Your <b>goal</b> here is to rank the representations, from best to worst.</p>

                        <p className="tutorial-text">In order to do so, you can drag one representation from the list in the right column and you
                        can drop it in the boxes with the rankings in the left column.</p>
                    </div>
                    <div className="modal-button">
                        <Button bsStyle="primary" onClick={this.props.close}>Got it</Button>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}
