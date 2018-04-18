import React, { Component } from 'react';
import { Row, Col, Button, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import config from '../../config';
import axios from 'axios';
import eraser from '../../img/eraser.png'
import pencil from '../../img/pencil.svg'
import line from '../../img/line.png'
import rectangle from '../../img/square.png'
import ellipse from '../../img/circle.png'
import arrow from '../../img/arrow.png'
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
        this.saveGenerationOne = this.saveGenerationOne.bind(this);
    }

    componentDidMount() {
        // TODO: look at better way to have id of productive failure activity
        let url = window.location.href;
        let splitString = _.split(url, '/');
        let id = splitString[splitString.length - 2];
        
        this.setState({
            productiveFailureId : id
        })

        // Initialise literally canvas
        let options = {
            secondaryColor: '#000',
            backgroundColor: '#fff'
        }

        lc = window.LC.init(document.getElementsByClassName('literally-core-container')[0], options);

        // Clean localStorage if another productive failure activity was created, or load 
        let previousActivity = localStorage.getItem("productiveFailure");
        if (previousActivity !== null && previousActivity !== id) {
            localStorage.clear();
        } else if (previousActivity !== null && previousActivity === id) {
            let canvas = localStorage.getItem(this.state.representationNumber);
            if (canvas) {
                lc.loadSnapshot(JSON.parse(canvas));
            }
        } else {
            localStorage.setItem("productiveFailure", id);
        }
        
        tools = [
            {
                name : 'pencil',
                el : document.getElementById('pencil'),
                tool: new window.LC.tools.Pencil(lc)
            }, {
                name : 'eraser',
                el : document.getElementById('eraser'),
                tool : new window.LC.tools.Eraser(lc)
            }, {
                name : 'line',
                el : document.getElementById('line'),
                tool : new window.LC.tools.Line(lc)
            }, {
                name : 'rectangle',
                el : document.getElementById('rectangle'),
                tool : new window.LC.tools.Rectangle(lc)
            }, {
                name : 'text',
                el : document.getElementById('text'),
                tool : new window.LC.tools.Text(lc)
            }, {
                name : 'arrow',
                el : document.getElementById('arrow'),
                tool : function() {
                    let arrow = new window.LC.tools.Line(lc);
                    arrow.hasEndArrow = true;
                    return arrow;
                }()
            }, {
                name : 'ellipse',
                el : document.getElementById('ellipse'),
                tool : new window.LC.tools.Ellipse(lc)
            }
        ]
    }
    
    // Function to handle the change of page of representation
    handleRepresentationNumberChange(newRepresentation) {
        // Save current representation in localStorage
        let canvasRepresentation = JSON.stringify(lc.getSnapshot());
        localStorage.setItem(this.state.representationNumber, canvasRepresentation);

        let newRepresentationNumber = this.state.representationNumber + newRepresentation;
        // If there is an already saved representation in the local storage, retrieve it, otherwise blank out the canvas
        let newCanvasRepresentation = localStorage.getItem(newRepresentationNumber);
        if (newCanvasRepresentation) {
            lc.loadSnapshot(JSON.parse(newCanvasRepresentation));
        } else {
            lc.clear();
        }

        this.setState({
            representationNumber : newRepresentationNumber
        })
    }

    activateTool(tool) {
        let toolObject = _.find(tools, (t) => {
            return t.name === tool
        });
        lc.setTool(toolObject.tool);

        this.setState({
            selectedTool : tool
        })
    }

    saveGenerationOne(e) {
        e.preventDefault();

        // Save current representation
        let canvasRepresentation = JSON.stringify(lc.getSnapshot());
        localStorage.setItem(this.state.representationNumber, canvasRepresentation);

        for (let i = 0; i < config.representations.length; i++) {
            let representation = {
                representation: {
                    constraint: config.representations[i].constraint,
                    svg: localStorage.getItem(i),
                    productive_failure_id: this.state.productiveFailureId
                }
            }
            axios.post('http://localhost:3001/api/v1/representations', representation)
            .then(response => {
                console.log(response)
            })
            .catch(error => console.log(error))
        }
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
                                    
                                    {_.includes(representation.elements, 'pencil') && (
                                        <img 
                                            className={this.state.selectedTool.localeCompare('pencil') === 0 ? 'pencil active' : 'pencil'}
                                            src={pencil}
                                            alt="pencil"
                                            onClick={() => this.activateTool('pencil')}
                                        />
                                    )}

                                    {_.includes(representation.elements, 'eraser') && (
                                        <img 
                                            className={this.state.selectedTool.localeCompare('eraser') === 0 ? 'eraser active' : 'eraser'}
                                            src={eraser}
                                            alt="eraser"
                                            onClick={() => this.activateTool('eraser')}
                                        />
                                    )}

                                    {_.includes(representation.elements, 'line') && (
                                        <img 
                                            className={this.state.selectedTool.localeCompare('line') === 0 ? 'line active' : 'line'}
                                            src={line}
                                            alt="line"
                                            onClick={() => this.activateTool('line')}
                                        />
                                    )}

                                    {_.includes(representation.elements, 'rectangle') && (
                                        <img 
                                            className={this.state.selectedTool.localeCompare('rectangle') === 0 ? 'rectangle active' : 'rectangle'}
                                            src={rectangle}
                                            alt="rectangle"
                                            onClick={() => this.activateTool('rectangle')}
                                        />
                                    )}
                                    
                                    {_.includes(representation.elements, 'text') && (
                                        <div id="text" onClick={() => this.activateTool('text')} className={this.state.selectedTool.localeCompare('text') === 0 ? 'active' : ''}>
                                            Text
                                        </div>
                                    )}
                                    
                                    {_.includes(representation.elements, 'arrow') && (
                                        <img 
                                            className={this.state.selectedTool.localeCompare('arrow') === 0 ? 'arrow active' : 'arrow'}
                                            src={arrow}
                                            alt="arrow"
                                            onClick={() => this.activateTool('arrow')}
                                        />
                                    )}

                                    {_.includes(representation.elements, 'ellipse') && (
                                        <img 
                                            className={this.state.selectedTool.localeCompare('ellipse') === 0 ? 'ellipse active' : 'ellipse'}
                                            src={ellipse}
                                            alt="ellipse"
                                            onClick={() => this.activateTool('ellipse')}
                                        />
                                    )}

                                    <div onClick={() => lc.undo()}>
                                        Undo
                                    </div>
                                    <div onClick={() => lc.redo()}>
                                        Redo
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
                
                <div className="representations-buttons">
                    {this.state.representationNumber > 0 && <Button onClick={() => this.handleRepresentationNumberChange(-1)}>Back</Button>}
                    {this.state.representationNumber < (config.representations.length - 1) && <Button onClick={() => this.handleRepresentationNumberChange(1)}>Forward</Button>}
                </div>
                
                <div className="next-stage-button">
                    <Button onClick={(e) => this.saveGenerationOne(e)}>
                        <Link to={`generation-two`}>
                            Take me to the next stage
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }
}
