import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';


export default class ConsolidationSolutions extends Component {
    constructor(props) {
        super(props);

        this.renderRepresentations = this.renderRepresentations.bind(this);
    }

    renderRepresentations() {
        return this.props.representations.map(rep => {
            return (
                <Panel className={`ConsolidationRankings--representation`}  key={rep.id}>
                    <Panel.Body className="ConsolidationRankings--representation__body">
                        <div className="ConsolidationRankings--representation__svg" dangerouslySetInnerHTML={{__html: rep.svg}}/>
                    </Panel.Body>
                </Panel>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="ConsolidationRankings--container">
                     <Panel className="ConsolidationRankings--container__placeholders" bsStyle="info">
                        <Panel.Heading className="ConsolidationRankings--heading">
                            <Panel.Title componentClass="h3">Rankings</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body className="ConsolidationRankings--body">
                            {this.renderRepresentations()}
                        </Panel.Body>
                    </Panel>

                    <Panel className="ConsolidationRankings--container__elements" bsStyle="info">
                        <Panel.Heading className="ConsolidationRankings--heading">
                            <Panel.Title componentClass="h3">Representations</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body className="ConsolidationRankings--body">
                            
                        </Panel.Body>
                    </Panel>
                </div>

                 <div className="ConsolidationRankings--buttons">
                    <Button bsStyle="info" onClick={this.props.handleOpenTutorial}>Get info about this step</Button>
                    <Button bsStyle="primary" onClick={() => console.log('todo go to home')}>Todo go to home</Button>
                </div>
            </div>
        );
    }
}
