import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

export default class Banner extends Component {
	constructor(props) {
		super(props)
	}

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        Productive Failure
                    </Navbar.Brand>
                </Navbar.Header>
            </Navbar>
        );
    }
}
