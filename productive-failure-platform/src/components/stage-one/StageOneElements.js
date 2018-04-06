import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { Rectangle, Circle, Triangle } from 'react-shapes';
var _ = require('lodash');


// Main page: login or home
export default class StageOneElements extends Component {
    render() {
        const representation = this.props.representation;
        return (
            <Panel>
                <Panel.Heading>
                    <Panel.Title componentClass="h3">Elements</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <div className="StageOneElements--container">
                        {!_.includes(representation.removedElements, "block") && (
                            <div className="StageOneElements--container__element">
                                <Circle r={25} fill={{color:'#337ab7'}} stroke={{color:'#337ab7'}} strokeWidth={3} />
                            </div>
                        )}
                        
                        {!_.includes(representation.removedElements, "block") && (
                            <div className="StageOneElements--container__element">
                                <Rectangle width={50} height={50} fill={{color:'#337ab7'}} stroke={{color:'#337ab7'}} strokeWidth={3} />  
                            </div>
                        )}

                        {!_.includes(representation.removedElements, "block") && (
                            <div className="StageOneElements--container__element">
                                <Triangle width={50} height={50} fill={{color:'#337ab7'}} stroke={{color:'#337ab7'}} strokeWidth={3} />
                            </div>
                        )}
                    </div>
                </Panel.Body>
            </Panel>
        );
    }
}
