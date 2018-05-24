import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Panel, Button } from 'react-bootstrap';
var _ = require('lodash');


export default class ConsolidationRankings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            representations: [],
            gridElements: 8
        }

        this.onDragEnd = this.onDragEnd.bind(this);
        this.reorderElements = this.reorderElements.bind(this);
        this.getItemStyle = this.getItemStyle.bind(this);
        this.getListStyle = this.getListStyle.bind(this);
        this.renderRepresentation = this.renderRepresentation.bind(this);
    }

    componentDidMount() {
        // Create array of representations
        let representations = [];
        for (let i = 1; i < 7; i++) {
            let rep = {
                id: i,
                svg: this.props.consolidation[`rep${i}`]
            }
            representations.push(rep)
        }
        this.setState({
            representations: representations
        })
    }
    
    onDragEnd(result) {
        if (!result.destination) {
            return;
        }
      
        const representations = this.reorderElements(
            this.state.representations,
            result.source.index,
            result.destination.index
        );
      
        this.setState({
            representations,
        });
    }

    // Function used to reorder the result
    reorderElements(list, startIndex, endIndex) {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
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
                padding: this.state.gridElements,
                width: 400,
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
                <Panel className="ConsolidationRankings--container" bsStyle="info">
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

                <div className="info-buttons">
                    <Button bsStyle="info" onClick={() => console.log('todo info')}>Get info about this step</Button>
                    <Button bsStyle="primary" onClick={() => console.log('todo submit')}>Submit</Button>
                </div>
            </DragDropContext>
        );
    }
}
