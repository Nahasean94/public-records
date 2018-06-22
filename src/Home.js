import React, {Component} from "react"
import {Link} from "react-router-dom"


class Home extends Component {

    render() {
        return (
            <div className="container">
                <Link to="/add" className="btn btn-primary btn-sm">Add</Link>
                <br/>
                <br/>
                <Link to="/search" className="btn btn-primary btn-sm">Search</Link>
            </div>
        )
    }

}

export default Home
