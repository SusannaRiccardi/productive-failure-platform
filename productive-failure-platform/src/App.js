import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Display from './components/Display';
import Banner from './components/Banner';


const App = () => (
    <Router>
        <div>
            <Banner />

            <Route exact path="/" component={Home}/>
            <Route path="/productive-failure" component={Display}/>
        </div>
    </Router>
)

export default App;
