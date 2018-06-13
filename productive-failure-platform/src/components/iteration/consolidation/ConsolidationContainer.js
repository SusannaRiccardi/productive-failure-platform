import React, { Component } from 'react';
import Banner from '../../Banner';
import ConsolidationTutorial from './ConsolidationTutorial';
import ConsolidationPattern from './ConsolidationPattern';
import ConsolidationRankings from './ConsolidationRankings';
import ConsolidationSolutions from './ConsolidationSolutions';
import axios from 'axios';
var _ = require('lodash');


// Container for the consolidation phase
export default class ConsolidationContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal : true,
            consolidation : {},
            representations : [],
            isEditRanking : true,
            submittedRepresentations : []
        }

        this.shuffleRepresentations = this.shuffleRepresentations.bind(this);
        this.handleOpenCloseModal = this.handleOpenCloseModal.bind(this);
        this.handleSubmitRepresentations = this.handleSubmitRepresentations.bind(this);
    }

    componentDidMount() {
        const auth = localStorage.getItem('jwt');

        // Load the iteration consolidation with the representations
        axios.get(`http://localhost:3001/api/iteration/iteration_consolidations`, {
            headers: {
                Authorization: auth
            }
        })
        .then(res => {
            // Create array of representations
            let representations = [];
            for (let i = 1; i < 7; i++) {
                let rep = {
                    id: i,
                    svg: res.data[`rep${i}svg`]
                }
                representations.push(rep)
            }
            
            // shuffle the order of the representations
            let shuffledRepresentations = this.shuffleRepresentations(representations)

            this.setState({
                consolidation: res.data,
                representations: shuffledRepresentations
            })
        })
        .catch(() => {
            // If not authorized, go back to home
            this.props.history.replace('/')
        })
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

    // Handle open and close tutorial modal
    handleOpenCloseModal() {
        this.setState({
            showModal : !this.state.showModal
        })
    }

    // handle submit the iteration consolidation solution
    handleSubmitRepresentations(representations) {
        // Get the productive failure id
        const id = localStorage.getItem('productive-failure') 

        let iterationSolution = {
            productive_failure_id: id,
            rep1: representations[`rep${1}`].id,
            rep2: representations[`rep${2}`].id,
            rep3: representations[`rep${3}`].id,
            rep4: representations[`rep${4}`].id,
            rep5: representations[`rep${5}`].id,
            rep6: representations[`rep${6}`].id,
            iteration_consolidation_id: this.state.consolidation.id
        }

        axios.post('http://localhost:3001/api/iteration/iteration_consolidation_solutions', iterationSolution)
        .then(res => {
            this.setState({
                submittedRepresentations: representations,
                isEditRanking: false
            })
        })
        .catch(err => console.log(err))
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
                        
                        {this.state.isEditRanking ? (
                            !_.isEmpty(this.state.representations) && (
                                <ConsolidationRankings 
                                    representations={this.state.representations}
                                    handleOpenTutorial={this.handleOpenCloseModal}
                                    handleSubmitRepresentations={this.handleSubmitRepresentations}
                                />
                            )
                        ) : (
                            <ConsolidationSolutions 
                                representations={this.state.submittedRepresentations}
                                consolidation={this.state.consolidation}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
