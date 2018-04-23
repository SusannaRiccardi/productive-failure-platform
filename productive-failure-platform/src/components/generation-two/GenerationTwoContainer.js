import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';


export default class GenerationTwoContainer extends Component {
    render() {
        return (
            <div className="generation-two-container">
                <div className="generation-one--description">
                    <Panel>
                        <Panel.Body>
                            <div className="PatternDescription-description">
                                In this stage, you will see a description of a pattern by someone else. Your goal here is to reproduce
                                the original pattern from the given representation. Drag the elements below and complete the pattern.
                            </div>
                        </Panel.Body>
                    </Panel>
                </div>
                
                <div className="generation-one--representation"></div>
                

            </div>
        );
    }
}
