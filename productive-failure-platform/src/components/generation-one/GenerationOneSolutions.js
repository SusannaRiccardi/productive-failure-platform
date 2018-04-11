import React, { Component } from 'react';
import { Row, Col, Button, Panel } from 'react-bootstrap';
import config from '../../config';
var _ = require('lodash');
// literallycanvas variables
var lc;
var tools;


export default class GenerationOneSolutions extends Component {
	constructor(props) {
        super(props)
        
        this.state = {
            representationNumber : 0,
            selectedTool : 'pencil'
        }

        this.handleRepresentationNumberChange = this.handleRepresentationNumberChange.bind(this);
        this.activateTool = this.activateTool.bind(this);
    }

    componentDidMount() {
        lc = window.LC.init(document.getElementsByClassName('literally-core-container')[0]);
        
        tools = [
            {
                name : 'pencil',
                el : document.getElementById('pencil'),
                tool: new window.LC.tools.Pencil(lc)
            }, {
                name : 'eraser',
                el : document.getElementById('eraser'),
                tool : new window.LC.tools.Eraser(lc)
            }
        ]
    }
    
    // Function to handle the change of page of representation
    handleRepresentationNumberChange(newRepresentation) {
        let newRepresentationNumber = this.state.representationNumber + newRepresentation;

        this.setState({
            representationNumber : newRepresentationNumber
        })
    }

    activateTool(tool) {
        let toolObject = _.find(tools, (t) => {
            return t.name === tool
        });
        console.log(toolObject)
        lc.setTool(toolObject.tool);

        this.setState({
            selectedTool : tool
        })
    }

    render() {
        var representation = config.representations[this.state.representationNumber];
        return (
            <div className="StageOneSolutions-container">
                <Row>
                    <Col sm={6} md={3}>
                        <Panel>
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">Elements</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                {/* TODO: in config, put elements that are in the representation, not the one to be removed */}
                                <div className="GenerateOneSolutions--container">
                                    <div id="pencil" onClick={() => this.activateTool('pencil')} className={this.state.selectedTool.localeCompare('pencil') == 0 ? 'active' : ''}>
                                        Pencil
                                    </div>
                                    <div id="eraser" onClick={() => this.activateTool('eraser')} className={this.state.selectedTool.localeCompare('eraser') == 0 ? 'active' : ''}>
                                        Eraser
                                    </div>
                                </div>
                            </Panel.Body>
                        </Panel>
                    </Col>
                    <Col sm={6} md={9}>
                        <Panel>
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">Representations</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                Constraint: {representation.constraint}

                                <div className="literally-core-container">
                                </div>
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>

                {this.state.representationNumber > 0 && <Button onClick={() => this.handleRepresentationNumberChange(-1)}>Back</Button>}
                {this.state.representationNumber < (config.representations.length - 1) && <Button onClick={() => this.handleRepresentationNumberChange(1)}>Forward</Button>}
            </div>
        );
    }
}
