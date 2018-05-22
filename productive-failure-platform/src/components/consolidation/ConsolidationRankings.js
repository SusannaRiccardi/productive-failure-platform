import React, { Component } from 'react';
import { Panel, DropdownButton, MenuItem } from 'react-bootstrap';
var _ = require('lodash');


export default class ConsolidationRankings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            representations: [],
            rankings: {}
        }
        this.renderRepresentations = this.renderRepresentations.bind(this);
        this.updateRanking = this.updateRanking.bind(this);
    }  
    
    componentDidMount() {
        let representations = [];
        let rankings = {}
        for (let i = 1; i < 7; i++) {
            let rep = {
                rep: i,
                svg: this.props.consolidation[`rep${i}`]
            }
            representations.push(rep)
            rankings[i] = 0
        }
        this.setState({
            representations: representations,
            rankings: rankings
        })
    }

    renderRepresentations() {
        return this.state.representations.map(rep => {
            return (
                <Panel className={`consolidation-rankings-representation`} bsStyle="info" key={rep.rep}>
                    <Panel.Body className="consolidation-representation-body">
                        <div className="consolidation-representation" dangerouslySetInnerHTML={{__html: rep.svg}}/>
                    </Panel.Body>
                    {/* Ranking */}
                    <Panel.Footer>
                        <DropdownButton
                            bsStyle="primary"
                            id={`dropdown-basic`}
                            title={`Ranking: ${this.state.rankings[rep.rep]}`}
                        >
                            <MenuItem eventKey="1" onClick={() => this.updateRanking(rep.rep, 1)}>1</MenuItem>
                            <MenuItem eventKey="2" onClick={() => this.updateRanking(rep.rep, 2)}>2</MenuItem>
                            <MenuItem eventKey="3" onClick={() => this.updateRanking(rep.rep, 3)}>3</MenuItem>
                            <MenuItem eventKey="4" onClick={() => this.updateRanking(rep.rep, 4)}>4</MenuItem>
                            <MenuItem eventKey="5" onClick={() => this.updateRanking(rep.rep, 5)}>5</MenuItem>
                            <MenuItem eventKey="6" onClick={() => this.updateRanking(rep.rep, 6)}>6</MenuItem>
                        </DropdownButton>
                    </Panel.Footer>
                </Panel>
            )
        })
    }
    
    updateRanking(rep, pos) {
        let newRanking = _.cloneDeep(this.state.rankings);
        newRanking[rep] = pos;

        this.setState({
            rankings: newRanking
        })
    }

    render() {
        return (
            <div className="consolidation-rankings">
                {this.renderRepresentations()}
            </div>
        );
    }
}
