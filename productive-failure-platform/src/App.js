import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Display from './components/Display';
import Banner from './components/Banner';
import '../src/App.css';
import '../src/literallycanvas.css';


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
