import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/home/Home';
import Display from './components/Display';
import './App.css';
import './literallycanvas.css';


const App = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/productive-failure" component={Display}/>
            <Redirect to={'/'} />
        </Switch>
    </Router>
)

export default App;
