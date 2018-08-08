import React from 'react'
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import classnames from 'classnames'

class NavigationBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: ''
        }
        if (window.location.pathname === '/') {
            console.log(window.location.pathname)
            this.state.active = 'home'
        }
        else if (window.location.pathname === '/ntsa') {
            this.state.active = 'ntsa'
        }
        else if (window.location.pathname === '/ecitizen') {
            this.state.active = 'ecitizen'
        }
        else if (window.location.pathname === '/knec') {
            this.state.active = 'knec'
        }
        else if (window.location.pathname === '/institution') {
            this.state.active = 'institution'
        }
        this.onChangeActive = this.onChangeActive.bind(this)
    }

    onChangeActive(active) {
        this.setState({active})
    }

    render() {
        const {active} = this.state
        return (
            <nav className="navbar navbar-expand-sm navigation-bar">
                <div className="container">
                    <Link
                        className={classnames("nav-link navbar-brand", {"nav-link navbar-brand active-link": active === 'home'})}
                        to="/" onClick={() => this.onChangeActive('home')}>
                        Home
                    </Link>
                    <div className="navbar-nav flex-row ml-md-auto">
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link
                                        className={classnames("nav-link", {" nav-link active-link": active === 'knec'})}
                                        to="/knec" onClick={() => this.onChangeActive('knec')}>KNEC</Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className={classnames("nav-link", {" nav-link active-link": active === 'ntsa'})}
                                        to="/ntsa" onClick={() => this.onChangeActive('ntsa')}>NTSA</Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className={classnames("nav-link", {" nav-link active-link": active === 'ecitizen'})}
                                        to="/ecitizen" onClick={() => this.onChangeActive('ecitizen')}>eCitizen</Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className={classnames("nav-link", {" nav-link active-link": active === 'institution'})}
                                        to="/institution"
                                        onClick={() => this.onChangeActive('institution')}>Institution</Link>
                                </li>
                            </ul>
                        </div>
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