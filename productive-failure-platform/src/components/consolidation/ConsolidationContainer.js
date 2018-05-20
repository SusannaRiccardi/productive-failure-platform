import React, { Component } from 'react';
import Banner from '../Banner';
import ConsolidationTutorial from './ConsolidationTutorial';

export default class ConsolidationContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal : true
        }

        this.handleOpenCloseModal = this.handleOpenCloseModal.bind(this);
    }

    handleOpenCloseModal() {
        this.setState({
            showModal : !this.state.showModal
        })
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
                </div>
            </div>
        );
    }
}
