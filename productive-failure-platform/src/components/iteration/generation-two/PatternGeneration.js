import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Rectangle, Circle, Triangle } from 'react-shapes';
import { Button, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
var _ = require('lodash');
var counter = 0;


// Component for the drag and drop of the patterns 
export default class PatternGeneration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            elements: this.createElements([]),
            patternOne: [],
            patternTwo: [],
            gridElements: 8
        }

        this.createElements = this.createElements.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.moveElement = this.moveElement.bind(this);
        this.reorderElements = this.reorderElements.bind(this);
        this.deleteElement = this.deleteElement.bind(this);
        this.getList = this.getList.bind(this);
        this.getItemStyle = this.getItemStyle.bind(this);
        this.getListStyle = this.getListStyle.bind(this);
        this.getElementsStyle = this.getElementsStyle.bind(this);
        this.getTrashStyle = this.getTrashStyle.bind(this);
        this.renderShape = this.renderShape.bind(this);
        this.clearElements = this.clearElements.bind(this);
        this.saveGenerationTwo = this.saveGenerationTwo.bind(this);
        this.generatePattern = this.generatePattern.bind(this);
    }

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable: 'elements',
        droppable2: 'patternOne',
        droppable3: 'patternTwo',
    }

    // Function that creates the list of all the elements that can be dragged and dropped inside the other lists
    createElements(elements) {
        let newElements = []
        
        let circle = _.find(elements, (el) => {
            return el.content === "circle"
        })

        if (!circle) {
            circle = {
                id : `item-${counter++}`,
                content : 'circle'
            }
        }

        newElements.push(circle)

        let square = _.find(elements, (el) => {
            return el.content === "square"
        })

        if (!square) {
            square = {
                id : `item-${counter++}`,
                content : 'square'
            }
        }

        newElements.push(square)

        let triangle = _.find(elements, (el) => {
            return el.content === "triangle"
        })

        if (!triangle) {
            triangle = {
                id : `item-${counter++}`,
                content : 'triangle'
            }
        }

        newElements.push(triangle)

        return newElements;
    }
    
    onDragEnd(result) {
        // result is an object containing the information about the object that has just been moved.
        // it contains the id of the object, the source (with id of the droppable) and destination (with id of the droppable)
        const { source, destination } = result;
        
        // the object has been dropped outside the list
        if (!destination) {
            return;
        }

        // the element has been dropped into trash
        if (destination.droppableId === 'droppable4') {
            if (source.droppableId === 'droppable2') {
                const deleteElement = this.deleteElement(
                    this.getList(source.droppableId),
                    source.index
                )

                this.setState({
                    patternOne : deleteElement
                })
            } else if (source.droppableId === 'droppable3') {
                const deleteElement = this.deleteElement(
                    this.getList(source.droppableId),
                    source.index
                )

                this.setState({
                    patternTwo : deleteElement
                })
            }
        }
        
        if (source.droppableId === "droppable") {
            // Case: move object from elements box to one of the pattern boxes
            if (destination.droppableId === "droppable2" || destination.droppableId === "droppable3") {
                const movedElement = this.moveElement(
                    this.getList(source.droppableId),
                    this.getList(destination.droppableId),
                    source,
                    destination
                )

                const elements = this.createElements(movedElement.droppable)

                if (destination.droppableId === "droppable2") {
                    this.setState({
                        elements : elements,
                        patternOne : movedElement.droppable2
                    })
                } else {
                    this.setState({
                        elements : elements,
                        patternTwo : movedElement.droppable3
                    })
                }
            }
        } else if (source.droppableId === "droppable2") {
            // Case: move object from pattern one box
            // Case: move the object inside the pattern box
            if (destination.droppableId === source.droppableId) {
                const insideBox = this.reorderElements(
                    this.getList(source.droppableId),
                    source.index,
                    destination.index
                )

                this.setState({
                    patternOne : insideBox
                })
            } else if (destination.droppableId === "droppable") {
                const deleteElement = this.deleteElement(
                    this.getList(source.droppableId),
                    source.index
                )

                this.setState({
                    patternOne : deleteElement
                })
            }
        } else {
            // Case: move object from pattern two box
            // Case: move the object inside the pattern box
            if (destination.droppableId === source.droppableId) {
                const insideBox = this.reorderElements(
                    this.getList(source.droppableId),
                    source.index,
                    destination.index
                )

                this.setState({
                    patternTwo : insideBox
                })
            } else if (destination.droppableId === "droppable") {
                const deleteElement = this.deleteElement(
                    this.getList(source.droppableId),
                    source.index
                )

                this.setState({
                    patternTwo : deleteElement
                })
            }
        }
    }

    // Function used to reorder the result
    reorderElements(list, startIndex, endIndex) {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    }

    // Moves an item from one list to another list.
    moveElement(source, destination, droppableSource, droppableDestination) {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    }

    // Delete an element (dragged to the trash)
    deleteElement(source, index) {
        source.splice(index, 1);
        return source;
    }

    // Helper function
    getList(id) {
        return this.state[this.id2List[id]];
    }

    // Styling for element in elements list.
    getItemStyle(isDragging, draggableStyle) { 
        return (
            {
                userSelect: 'none',
                padding: this.state.gridElements * 2,
                margin: `0 0 ${this.state.gridElements}px 0`,
    
                // styles we need to apply on draggables
                ...draggableStyle
            }
        )
    }

    // Styling for list (pattern boxes)
    getListStyle(isDraggingOver) {
        return (
            {
                background: isDraggingOver ? '#5bc0dea8' : '',
                display: 'flex',
                padding: this.state.gridElements,
                overflow: 'auto',
                height: '100px',
                width: 'inherit'
            }
        )
    }

    // Styling for elements box
    getElementsStyle(isDraggingOver) {
        return (
            {
                background: isDraggingOver ? '#5bc0dea8' : '',
                display: 'flex',
                padding: this.state.gridElements,
                height: '100%',
                justifyContent: 'space-evenly'
            }
        )
    }

    // Styling for trash box
    getTrashStyle(isDraggingOver) {
        return (
            {
                background: isDraggingOver ? '#5bc0dea8' : '',
                display: 'flex',
                padding: this.state.gridElements,
                minHeight: '100px',
                alignItems: 'center',
                justifyContent: 'space-evenly'
            }
        )
    }

    // For each shape, render the correct shape
    renderShape(content) {
        if (content === "circle") {
            return (
                <div className="shape-container">
                    <Circle r={20} fill={{color:'#fac863'}} stroke={{color:'#fac863'}} strokeWidth={3} />
                </div>
            )
        } else if (content === "triangle") {
            return (
                <div className="shape-container">
                    <Triangle width={40} height={40} fill={{color:'#d9534f'}} stroke={{color:'#d9534f'}} strokeWidth={3} />
                </div>
            )
        } else {
            return (
                <div className="shape-container">
                    <Rectangle width={40} height={40} fill={{color:'#5cb85c'}} stroke={{color:'#5cb85c'}} strokeWidth={3} />
                </div>
            )
        }
    }

    // Remove all elements from the selected list when clicking clear
    clearElements(pattern) {
        if (pattern === "one") {
            this.setState({
                patternOne : []
            })
        } else {
            this.setState({
                patternTwo : []
            })
        }
    }

    // Post the generated patterns
    saveGenerationTwo() {
        // Get the productive failure id
        const id = localStorage.getItem('productive-failure')
        let generatedPatterns = [];

        let patternOne = {
            generated_pattern: {
                reconstruct_pattern_id: this.props.reconstructPatterns[0].id,
                pattern: this.generatePattern(0),
                productive_failure_id: id,   
            }
        }
        generatedPatterns.push(patternOne);

        let patternTwo = {
            generated_pattern: {
                reconstruct_pattern_id: this.props.reconstructPatterns[1].id,
                pattern: this.generatePattern(1),
                productive_failure_id: id,   
            }
        }
        generatedPatterns.push(patternTwo);

        axios.post("http://localhost:3001/api/iteration/generated_patterns", {
            headers: {
                'Content-Type': 'application/json'
            }, data : JSON.stringify(generatedPatterns)
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })

    }

    // Function used to generate the pattern that will be saved in the database.
    generatePattern(id) {
        let pattern = "";
        let patternArray = (id === 0) ? this.state.patternOne : this.state.patternTwo;
        
        for (let i = 0; i < (patternArray.length - 1); i++) {
            pattern += patternArray[i].content;
            pattern += "-"
        }
        pattern += patternArray[patternArray.length - 1].content;
        return pattern;
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="pattern-generation-container">
                    {/* Pattern one droppable */}
                    <Panel className="pattern-generation-one" bsStyle="primary">
                        <Panel.Heading className="pattern-generation-one__heading">
                            <Panel.Title componentClass="h3">Pattern for first representation</Panel.Title>
                            <Button bsStyle="link" className="pattern-generation-clear" onClick={() => this.clearElements('one')}>Clear</Button>
                        </Panel.Heading>
                        <Panel.Body className="pattern-generation-one__body">
                            <Droppable droppableId="droppable2" direction="horizontal">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={this.getListStyle(snapshot.isDraggingOver)}>
                                        {this.state.patternOne.map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={this.getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}>
                                                        {this.renderShape(item.content)}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </Panel.Body>
                    </Panel>
                    {/* Pattern two droppable */}
                    <Panel className="pattern-generation-two" bsStyle="primary">
                        <Panel.Heading className="pattern-generation-one__heading">
                            <Panel.Title componentClass="h3">Pattern for second representation</Panel.Title>
                            <Button bsStyle="link" className="pattern-generation-clear" onClick={() => this.clearElements('two')}>Clear</Button>
                        </Panel.Heading>
                        <Panel.Body className="pattern-generation-two__body">
                            <Droppable droppableId="droppable3" direction="horizontal">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={this.getListStyle(snapshot.isDraggingOver)}>
                                        {this.state.patternTwo.map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={this.getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}>
                                                        {this.renderShape(item.content)}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </Panel.Body>
                    </Panel>
                </div>
                {/* Elements droppable */}
                <div className="elements-trash-container">
                    <Panel className="elements-pattern-generation" bsStyle="primary">
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Elements</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body className="pattern-generation-two__body">
                            <Droppable droppableId="droppable" direction="horizontal">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={this.getElementsStyle(snapshot.isDraggingOver)}>
                                        {this.state.elements.map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={this.getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}>
                                                        {this.renderShape(item.content)}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </Panel.Body>
                    </Panel>
                    {/* Trash droppable */}
                    <Panel bsStyle="primary" className="trash-container">
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Trash</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body className="pattern-generation-two__body trash-image">
                            <Droppable droppableId="droppable4" direction="horizontal">
                                {(provided, snapshot) => (
                                    <div
                                        className="trash-pattern-generation"
                                        ref={provided.innerRef}
                                        style={this.getTrashStyle(snapshot.isDraggingOver)}>
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </Panel.Body>
                    </Panel>
                </div>

                <div className="info-buttons">
                    <Button bsStyle="info" onClick={this.props.handleOpenCloseModal}>Get info about this step</Button>

                    {(this.state.patternOne.length > 0 && this.state.patternTwo.length > 0) && (
                        <Link to={`consolidation`}>
                            <Button className="representation-button" bsStyle="primary" onClick={this.saveGenerationTwo}>
                                Finish
                            </Button>                    
                        </Link>
                    )}
                </div>
            </DragDropContext>
        );
    }
}
