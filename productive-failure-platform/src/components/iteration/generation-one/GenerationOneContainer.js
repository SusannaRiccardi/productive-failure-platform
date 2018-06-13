import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import PatternDescription from './PatternDescription';
import GenerationOneSolutions from './GenerationOneSolutions';
import GenerationOneTutorial from './GenerationOneTutorial';
import Banner from '../../Banner';
import axios from 'axios';
var _ = require('lodash');


export default class GenerationOneContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            patterns : [],
            showModal : true,
            activityPatterns : []
        }
        
        this.checkActivityPattern = this.checkActivityPattern.bind(this);
        this.createActivityPattern = this.createActivityPattern.bind(this);
        this.handleOpenCloseModal = this.handleOpenCloseModal.bind(this);
    }

    // Before the component is mounted, call checkActivityPattern to load page
    componentWillMount() {
        this.checkActivityPattern();
    }

    checkActivityPattern() {
        // Get the productive failure id
        const id = localStorage.getItem('productive-failure')
        // Get token for authentication
        const auth = localStorage.getItem('jwt');

        // Load the activity pattern that is related to this productive failure id:
        // If it exists, then load it and load the corresponding patterns. 
        // Otherwise, create a new one and load the patterns.
        // Also, if the user is not logged in and visits this page, it will be redirected to the home page.
        axios.get(`http://localhost:3001/api/iteration/activity_patterns?productive_failure_id=${id}`, {
            // Add the authorization token to the header.
            headers: {
                Authorization: auth
            }
        })
        .then(response => {
            // If there isn't an activity pattern for this productive_failure_id, load two patterns 
            // and create an activity pattern for each one of them.
            if (response.data === null || response.data.length === 0) {
                this.createActivityPattern(id, auth);
            } else {
                // Save the activity patterns just loaded
                this.setState({
                    activityPatterns : response.data
                })

                // Load the patterns to show for the two activity patterns
                for (let i = 0; i < response.data.length; i++) {
                    axios.get(`http://localhost:3001/api/iteration/patterns/${response.data[i].pattern_id}`, {
                        headers: {
                            Authorization: auth
                        }
                    })
                    .then(response => {
                        let patterns = _.cloneDeep(this.state.patterns)
                        patterns.push(response.data)

                        // Save the patterns in the state
                        this.setState({
                            patterns: patterns
                        })
                    })
                    .catch(error => console.log(error))
                }
            }
        })
        .catch(() => {
            // Not authorized.
            this.props.history.replace('/')
        })
    }

    // In case there is no activity pattern yet with this productive failure id, then create one
    createActivityPattern(id, auth) {
        axios.get('http://localhost:3001/api/iteration/patterns', {
            headers: {
                Authorization: auth
            }
        })
        .then(response => {
            // Received two patterns
            this.setState({
                patterns: response.data
            })

            // Create array of activity patterns (two) that will be posted
            let activityPatterns = [];
            for (let i = 0; i < response.data.length; i++) {
                let activityPattern = {
                    activityPattern : {
                        productive_failure_id: id,
                        pattern_id: response.data[i].id
                    }
                }
                activityPatterns.push(activityPattern)
            }

            axios.post('http://localhost:3001/api/iteration/activity_patterns', {
                headers: {
                    Authorization: auth,
                    'Content-Type': 'application/json'
                }, data : JSON.stringify(activityPatterns)
            })
            .then(response => {
                // Save the activity patterns just created
                this.setState({
                    activityPatterns: response.data
                })
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    }

    // Open and close the modal for the tutorial
    handleOpenCloseModal() {
        this.setState({
            showModal : !this.state.showModal
        })
    }
    
    render() {
        if (this.state.patterns.length !== 2) {
            return (
                // TODO: loading
                <div></div>
            )
        } else {
            return (
                <div>
                    <Banner step={1}/>
                    <div className="stage-1-container">
                        {/* Tutorial for this step */}
                        <GenerationOneTutorial 
                            open={this.state.showModal}
                            close={this.handleOpenCloseModal}
                        />
        
                        <div className="stage-1--pattern">
                            {/* Patterns shown at the beginning of the page */}
                            <PatternDescription 
                                patterns={this.state.patterns}
                            />
                        </div>
        
                        {/* Canvases used for representations */}
                        <GenerationOneSolutions 
                            patterns={this.state.patterns}
                            activityPatterns={this.state.activityPatterns}
                        />
        
                        {!this.state.showModal && <Button bsStyle="info" onClick={this.handleOpenCloseModal}>Get info about this step</Button>}
                    </div>
                </div>
            );
        }
    }
}
