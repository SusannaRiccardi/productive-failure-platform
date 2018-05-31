import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, Panel } from 'react-bootstrap';


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
        this.rankElement = this.rankElement.bind(this);
        this.moveElement = this.moveElement.bind(this);
        this.getList = this.getList.bind(this);
        this.getItemStyle = this.getItemStyle.bind(this);
        this.getListStyle = this.getListStyle.bind(this);
        this.getListRankStyle = this.getListRankStyle.bind(this);
        this.renderRepresentation = this.renderRepresentation.bind(this);
        this.generateRanking = this.generateRanking.bind(this);
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

        if (source.droppableId === 'representations') {
            if (destination.droppableId !== 'representations') {
                const movedElement = this.rankElement(
                    this.getList(source.droppableId),
                    this.getList(destination.droppableId),
                    source,
                    destination
                )

                this.setState({
                    ...movedElement
                })
            }
        } else {
            if (destination.droppableId === 'representations') {
                const movedElement = this.moveElement(
                    this.getList(source.droppableId),
                    this.getList(destination.droppableId),
                    source,
                    destination
                )
    
                this.setState({
                    ...movedElement
                })
            }
        }
    }

    rankElement(source, destination, droppableSource, droppableDestination) {
        var sourceClone = Array.from(source);
        var [removed] = sourceClone.splice(droppableSource.index, 1);

        if (destination.length > 0) {
            sourceClone.push(destination[0]);
        }

        const destClone = [removed];

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

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

    getListRankStyle(isDraggingOver) {
        return (
            {
                background: isDraggingOver ? 'lightblue' : '',
                padding: this.state.gridElements,
                minHeight: 100,
                border: '1px solid'
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

    generateRanking() {
        let representations = []

        for (let i = 1; i <= 6; i++) {
            let rep = this.state[`rank${i}`][0]
            representations.push(rep)
        }

        this.props.handleSubmitRepresentations(representations)
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
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
                                        style={this.getListRankStyle(snapshot.isDraggingOver)}>
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
                                        style={this.getListRankStyle(snapshot.isDraggingOver)}>
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
                                        style={this.getListRankStyle(snapshot.isDraggingOver)}>
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
                                        style={this.getListRankStyle(snapshot.isDraggingOver)}>
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
                                        style={this.getListRankStyle(snapshot.isDraggingOver)}>
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
                                        style={this.getListRankStyle(snapshot.isDraggingOver)}>
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
                            <Droppable droppableId="representations">
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
                    <Button bsStyle="primary" onClick={() => this.generateRanking()}>Submit</Button>
                </div>
            </DragDropContext>
        );
    }
}
