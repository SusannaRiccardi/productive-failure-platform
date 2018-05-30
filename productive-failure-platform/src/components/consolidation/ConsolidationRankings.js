// export default class ConsolidationRankings extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             
//             gridElements: 6
//         }

//         this.onDragEnd = this.onDragEnd.bind(this);
//         this.reorderElements = this.reorderElements.bind(this);
//         this.getItemStyle = this.getItemStyle.bind(this);
//         this.getListStyle = this.getListStyle.bind(this);
//         this.renderRepresentation = this.renderRepresentation.bind(this);
//     }
    
//     onDragEnd(result) {
//         if (!result.destination) {
//             return;
//         }
      
//         const representations = this.reorderElements(
//             this.state.representations,
//             result.source.index,
//             result.destination.index
//         );
      
//         this.setState({
//             representations,
//         });
//     }

//     // Function used to reorder the result
//     reorderElements(list, startIndex, endIndex) {
//         const result = Array.from(list);
//         const [removed] = result.splice(startIndex, 1);
//         result.splice(endIndex, 0, removed);

//         return result;
//     }

//     getItemStyle(isDragging, draggableStyle) { 
//         return (
//             {
                
//             }
//         )
//     }

//     getListStyle(isDraggingOver) {
//         return (
//             {
                
//             }
//         )
//     }

//     render() {
//         return (
//             <DragDropContext onDragEnd={this.onDragEnd}>
//                 <div className="ConsolidationRankings--container">
//                     <Panel className="ConsolidationRankings--container__placeholders" bsStyle="info">
//                         <Panel.Heading className="ConsolidationRankings--heading">
//                             <Panel.Title componentClass="h3">Rankings</Panel.Title>
//                         </Panel.Heading>
//                         <Panel.Body className="ConsolidationRankings--body">
//                             <Droppable droppableId="rank1">
//                                     {(provided, snapshot) => (
//                                         <div
//                                             ref={provided.innerRef}
//                                             style={this.getListStyle(snapshot.isDraggingOver)}>
//                                             {this.state.representations.map((item, index) => (
//                                                 <Draggable
//                                                     key={item.id}
//                                                     draggableId={item.id}
//                                                     index={index}>
//                                                     {(provided, snapshot) => (
//                                                         <div
//                                                             ref={provided.innerRef}
//                                                             {...provided.draggableProps}
//                                                             {...provided.dragHandleProps}
//                                                             style={this.getItemStyle(
//                                                                 snapshot.isDragging,
//                                                                 provided.draggableProps.style
//                                                             )}>
//                                                             {this.renderRepresentation(item)}
//                                                         </div>
//                                                     )}
//                                                 </Draggable>
//                                             ))}
//                                             {provided.placeholder}
//                                         </div>
//                                     )}
//                                 </Droppable>
//                         </Panel.Body>
//                     </Panel>

//                     <Panel className="ConsolidationRankings--container__elements" bsStyle="info">
//                         <Panel.Heading className="ConsolidationRankings--heading">
//                             <Panel.Title componentClass="h3">Representations</Panel.Title>
//                         </Panel.Heading>
//                         <Panel.Body className="ConsolidationRankings--body">
//                             <Droppable droppableId="droppable">
//                                 {(provided, snapshot) => (
//                                     <div
//                                         ref={provided.innerRef}
//                                         style={this.getListStyle(snapshot.isDraggingOver)}>
//                                         {this.state.representations.map((item, index) => (
//                                             <Draggable
//                                                 key={item.id}
//                                                 draggableId={item.id}
//                                                 index={index}>
//                                                 {(provided, snapshot) => (
//                                                     <div
//                                                         ref={provided.innerRef}
//                                                         {...provided.draggableProps}
//                                                         {...provided.dragHandleProps}
//                                                         style={this.getItemStyle(
//                                                             snapshot.isDragging,
//                                                             provided.draggableProps.style
//                                                         )}>
//                                                         {this.renderRepresentation(item)}
//                                                     </div>
//                                                 )}
//                                             </Draggable>
//                                         ))}
//                                         {provided.placeholder}
//                                     </div>
//                                 )}
//                             </Droppable>
//                         </Panel.Body>
//                     </Panel>
//                 </div>

               
//             </DragDropContext>
//         );
//     }
// }
import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, Panel } from 'react-bootstrap';
var _ = require('lodash');


