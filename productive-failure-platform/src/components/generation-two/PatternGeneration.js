import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Rectangle, Circle, Triangle } from 'react-shapes';
var counter = 0;


export default class PatternGeneration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            elements: this.createElements(),
            patternOne: [],
            patternTwo: [],
            gridElements: 8
        }

        this.createElements = this.createElements.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.reorder = this.reorder.bind(this);
        this.getList = this.getList.bind(this);
        this.move = this.move.bind(this);
        this.getItemStyle = this.getItemStyle.bind(this);
        this.getListStyle = this.getListStyle.bind(this);
    }

    // Function that creates the list of all the elements that can be dragged and dropped inside the other lists
    createElements() {
        let elements = [];
        
        let circle = {
            id : `item-${counter++}`,
            content : 'circle'
        }
        elements.push(circle);

        let square = {
            id : `item-${counter++}`,
            content : 'square'
        }
        elements.push(square);

        let triangle = {
            id : `item-${counter++}`,
            content : 'triangle'
        }
        elements.push(triangle);

        return elements;
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

    // TODO: remove
    getItemStyle(isDragging, draggableStyle) { 
        return (
            {
                // some basic styles to make the items look a bit nicer
                userSelect: 'none',
                padding: this.state.gridElements * 2,
                margin: `0 0 ${this.state.gridElements}px 0`,
    
                // change background colour if dragging
                background: isDragging ? 'lightgreen' : 'grey',
    
                // styles we need to apply on draggables
                ...draggableStyle
            }
        )
    }

    // TODO: remove
    getListStyle(isDraggingOver) {
        return (
            {
                background: isDraggingOver ? 'lightblue' : 'lightgrey',
                display: 'flex',
                padding: this.state.gridElements,
                overflow: 'auto',
            }
        )
    }
    
    onDragEnd(result) {
        // result is an object containing the information about the object that has just been moved.
        // it contains the id of the object, the source (with id of the droppable) and destination (with id of the droppable)
        const { source, destination } = result;
        
        // the object has been dropped outside the list
        if (!destination) {
            return;
        }

        // the object has been dropped in the same droppable box
        if (source.droppableId === destination.droppableId) {
            const items = this.reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            )

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { selected: items };
            }

            this.setState({
                items
            });
        } else {
            const result = this.move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                items: result.droppable,
                selected: result.droppable2
            });
        }
    }

    // Function used to reorder the result
    reorder(list, startIndex, endIndex) {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    }

    getList(id) {
        return this.state[this.id2List[id]];
    }

    // Moves an item from one list to another list.
    move(source, destination, droppableSource, droppableDestination) {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                {/* Elements droppable */}
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={this.getListStyle(snapshot.isDraggingOver)}>
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
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                {/* Pattern one droppable */}
                <Droppable droppableId="droppable" direction="horizontal">
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
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                {/* Pattern two droppable */}
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
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}
