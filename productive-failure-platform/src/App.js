import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Display from './components/Display';



const App = () => (
    <Router>
        <div>
            {/* TODO: add banner */}
            <div className="Banner">
                <p><Link to="/">Home</Link></p>
            </div>

            <Route exact path="/" component={Home}/>
            <Route path="/productive-failure" component={Display}/>
        </div>
    </Router>
)

export default App;
