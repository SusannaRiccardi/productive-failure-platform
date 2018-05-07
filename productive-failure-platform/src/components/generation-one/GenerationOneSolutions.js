import React, { Component } from 'react';
import { Row, Button, Panel } from 'react-bootstrap';
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
            let canvas1 = localStorage.getItem(`${this.props.patterns[0].id}-${this.state.representationNumber}-json`);
            let canvas2 = localStorage.getItem(`${this.props.patterns[1].id}-${this.state.representationNumber}-json`);
            if (canvas1) {
                lcPatternOne.loadSnapshot(JSON.parse(canvas1));
            }
            if (canvas2) {
                lcPatternTwo.loadSnapshot(JSON.parse(canvas2));
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
        let canvasRepresentation1JSON = JSON.stringify(lcPatternOne.getSnapshot());
        let canvasRepresentation1SVG = lcPatternOne.getSVGString();
        localStorage.setItem(`${this.props.patterns[0].id}-${this.state.representationNumber}-json`, canvasRepresentation1JSON);
        localStorage.setItem(`${this.props.patterns[0].id}-${this.state.representationNumber}-svg`, canvasRepresentation1SVG);
        let canvasRepresentation2JSON = JSON.stringify(lcPatternTwo.getSnapshot());
        let canvasRepresentation2SVG = lcPatternTwo.getSVGString();
        localStorage.setItem(`${this.props.patterns[1].id}-${this.state.representationNumber}-json`, canvasRepresentation2JSON);
        localStorage.setItem(`${this.props.patterns[1].id}-${this.state.representationNumber}-svg`, canvasRepresentation2SVG);

        let newRepresentationNumber = this.state.representationNumber + newRepresentation;
        // If there is an already saved representation in the local storage, retrieve it, otherwise blank out the canvas
        let newCanvasRepresentation1 = localStorage.getItem(`${this.props.patterns[0].id}-${newRepresentationNumber}-json`);
        let newCanvasRepresentation2 = localStorage.getItem(`${this.props.patterns[1].id}-${newRepresentationNumber}-json`);
        
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
        // Save representations of the two patterns in the local storage
        let canvasRepresentation1JSON = JSON.stringify(lcPatternOne.getSnapshot());
        let canvasRepresentation1SVG = lcPatternOne.getSVGString();
        localStorage.setItem(`${this.props.patterns[0].id}-${this.state.representationNumber}-json`, canvasRepresentation1JSON);
        localStorage.setItem(`${this.props.patterns[0].id}-${this.state.representationNumber}-svg`, canvasRepresentation1SVG);
        let canvasRepresentation2JSON = JSON.stringify(lcPatternTwo.getSnapshot());
        let canvasRepresentation2SVG = lcPatternTwo.getSVGString();
        localStorage.setItem(`${this.props.patterns[1].id}-${this.state.representationNumber}-json`, canvasRepresentation2JSON);
        localStorage.setItem(`${this.props.patterns[1].id}-${this.state.representationNumber}-svg`, canvasRepresentation2SVG);

        let representations = [];
        for (let i = 0; i < config.representations.length; i++) {
            // Find activity pattern id
            let activityPattern = _.find(this.props.activityPatterns, (activity) => {
                return activity.pattern_id == this.props.patterns[i].id
            })

            for (let j = 0; j < 2; j++) {
                let representation = {
                    representation : {
                        constraint: config.representations[i].constraint,
                        svg: localStorage.getItem(`${this.props.patterns[j].id}-${i}-svg`),
                        productive_failure_id: this.state.productiveFailureId,
                        activity_pattern_id: activityPattern.id
                    }
                }
                representations.push(representation);
            }
        }

        axios.post('http://localhost:3001/api/v1/representations', {
            headers: {
                'Content-Type': 'application/json'
            }, data : JSON.stringify(representations)
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        var representation = config.representations[this.state.representationNumber];

        return (
            <div className="StageOneSolutions-container">
                <div className="generation-one-representations-container">
                    <Panel bsStyle="info" className="representation-container-one">
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Representation for first pattern</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <div className="literally-core-container">
                            </div>
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
                        </Panel.Body>
                    </Panel>
                    <Panel bsStyle="info" className="representation-container-two">
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Representation for second pattern</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <div className="literally-core-container-two">
                            </div>
                            <div className="undo-redo">
                                <img
                                    className="undo"
                                    src={undo}
                                    alt="undo"
                                    onClick={() => lcPatternTwo.undo()}
                                />
                                <img
                                    className="redo"
                                    src={redo}
                                    alt="redo"
                                    onClick={() => lcPatternTwo.redo()}
                                />
                            </div>
                        </Panel.Body>
                    </Panel>
                </div>

                <Panel bsStyle="info" className="generation-one-elements">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">Elements</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body className="generation-one-elements__body">
                        {_.includes(representation.elements, 'pencil') && (
                            <div className={this.state.selectedTool.localeCompare('pencil') === 0 ? 'tool-container active' : 'tool-container'} onClick={() => this.activateTool('pencil')}>
                                <img
                                    className="pencil"
                                    src={pencil}
                                    alt="pencil"
                                />
                            </div>
                        )}

                        {_.includes(representation.elements, 'eraser') && (
                            <div className={this.state.selectedTool.localeCompare('eraser') === 0 ? 'tool-container active' : 'tool-container'} onClick={() => this.activateTool('eraser')}>
                                <img
                                    className="eraser"
                                    src={eraser}
                                    alt="eraser"
                                />
                            </div>
                        )}

                        {_.includes(representation.elements, 'line') && (
                            <div className={this.state.selectedTool.localeCompare('line') === 0 ? 'tool-container active' : 'tool-container'} onClick={() => this.activateTool('line')}>
                                <img
                                    className="line"
                                    src={line}
                                    alt="line"
                                />
                            </div>
                        )}
                    
                        {_.includes(representation.elements, 'arrow') && (
                            <div className={this.state.selectedTool.localeCompare('arrow') === 0 ? 'tool-container active' : 'tool-container'} onClick={() => this.activateTool('arrow')}>
                                <img
                                    className="arrow"
                                    src={arrow}
                                    alt="arrow"
                                />
                            </div>
                        )}
                        
                        {_.includes(representation.elements, 'text') && (
                            <div className={this.state.selectedTool.localeCompare('text') === 0 ? 'tool-container active' : 'tool-container'} onClick={() => this.activateTool('text')}>
                                <img
                                    className="text"
                                    src={text}
                                    alt="text"
                                />
                            </div>
                        )}

                        {_.includes(representation.elements, 'rectangle') && (
                            <div className={this.state.selectedTool.localeCompare('rectangle') === 0 ? 'tool-container active' : 'tool-container'} onClick={() => this.activateTool('rectangle')}>
                                <img
                                    className="rectangle"
                                    src={rectangle}
                                    alt="rectangle"
                                />
                            </div>
                        )}

                        {_.includes(representation.elements, 'ellipse') && (
                            <div className={this.state.selectedTool.localeCompare('ellipse') === 0 ? 'tool-container active' : 'tool-container'} onClick={() => this.activateTool('ellipse')}>
                                <img
                                    className="ellipse"
                                    src={ellipse}
                                    alt="ellipse"
                                />
                            </div>
                        )}

                        {_.includes(representation.elements, 'triangle') && (
                            <div className={this.state.selectedTool.localeCompare('triangle') === 0 ? 'tool-container active' : 'tool-container'} onClick={() => this.activateTool('triangle')}>
                                <img
                                    className="triangle"
                                    src={triangle}
                                    alt="triangle"
                                />
                            </div>
                        )}
                    </Panel.Body>
                </Panel>
                
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
