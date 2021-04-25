import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Profile from "./pages/profile";
import Home from "./pages/Home";
import Login from './pages/login';
import Data from './pages/data';
import Navbar from './pages/Navbar'

const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/dashboard" component={Home} />
                <Route path="/profile" component={Profile} />
                <Route path='/data' exact component={Data}/>
            </Switch>
        </Router>
    );
}

export default App;