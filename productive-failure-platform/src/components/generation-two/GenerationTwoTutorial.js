import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import gif from '../../img/gif.gif';


export default class GenerationTwoTutorial extends Component {
    render() {
        return (
            <Modal show={this.props.open} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Step 2: Interpret Pattern Descriptions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="tutorial-container">
                        <h4>How it works</h4>
                        <p className="tutorial-text">In this step, you will see <b>two representations</b> that have been created by other people.</p>
                        <p className="tutorial-text">Your <b>goal</b> here is to recreate the original patterns that are described in the representations.</p>

                        <p className="tutorial-text">In order to do this, you can drag and drop the shaps into the containers of the patterns.</p>

                        <div className="tutorial-gif-container">
                            <img className="tutorial-gif" src={gif} alt="tutorial-gif" />
                        </div>

                        <p className="tutorial-text">Once you're done, you can click on the <b>finish</b> button to save and go to the next step.</p>
                    </div>
                    <div className="modal-button">
                        <Button bsStyle="primary" onClick={this.props.close}>Got it</Button>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}
