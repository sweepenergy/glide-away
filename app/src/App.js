import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from './pages/login';
import Navbar from './pages/Navbar'

const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/dashboard" component={Home} />
            </Switch>
        </Router>
    );
}

export default App;