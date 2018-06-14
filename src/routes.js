import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import App from "./App"
import Home from './Home'
import Add from "./components/Add"
import Search from "./components/Search"


export default () => {

    return (<BrowserRouter>
            <div>
                <App>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/add" component={Add}/>
                        <Route exact path="/search" component={Search}/>
                    </Switch>
                </App>


            </div>
        </BrowserRouter>
    )
}