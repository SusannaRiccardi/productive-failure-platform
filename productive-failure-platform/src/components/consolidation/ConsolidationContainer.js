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
            consolidation : {}
        }

        this.handleOpenCloseModal = this.handleOpenCloseModal.bind(this);
        this.handleSubmitRepresentations = this.handleSubmitRepresentations.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/api/v1/iteration_consolidations`)
        .then(res => {
            this.setState({
                consolidation: res.data
            })
        })
        .catch(err => console.log(err))
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

                        {!_.isEmpty(this.state.consolidation) && (
                            <ConsolidationRankings 
                                consolidation={this.state.consolidation}
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
