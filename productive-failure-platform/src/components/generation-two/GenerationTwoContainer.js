import React, { Component } from 'react';
import { Panel, Row, Col } from 'react-bootstrap';
import axios from 'axios';
var lc;


export default class GenerationTwoContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            representation : null
        }
    }
    
    componentWillMount() {
        axios.get('http://localhost:3001/api/v1/representation')
        .then(response => {
            this.setState({
                representation: response.data
            }, () => {
                lc = window.LC.init(document.getElementsByClassName('literally-core-container')[0]);
                lc.loadSnapshot(JSON.parse(this.state.representation.svg));
            })
        })
        .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="generation-two-container">
                <Row>
                    <Col sm={6} md={2}>
                        <Panel>
                            <Panel.Body>
                                <div className="PatternDescription-description">
                                    In this stage, you will see a description of a pattern by someone else. Your goal here is to reproduce
                                    the original pattern from the given representation. Drag the elements below and complete the pattern.
                                </div>
                            </Panel.Body>
                        </Panel>
                    </Col>
                    <Col sm={6} md={10}>
                        <Panel>
                            <Panel.Body>
                                <div className="literally-core-container">
                                </div>
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>
            </div>
        );
    }
}
