import React from 'react'
import Menu from "./Menu"
import PropTypes from 'prop-types'

class Students extends React.Component {


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-2">
                        <Menu router={this.context.router} active="students"/>
                    </div>
                    <div className="col-sm-4">Students</div>
                </div>
            </div>
        )
    }
}

Students.contextTypes = {
    router: PropTypes.object.isRequired
}
export default Students