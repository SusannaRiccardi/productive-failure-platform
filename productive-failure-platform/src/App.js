import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Display from './components/Display';
import '../src/App.css';
import '../src/literallycanvas.css';


const App = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/productive-failure" component={Display}/>
        </Switch>
    </Router>
)

export default App;
