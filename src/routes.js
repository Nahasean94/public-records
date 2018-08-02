import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import App from "./App"
import Add from "./components/Add"
import Search from "./components/Search"
import KnecDashboard from "./components/knec/KnecDashboard"
import Nemis from './components/nemis/nemis'

export default () => {

    return (<BrowserRouter>
            <div>
                <App>
                    <Switch>
                        <Route exact path="/" component={Search}/>
                        <Route exact path="/add" component={Add}/>
                        <Route exact path="/search" component={Search}/>
                        <Route exact path="/knec" component={KnecDashboard}/>
                        <Route exact path="/nemis" component={Nemis}/>

                    </Switch>
                </App>


            </div>
        </BrowserRouter>
    )
}