export default class ConsolidationRankings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            representations: props.representations,
            rank1: [],
            rank2: [],
            rank3: [],
            rank4: [],
            rank5: [],
            rank6: [],
            gridElements: 6
        }

        this.onDragEnd = this.onDragEnd.bind(this);
        this.moveElement = this.moveElement.bind(this);
        this.reorderElements = this.reorderElements.bind(this);
        this.getList = this.getList.bind(this);
        this.getItemStyle = this.getItemStyle.bind(this);
        this.getListStyle = this.getListStyle.bind(this);
        this.renderRepresentation = this.renderRepresentation.bind(this);
    }

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        representations: 'representations',
        rank1: 'rank1',
        rank2: 'rank2',
        rank3: 'rank3',
        rank4: 'rank4',
        rank5: 'rank5',
        rank6: 'rank6',
    }
    
    onDragEnd(result) {
        // result is an object containing the information about the object that has just been moved.
        // it contains the id of the object, the source (with id of the droppable) and destination (with id of the droppable)
        const { source, destination } = result;
        
        // the object has been dropped outside the list
        if (!destination) {
            return;
        }

        console.log(result)

        // // the element has been dropped into trash
        // if (destination.droppableId === 'droppable4') {
        //     if (source.droppableId === 'droppable2') {
        //         const deleteElement = this.deleteElement(
        //             this.getList(source.droppableId),
        //             source.index
        //         )

        //         this.setState({
        //             patternOne : deleteElement
        //         })
        //     } else if (source.droppableId === 'droppable3') {
        //         const deleteElement = this.deleteElement(
        //             this.getList(source.droppableId),
        //             source.index
        //         )

        //         this.setState({
        //             patternTwo : deleteElement
        //         })
        //     }
        // }
        
        // if (source.droppableId === "droppable") {
        //     // Case: move object from elements box to one of the pattern boxes
        //     if (destination.droppableId === "droppable2" || destination.droppableId === "droppable3") {
        //         const movedElement = this.moveElement(
        //             this.getList(source.droppableId),
        //             this.getList(destination.droppableId),
        //             source,
        //             destination
        //         )

        //         const elements = this.createElements(movedElement.droppable)

        //         if (destination.droppableId === "droppable2") {
        //             this.setState({
        //                 elements : elements,
        //                 patternOne : movedElement.droppable2
        //             })
        //         } else {
        //             this.setState({
        //                 elements : elements,
        //                 patternTwo : movedElement.droppable3
        //             })
        //         }
        //     }
        // } else if (source.droppableId === "droppable2") {
        //     // Case: move object from pattern one box
        //     // Case: move the object inside the pattern box
        //     if (destination.droppableId === source.droppableId) {
        //         const insideBox = this.reorderElements(
        //             this.getList(source.droppableId),
        //             source.index,
        //             destination.index
        //         )

        //         this.setState({
        //             patternOne : insideBox
        //         })
        //     } else if (destination.droppableId === "droppable") {
        //         const deleteElement = this.deleteElement(
        //             this.getList(source.droppableId),
        //             source.index
        //         )

        //         this.setState({
        //             patternOne : deleteElement
        //         })
        //     }
        // } else {
        //     // Case: move object from pattern two box
        //     // Case: move the object inside the pattern box
        //     if (destination.droppableId === source.droppableId) {
        //         const insideBox = this.reorderElements(
        //             this.getList(source.droppableId),
        //             source.index,
        //             destination.index
        //         )

        //         this.setState({
        //             patternTwo : insideBox
        //         })
        //     } else if (destination.droppableId === "droppable") {
        //         const deleteElement = this.deleteElement(
        //             this.getList(source.droppableId),
        //             source.index
        //         )

        //         this.setState({
        //             patternTwo : deleteElement
        //         })
        //     }
        // }
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

    getList(id) {
        return this.state[this.id2List[id]];
    }

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

    getListStyle(isDraggingOver) {
        return (
            {
                background: isDraggingOver ? 'lightblue' : '',
                padding: this.state.gridElements
            }
        )
    }

    renderRepresentation(content) {
        return (
            <Panel className={`ConsolidationRankings--representation`}  key={content.id}>
                <Panel.Body className="ConsolidationRankings--representation__body">
                    <div className="ConsolidationRankings--representation__svg" dangerouslySetInnerHTML={{__html: content.svg}}/>
                </Panel.Body>
            </Panel>
        )
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                {/* <div className="pattern-generation-container"> */}
                    {/* Pattern one droppable */}
                    {/* <Panel className="pattern-generation-one" bsStyle="info">
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
                    </Panel> */}
                    {/* Pattern two droppable */}
                    {/* <Panel className="pattern-generation-two" bsStyle="info">
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
                    </Panel> */}
                {/* </div> */}
                {/* Elements droppable */}
                {/* <div className="elements-trash-container"> */}
                    {/* <Panel className="elements-pattern-generation" bsStyle="info">
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
                    </Panel> */}
                    {/* Trash droppable */}
                    {/* <Panel bsStyle="info" className="trash-container">
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
                    </Panel> */}
                {/* </div> */}
                <div className="ConsolidationRankings--container">
                     <Panel className="ConsolidationRankings--container__placeholders" bsStyle="info">
                         <Panel.Heading className="ConsolidationRankings--heading">
                             <Panel.Title componentClass="h3">Rankings</Panel.Title>
                         </Panel.Heading>
                         <Panel.Body className="ConsolidationRankings--body">
                            <Droppable droppableId="rank1">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={this.getListStyle(snapshot.isDraggingOver)}>
                                        {this.state.rank1.map((item, index) => (
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
                                                        {this.renderRepresentation(item)}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            <Droppable droppableId="rank2">
                                    {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={this.getListStyle(snapshot.isDraggingOver)}>
                                        {this.state.rank2.map((item, index) => (
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
                                                        {this.renderRepresentation(item)}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            <Droppable droppableId="rank3">
                                    {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={this.getListStyle(snapshot.isDraggingOver)}>
                                        {this.state.rank3.map((item, index) => (
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
                                                        {this.renderRepresentation(item)}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            <Droppable droppableId="rank4">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={this.getListStyle(snapshot.isDraggingOver)}>
                                        {this.state.rank4.map((item, index) => (
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
                                                        {this.renderRepresentation(item)}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            <Droppable droppableId="rank5">
                                    {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={this.getListStyle(snapshot.isDraggingOver)}>
                                        {this.state.rank5.map((item, index) => (
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
                                                        {this.renderRepresentation(item)}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            <Droppable droppableId="rank6">
                                    {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={this.getListStyle(snapshot.isDraggingOver)}>
                                        {this.state.rank6.map((item, index) => (
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
                                                        {this.renderRepresentation(item)}
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

                    <Panel className="ConsolidationRankings--container__elements" bsStyle="info">
                        <Panel.Heading className="ConsolidationRankings--heading">
                            <Panel.Title componentClass="h3">Representations</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body className="ConsolidationRankings--body">
                            <Droppable droppableId="droppable">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={this.getListStyle(snapshot.isDraggingOver)}>
                                        {this.state.representations.map((item, index) => (
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
                                                        {this.renderRepresentation(item)}
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

                 <div className="ConsolidationRankings--buttons">
                    <Button bsStyle="info" onClick={this.props.handleOpenTutorial}>Get info about this step</Button>
                    <Button bsStyle="primary" onClick={() => this.props.handleSubmitRepresentations(this.state.representations)}>Submit</Button>
                </div>
            </DragDropContext>
        );
    }
}
