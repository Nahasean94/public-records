import React from 'react'
import Menu from "../Menu"
import PropTypes from 'prop-types'
import NewRecord from "../new-record/NewRecord"

class KCPETable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showNewRecordModal: false,
            caseCategories: [],
            message: ''
        }
        this.onSelectCaseCategory = this.onSelectCaseCategory.bind(this)
        this.showNewRecordModal = this.showNewRecordModal.bind(this)
        this.closeNewCaseCategoryForm = this.closeNewCaseCategoryForm.bind(this)

    }

    onSelectCaseCategory(id, name) {
        this.setState({id, name})
    }

    showNewRecordModal() {
        this.setState({showNewRecordModal: true})
    }

    closeNewCaseCategoryForm() {
        this.setState({showNewRecordModal: false})
    }

    render() {
        const {showNewRecordModal, message,} = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-2">
                        <Menu router={this.context.router} active="kcpe"/>
                    </div>
                    <div className="col-sm-4">

                        <button className="btn btn-sm btn-info" onClick={this.showNewRecordModal}><span><i
                            className="fa fa-plus"></i></span> New record
                        </button>

                        <NewRecord show={showNewRecordModal} onClose={this.closeNewCaseCategoryForm}/>
                    </div>
                </div>
            </div>
        )
    }
}

KCPETable.contextTypes = {
    router: PropTypes.object.isRequired
}
export default KCPETable
