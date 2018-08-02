import React from 'react'
import {Link} from "react-router-dom"
import PropTypes from "prop-types"

class NavigationBar extends React.Component {
    render() {
        return (<nav className="navbar navbar-expand-sm bg-light">
                <Link className="nav-link navbar-brand" to="/">
                    Home
                </Link>
                <div className="navbar-nav flex-row ml-md-auto">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/knec">KNEC</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/ntsa">NTSA</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/ecitizen">eCitizen</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/institution">Institution</Link>
                            </li>
                        </ul>
                    </div>
                </div>


            </nav>
        )
    }
}

NavigationBar.contextTypes = {
    router: PropTypes.object.isRequired
}

export default NavigationBar