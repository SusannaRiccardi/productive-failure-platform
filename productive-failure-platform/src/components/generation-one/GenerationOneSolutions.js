import React, { Component } from 'react';
import { Row, Col, Button, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import config from '../../config';
import axios from 'axios';
import pencil from '../../img/pencil.png'
import eraser from '../../img/eraser.png'
import line from '../../img/line.png'
import rectangle from '../../img/rectangle.png'
import ellipse from '../../img/ellipse.png'
import arrow from '../../img/arrow.png'
import redo from '../../img/redo.png'
import undo from '../../img/undo.png'
import text from '../../img/text.png'
import triangle from '../../img/triangle.png'
var _ = require('lodash');
// literallycanvas variables
var lcPatternOne;
var lcPatternTwo;
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

        lcPatternOne = window.LC.init(document.getElementsByClassName('literally-core-container')[0], options);
        lcPatternTwo = window.LC.init(document.getElementsByClassName('literally-core-container-two')[0], options);

        // Clean localStorage if another productive failure activity was created, or load 
        let previousActivity = localStorage.getItem("productiveFailure");
        if (previousActivity !== null && previousActivity !== id) {
            localStorage.clear();
        } else if (previousActivity !== null && previousActivity === id) {
            // TODO
            let canvas = localStorage.getItem(this.state.representationNumber);
            if (canvas) {
                lcPatternOne.loadSnapshot(JSON.parse(canvas));
            }
        } else {
            localStorage.setItem("productiveFailure", id);
        }
        
        tools = [
            {
                name : 'pencil',
                el : document.getElementById('pencil'),
                tool: new window.LC.tools.Pencil(lcPatternOne)
            }, {
                name : 'eraser',
                el : document.getElementById('eraser'),
                tool : new window.LC.tools.Eraser(lcPatternOne)
            }, {
                name : 'line',
                el : document.getElementById('line'),
                tool : new window.LC.tools.Line(lcPatternOne)
            }, {
                name : 'rectangle',
                el : document.getElementById('rectangle'),
                tool : new window.LC.tools.Rectangle(lcPatternOne)
            }, {
                name : 'text',
                el : document.getElementById('text'),
                tool : new window.LC.tools.Text(lcPatternOne)
            }, {
                name : 'arrow',
                el : document.getElementById('arrow'),
                tool : function() {
                    let arrow = new window.LC.tools.Line(lcPatternOne);
                    arrow.hasEndArrow = true;
                    return arrow;
                }()
            }, {
                name : 'ellipse',
                el : document.getElementById('ellipse'),
                tool : new window.LC.tools.Ellipse(lcPatternOne)
            }, {
                name : 'triangle',
                el : document.getElementById('triangle'),
                tool : new window.LC.tools.Triangle(lcPatternOne)
            }
        ]
    }
    
    // Function to handle the change of page of representation
    handleRepresentationNumberChange(newRepresentation) {
        // Save representations of the two patterns in the local storage
        let canvasRepresentation1 = JSON.stringify(lcPatternOne.getSnapshot());
        localStorage.setItem(`${this.props.patterns[0].id}-${this.state.representationNumber}`, canvasRepresentation1);
        let canvasRepresentation2 = JSON.stringify(lcPatternTwo.getSnapshot());
        localStorage.setItem(`${this.props.patterns[1].id}-${this.state.representationNumber}`, canvasRepresentation2);

        let newRepresentationNumber = this.state.representationNumber + newRepresentation;
        // If there is an already saved representation in the local storage, retrieve it, otherwise blank out the canvas
        let newCanvasRepresentation1 = localStorage.getItem(`${this.props.patterns[0].id}-${newRepresentationNumber}`);
        let newCanvasRepresentation2 = localStorage.getItem(`${this.props.patterns[1].id}-${newRepresentationNumber}`);
        
        if (newCanvasRepresentation1) {
            lcPatternOne.loadSnapshot(JSON.parse(newCanvasRepresentation1));
        } else {
            lcPatternOne.clear();
        }

        if (newCanvasRepresentation2) {
            lcPatternTwo.loadSnapshot(JSON.parse(newCanvasRepresentation2));
        } else {
            lcPatternTwo.clear();
        }

        this.setState({
            representationNumber : newRepresentationNumber
        })
    }

    activateTool(tool) {
        let toolObject = _.find(tools, (t) => {
            return t.name === tool
        });
        lcPatternOne.setTool(toolObject.tool);
        lcPatternTwo.setTool(toolObject.tool);

        this.setState({
            selectedTool : tool
        })
    }

    saveGenerationOne(e) {
        // Save current representation
        let canvasRepresentation = JSON.stringify(lcPatternOne.getSnapshot());
        localStorage.setItem(this.state.representationNumber, canvasRepresentation);

        let activityPattern = {
            productive_failure_id: this.state.productiveFailureId,
            pattern_id: this.props.patterns[0].id
        }
        // TODO
        axios.post('http://localhost:3001/api/v1/activity_patterns', activityPattern)
        .then(res => {
            for (let i = 0; i < config.representations.length; i++) {
                let representation = {
                    representation: {
                        constraint: config.representations[i].constraint,
                        svg: localStorage.getItem(i),
                        productive_failure_id: this.state.productiveFailureId,
                        activity_pattern_id: res.data.id
                    }
                }
                axios.post('http://localhost:3001/api/v1/representations', representation)
                .then(response => {
                    console.log(res)
                })
                .catch(error => {
                    console.log(error)
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        var representation = config.representations[this.state.representationNumber];

        return (
            <div className="StageOneSolutions-container">
                <Row>
                    <Col sm={6} md={2}>
                        <Panel>
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">Elements</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                {/* TODO: in config, put elements that are in the representation, not the one to be removed */}
                                <div className="GenerateOneSolutions--container">
                                    
                                    {_.includes(representation.elements, 'pencil') && (
                                        <div className={this.state.selectedTool.localeCompare('pencil') === 0 ? 'tool-container active' : 'tool-container'} onClick={() => this.activateTool('pencil')}>
                                            <img
                                                className="pencil"
                                                src={pencil}
                                                alt="pencil"
                                            />
                                            Select pencil
                                        </div>
                                    )}

                                    {_.includes(representation.elements, 'eraser') && (
                                        <div className={this.state.selectedTool.localeCompare('eraser') === 0 ? 'tool-container active' : 'tool-container'} onClick={() => this.activateTool('eraser')}>
                                            <img
                                                className="eraser"
                                                src={eraser}
                                                alt="eraser"
                                            />
                                            Select eraser
                                        </div>
                                    )}

                                    {_.includes(representation.elements, 'line') && (
                                        <div className={this.state.selectedTool.localeCompare('line') === 0 ? 'tool-container active' : 'tool-container'} onClick={() => this.activateTool('line')}>
                                            <img
                                                className="line"
                                                src={line}
                                                alt="line"
                                            />
                                            Select line
                                        </div>
                                    )}
                                    
                                    {_.includes(representation.elements, 'arrow') && (
                                        <div className={this.state.selectedTool.localeCompare('arrow') === 0 ? 'tool-container active' : 'tool-container'} onClick={() => this.activateTool('arrow')}>
                                            <img
                                                className="arrow"
                                                src={arrow}
                                                alt="arrow"
                                            />
                                            Select arrow
                                        </div>
                                    )}
                                    
                                    {_.includes(representation.elements, 'text') && (
                                        <div className={this.state.selectedTool.localeCompare('text') === 0 ? 'tool-container active' : 'tool-container'} onClick={() => this.activateTool('text')}>
                                            <img
                                                className="text"
                                                src={text}
                                                alt="text"
                                            />
                                            Write text
                                        </div>
                                    )}

                                    {_.includes(representation.elements, 'rectangle') && (
                                        <div className={this.state.selectedTool.localeCompare('rectangle') === 0 ? 'tool-container active' : 'tool-container'} onClick={() => this.activateTool('rectangle')}>
                                            <img
                                                className="rectangle"
                                                src={rectangle}
                                                alt="rectangle"
                                            />
                                            Select rectangle
                                        </div>
                                    )}

                                    {_.includes(representation.elements, 'ellipse') && (
                                        <div className={this.state.selectedTool.localeCompare('ellipse') === 0 ? 'tool-container active' : 'tool-container'} onClick={() => this.activateTool('ellipse')}>
                                            <img
                                                className="ellipse"
                                                src={ellipse}
                                                alt="ellipse"
                                            />
                                            Select ellipse
                                        </div>
                                    )}

                                    {_.includes(representation.elements, 'triangle') && (
                                        <div className={this.state.selectedTool.localeCompare('triangle') === 0 ? 'tool-container active' : 'tool-container'} onClick={() => this.activateTool('triangle')}>
                                            <img
                                                className="triangle"
                                                src={triangle}
                                                alt="triangle"
                                            />
                                            Select triangle
                                        </div>
                                    )}

                                    <div className="undo-redo">
                                        <img
                                            className="undo"
                                            src={undo}
                                            alt="undo"
                                            onClick={() => lcPatternOne.undo()}
                                        />
                                        <img
                                            className="redo"
                                            src={redo}
                                            alt="redo"
                                            onClick={() => lcPatternOne.redo()}
                                        />
                                    </div>
                                </div>
                            </Panel.Body>
                        </Panel>
                    </Col>
                    <Col sm={6} md={10}>
                        <Panel>
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">Representations</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                Constraint: {representation.constraint}

                                <div className="literally-core-container">
                                </div>

                                <div className="literally-core-container-two">
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
