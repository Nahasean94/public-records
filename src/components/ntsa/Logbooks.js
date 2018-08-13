import React from 'react'
import Menu from "./Menu"
import PropTypes from 'prop-types'

class Logbooks extends React.Component {


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-2">
                        <Menu router={this.context.router} active="logbooks"/>
                    </div>
                    <div className="col-sm-4">Logbooks</div>
                </div>
            </div>
        )
    }
}

Logbooks.contextTypes = {
    router: PropTypes.object.isRequired
}
export default Logbooks