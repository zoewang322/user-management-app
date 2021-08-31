import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './components/Home';
import Create from './components/Create';
import Edit from './components/Edit'

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path="/create" component={Create} exact/>
                    <Route path="/edit" component={Edit} exact/> 
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App;