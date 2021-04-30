import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Profile from "./pages/profile";
import Home from "./pages/Home";
import Data from './pages/data';
import Data2 from './pages/Data2'
import Login from './pages/login';
import Login3 from './pages/login3';

const App = () => {
    return (
        <Router>
           
            <Switch>
                <Route exact path='/'  component={Login}/>
                <Route path='/profile'  component={Profile}/>
                <Route path='/data'  component={Data}/>
                <Route path='/data2'render={() =>(
                    <Data2 props={true}/>
                )}/>
                <Route path="/dashboard" component={Home} />
            </Switch>
                  
        </Router>
    );
}

export default App;