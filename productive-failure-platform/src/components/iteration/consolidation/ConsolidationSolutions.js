import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';


// Component for showing the representations and the corresponding descriptions.
export default class ConsolidationSolutions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            representations: [],
            descriptions: []
        }

        this.renderRepresentations = this.renderRepresentations.bind(this);
        this.renderDescriptions = this.renderDescriptions.bind(this);
    }

    componentDidMount() {
        let representations = [];
        let descriptions = [];

        for (let i = 1; i <= 6; i++) {
            // Generate ordered array of representations
            let rep = this.props.representations[`rep${i}`].svg
            representations.push(rep)
            // Generate ordered array of descriptions of representations
            let desc = this.props.consolidation[`rep${this.props.representations[`rep${i}`].id}text`]
            descriptions.push(desc)
        }

        this.setState({
            representations: representations,
            descriptions: descriptions
        })
    }

    renderRepresentations() {      
        return this.state.representations.map((rep, key) => {
            return (
                <Panel className={`ConsolidationSolutions--representation`}  key={key}>
                    <Panel.Heading>
                        {key+1}
                    </Panel.Heading>
                    <Panel.Body className="ConsolidationSolutions--representation__body">
                        <div className="ConsolidationSolutions--representation__svg" dangerouslySetInnerHTML={{__html: rep}}/>
                    </Panel.Body>
                </Panel>
            )
        })
    }

    renderDescriptions() {
        return this.state.descriptions.map((desc, key) => {
            return (
                <Panel className={`ConsolidationSolutions--description`}  key={key}>
                    <Panel.Heading>
                        {key+1}
                    </Panel.Heading>
                    <Panel.Body className="ConsolidationSolutions--description__body">
                        <div className="ConsolidationSolutions--description__containertext">
                            <p className="ConsolidationSolutions--description__text">{desc}</p>
                        </div>
                    </Panel.Body>
                </Panel>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="ConsolidationSolutions--container">
                     <Panel className="ConsolidationSolutions--container__placeholders" bsStyle="primary">
                        <Panel.Heading className="ConsolidationSolutions--heading">
                            <Panel.Title componentClass="h3">Rankings</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body className="ConsolidationSolutions--body">
                            {this.renderRepresentations()}
                        </Panel.Body>
                    </Panel>

                    <Panel className="ConsolidationSolutions--container__elements" bsStyle="primary">
                        <Panel.Heading className="ConsolidationSolutions--heading">
                            <Panel.Title componentClass="h3">Representations</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body className="ConsolidationSolutions--body">
                            {this.renderDescriptions()}
                        </Panel.Body>
                    </Panel>
                </div>

                 <div className="ConsolidationSolutions--buttons">
                    <Button bsStyle="info" onClick={this.props.handleOpenTutorial}>Get info about this step</Button>
                    <Button bsStyle="primary" onClick={() => console.log('todo go to home')}>Finish activity</Button>
                </div>
            </div>
        );
    }
}
