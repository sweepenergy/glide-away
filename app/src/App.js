import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/home";
import Profile from "./pages/profile";
import Login from './pages/login';
import Data from './pages/data';
import Navbar from './pages/Navbar'
import Data2 from './pages/Data2'

const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path='/'  component={Login}/>
                <Route path='/profile'  component={Profile}/>
                <Route path='/data'  component={Data}/>
                <Route path='/data2'render={() =>(
                    <Data2 props={datas}/>
                )}/>
            </Switch>
        </Router>
    );
}

export default App;