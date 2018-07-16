import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import PatternGeneration from './PatternGeneration';
import GenerationTwoTutorial from './GenerationTwoTutorial';
import Banner from '../../Banner';
import axios from 'axios';
var _ = require('lodash');


export default class GenerationTwoContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            representations : [],
            showModal : true,
            reconstructPatterns : []
        }

        this.getReconstructPattern = this.getReconstructPattern.bind(this);
        this.createReconstructPattern = this.createReconstructPattern.bind(this);
        this.handleOpenCloseModal = this.handleOpenCloseModal.bind(this);
    }
    
    componentWillMount() {
        this.getReconstructPattern();
    }

    getReconstructPattern() {
        // Get the productive failure id
        const id = localStorage.getItem('productive-failure')
        // Get token for authentication
        const auth = localStorage.getItem('jwt');

        // Load the reconstruct pattern that is related to this productive failure id:
        // If it exists, then load it and load the corresponding representations. 
        // Otherwise, create a new one and load the representations.
        // Also, if the user is not logged in and visits this page, it will be redirected to the home page.
        axios.get(`http://localhost:3001/api/iteration/reconstruct_patterns?productive_failure_id=${id}`, {
            headers: {
                Authorization: auth
            }
        })
        .then(response => {
            if (response.data === null || response.data.length === 0) {
                this.createReconstructPattern(id, auth);
            } else {
                this.setState({
                    reconstructPatterns : response.data
                })

                for (let i = 0; i < response.data.length; i++) {
                    axios.get(`http://localhost:3001/api/iteration/representations/${response.data[i].representation_id}`, {
                        headers: {
                            Authorization: auth
                        }
                    })
                    .then(response => {
                        let representations = _.cloneDeep(this.state.representations)
                        representations.push(response.data)

                        this.setState({
                            representations: representations
                        })
                    })
                    .catch(error => console.log(error))
                }
            }
        })
        .catch(() => {
            this.props.history.replace('/')
        })
    }

    createReconstructPattern(id, auth) {
        // Get representations if no reconstruct_pattern with this productive_failure_id exists
        axios.get(`http://localhost:3001/api/iteration/representation?productive_failure_id=${id}`, {
            headers: {
                Authorization: auth
            }
        })
        .then(response => {
            // Save representations in the state
            this.setState({
                representations: response.data
            })

            let reconstructPatterns = [];
            for (let i = 0; i < response.data.length; i++) {
                let reconstructPattern = {
                    reconstructPattern : {
                        productive_failure_id: id,
                        representation_id: response.data[i].id
                    }
                }
                reconstructPatterns.push(reconstructPattern)
            }

            axios.post('http://localhost:3001/api/iteration/reconstruct_patterns', {
                headers: {
                    Authorization: auth,
                    'Content-Type': 'application/json'
                }, data : JSON.stringify(reconstructPatterns)
            })
            .then(response => {
                this.setState({
                    reconstructPatterns : response.data
                })
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    }

    // handle close and open tutorial modal
    handleOpenCloseModal() {
        this.setState({
            showModal : !this.state.showModal
        })
    }

    render() {
        return (
            <div>
                <Banner step={2}/>
                <div className="generation-two-container">
                    {/* tutorial modal */}
                    <GenerationTwoTutorial 
                        open={this.state.showModal}
                        close={this.handleOpenCloseModal}
                    />

                    {this.state.representations.length === 2 && (
                        <div className="representations-container">
                            <Panel className="representation-one" bsStyle="primary">
                                <Panel.Heading>
                                    <Panel.Title componentClass="h3">First representation</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body className="representation-stage-two">
                                    <div className="representation-stage-two" dangerouslySetInnerHTML={{__html: this.state.representations[0].svg}}/>
                                </Panel.Body>
                            </Panel>
                            <Panel className="representation-two" bsStyle="primary">
                                <Panel.Heading>
                                    <Panel.Title componentClass="h3">Second representation</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body className="representation-stage-two">
                                    <div className="representation-stage-two" dangerouslySetInnerHTML={{__html: this.state.representations[1].svg}}/>
                                </Panel.Body>
                            </Panel>
                        </div>
                    )}

                    <PatternGeneration 
                        handleOpenCloseModal={this.handleOpenCloseModal}
                        showModal={this.state.showModal}
                        reconstructPatterns={this.state.reconstructPatterns} 
                    />
                </div>
            </div>
        );
    }
}
