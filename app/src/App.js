import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/home";
import Profile from "./pages/profile";
import Login from './pages/login';
import Data from './pages/data';
import Navbar from './pages/Navbar'

const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/profile" component={Profile} />
                <Route path='/login' exact component={Login}/>
                <Route path='/data' exact component={Data}/>
            </Switch>
        </Router>
    );
}

export default App;