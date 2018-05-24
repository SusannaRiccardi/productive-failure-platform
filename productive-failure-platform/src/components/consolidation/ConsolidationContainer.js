import React, { Component } from 'react';
import Banner from '../Banner';
import ConsolidationTutorial from './ConsolidationTutorial';
import axios from 'axios';
import ConsolidationPattern from './ConsolidationPattern';
import ConsolidationRankings from './ConsolidationRankings';
var _ = require('lodash');


export default class ConsolidationContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal : true,
            consolidation : {},
            representations : []
        }

        this.shuffleRepresentations = this.shuffleRepresentations.bind(this);
        this.handleOpenCloseModal = this.handleOpenCloseModal.bind(this);
        this.handleSubmitRepresentations = this.handleSubmitRepresentations.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/api/v1/iteration_consolidations`)
        .then(res => {
            // Create array of representations
            let representations = [];
            for (let i = 1; i < 7; i++) {
                let rep = {
                    id: i,
                    svg: res.data[`rep${i}`]
                }
                representations.push(rep)
            }
            
            let shuffledRepresentations = this.shuffleRepresentations(representations)

            this.setState({
                consolidation: res.data,
                representations: shuffledRepresentations
            })
        })
        .catch(err => console.log(err))
    }

    // Taken from StackOverflow (https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
    // Function to shuffle representations
    shuffleRepresentations(representations) {
        var currentIndex = representations.length, temporaryValue, randomIndex;
        
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = representations[currentIndex];
            representations[currentIndex] = representations[randomIndex];
            representations[randomIndex] = temporaryValue;
        } 
        return representations;
    }

    handleOpenCloseModal() {
        this.setState({
            showModal : !this.state.showModal
        })
    }

    handleSubmitRepresentations(representations) {
        console.log(representations)
    }

    render() {
        return (
            <div>
                <Banner step={3}/>
                <div className="consolidation-container">
                    <ConsolidationTutorial 
                        open={this.state.showModal}
                        close={this.handleOpenCloseModal}
                    />

                    <div className="">
                        {!_.isEmpty(this.state.consolidation) && (
                            <ConsolidationPattern 
                                pattern={this.state.consolidation.pattern}
                            />
                        )}

                        {!_.isEmpty(this.state.representations) && (
                            <ConsolidationRankings 
                                representations={this.state.representations}
                                handleOpenTutorial={this.handleOpenCloseModal}
                                handleSubmitRepresentations={this.handleSubmitRepresentations}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
