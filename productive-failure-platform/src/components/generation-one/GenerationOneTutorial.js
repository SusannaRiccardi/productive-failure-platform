import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import example1 from '../../img/example1.png';
import example2 from '../../img/example2.png';


export default class GenerationOneTutorial extends Component {
    constructor() {
        super();

        this.state = {
            step : 0
        }

        this.close = this.close.bind(this);
    }

    close() {
        this.setState({
            step: 0
        })

        this.props.close();
    }

    render() {
        return (
            <Modal show={this.props.open} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Step 1: Identify and Describe Patterns</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.step === 0 ? (
                        <div className="tutorial-container">
                            <h3 className="tutorial-title">Welcome!</h3>
                            <p className="tutorial-text">You are starting an activity specifically designed to teach you the concept of iteration.</p>
                            <p className="tutorial-text">At the end of it, you should have a clear understanding of the concept of <b>iteration</b>.</p>
                        </div>
                    ) : (this.state.step === 1 && (
                        <div className="tutorial-container">
                            <h4>How it works</h4>
                            <p className="tutorial-text">In this step, you are going to see <b>two patterns</b> composed of shapes.</p>
                            <p className="tutorial-text">Your <b>goal</b> is to describe this pattern in the best way possible, without describing it literally.</p>

                            <p className="tutorial-text">Try to describe it in the most efficient way you can think of.</p>

                            <p className="tutorial-text">You can select the <b>tools</b> from the elements section, and you can draw in the boxes for the representations.</p>

                            <p className="tutorial-text">For each pattern, you can provide multiple representations.</p>
                            <p className="tutorial-text">To make things interesting, you will have <b>constraints</b>, meaning that you will have to draw without
                                using certain tools.
                            </p>

                            <p className="tutorial-text">Try to add one representation per pattern for every constraint.</p>
                            <p className="tutorial-text">You can use the back and next buttons to move between your representations.</p>
                            <p className="tutorial-text">Once you think you reach the last representation, you can click on the <b>finish</b> button to go to next step.</p>
                        </div>
                    ))}
                    <div className="representations-buttons">
                        {this.state.step === 1 && (
                            <Button onClick={() => this.setState({step : 0})} className="representation-button">Back</Button>
                        )}
                        {this.state.step === 0 && (
                            <Button onClick={() => this.setState({step : 1})} className="representation-button">Next</Button>
                        )}
                        <Button bsStyle="primary" onClick={this.close}>Got it</Button>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}
