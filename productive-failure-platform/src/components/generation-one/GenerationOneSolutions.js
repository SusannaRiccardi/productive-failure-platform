import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import GenerationOneElements from './GenerationOneElements';
import GenerationOneRepresentations from './GenerationOneRepresentations';
import config from '../../config';


export default class GenerationOneSolutions extends Component {
	constructor(props) {
        super(props)
        
        this.state = {
            representationNumber : 0
        }

        this.handleRepresentationNumberChange = this.handleRepresentationNumberChange.bind(this);
    }
    
    // Function to handle the change of page of representation
    handleRepresentationNumberChange(newRepresentation) {
        let newRepresentationNumber = this.state.representationNumber + newRepresentation;

        this.setState({
            representationNumber : newRepresentationNumber
        })
    }

    render() {
        return (
            <div className="StageOneSolutions-container">
                <Row>
                    <Col sm={6} md={3}>
                        <GenerationOneElements 
                            representationNumber={this.state.representationNumber}
                            representation={config.representations[this.state.representationNumber]}
                        />
                    </Col>
                    <Col sm={6} md={9}>
                        <GenerationOneRepresentations 
                            representationNumber={this.state.representationNumber}
                            representation={config.representations[this.state.representationNumber]}
                        />
                    </Col>
                </Row>

                {this.state.representationNumber > 0 && <Button onClick={() => this.handleRepresentationNumberChange(-1)}>Back</Button>}
                {this.state.representationNumber < (config.representations.length - 1) && <Button onClick={() => this.handleRepresentationNumberChange(1)}>Forward</Button>}
            </div>
        );
    }
}
