import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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
