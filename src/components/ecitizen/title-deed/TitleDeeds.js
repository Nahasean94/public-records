import React from 'react'
import Menu from "../Menu"
import PropTypes from 'prop-types'

class TitleDeeds extends React.Component {


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <Menu router={this.context.router} active="title-deeds"/>
                    </div>
                    <div className="col-sm-4">Title deeds</div>
                </div>
            </div>
        )
    }
}

TitleDeeds.contextTypes = {
    router: PropTypes.object.isRequired
}
export default TitleDeeds