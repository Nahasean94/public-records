import React from 'react'
import {Link} from "react-router-dom"
import PropTypes from "prop-types"

class NavigationBar extends React.Component {
    render() {

        const userLinks = (<div className="navbar-nav flex-row ml-md-auto">
            <Link to="/dashboard" className="nav-item nav-link-custom">Dashboard</Link>
        </div>)

        return(<nav className="navbar navbar-expand-sm bg-light">
                    <Link className="navbar-brand" to="/">
                        Public Records
                    </Link>
                    <div className="navbar-collapse" id="navbarNavAltMarkup">
                        {userLinks}
                    </div>

                </nav>
        )
    }
}

NavigationBar.contextTypes = {
    router: PropTypes.object.isRequired
}

export default NavigationBar