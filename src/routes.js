import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import App from "./App"
import Add from "./components/Add"
import Search from "./components/Search"
import KnecDashboard from "./components/knec/KnecDashboard"
import Nemis from './components/nemis/nemis'
import NewLogBook from "./components/ntsa/NewLogBook"
import Ecitizen from "./components/ecitizen/Ecitizen"
import Undergraduate from "./components/university/Undergraduate"
import TitleDeeds from "./components/ecitizen/title-deed/TitleDeeds"
import DrivingLicenses from "./components/ecitizen/driving-license/DrivingLicenses"
import Logbooks from "./components/ntsa/Logbooks"
import Students from "./components/university/Students"
import KCPETable from "./components/knec/kcpe/KCPETable"
import KCSETable from "./components/knec/kcse/KCSETable"

export default () => {

    return (<BrowserRouter>
            <div>
                <App>
                    <Switch>
                        <Route exact path="/" component={Search}/>
                        <Route exact path="/add" component={Add}/>
                        <Route exact path="/search" component={Search}/>
                        <Route exact path="/knec/kcpe" component={KCPETable}/>
                        <Route exact path="/knec/kcse" component={KCSETable}/>
                        <Route exact path="/nemis" component={Nemis}/>
                        <Route exact path="/ntsa/add-record" component={NewLogBook}/>
                        <Route exact path="/ntsa/logbooks" component={Logbooks}/>
                        <Route exact path="/ecitizen/add-record" component={Ecitizen}/>
                        <Route exact path="/ecitizen/driving-licenses" component={DrivingLicenses}/>
                        <Route exact path="/ecitizen/title-deeds" component={TitleDeeds}/>
                        <Route exact path="/institution/add-record" component={Undergraduate}/>
                        <Route exact path="/institution/students" component={Students}/>
                    </Switch>
                </App>


            </div>
        </BrowserRouter>
    )
}