import React, { Component } from "react";
import NewTask from "./components/new_task"
import Incomplete from "./components/incomplete"
import Complete from "./components/complete"

class Home extends Component {
    render() {
        return (
            <div className="container">
                <h1>A SIMPLE TODO APP MADE WITH PURE REACT</h1>
                <NewTask />
                <h5>Todos</h5>
                <p>Check the checkbox to mark a todo as complete</p>
                <div className="row">
                    <Incomplete />
                    <Complete/>
                </div>
            </div>
        );
    }
}

export default Home;
