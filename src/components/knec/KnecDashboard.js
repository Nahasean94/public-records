import React from 'react'
import PropTypes from 'prop-types'
import NewRecord from "./new-record/NewRecord"
import {Consumer} from 'graphql-react'

class KnecDashboard extends React.Component {
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


    // componentDidMount() {
    //     this.props.graphql
    //         .query({
    //             fetchOptionsOverride: fetchOptionsOverride,
    //             resetOnLoad: true,
    //             operation: {
    //                 query: caseCategories
    //             }
    //         })
    //         .request.then(({data, loading, error}) => {
    //         if (data) {
    //             if (data.caseCategories.length > 0) {
    //                 this.setState({caseCategories: data.caseCategories})
    //             }
    //         } else if (loading) {
    //
    //             this.setState({loading: true})
    //         } else if (error) {
    //
    //             this.setState({error: true})
    //         }
    //
    //     })
    // }

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
        return (<div className="container">
            <button className="btn btn-sm btn-info" onClick={this.showNewRecordModal}><span><i
                className="fa fa-plus"></i></span> New record
            </button>

            {message && <div>{message}</div>}

            <NewRecord show={showNewRecordModal} onClose={this.closeNewCaseCategoryForm}/>
        </div>)
    }
}

KnecDashboard.contextTypes = {
    router: PropTypes.object.isRequired
}
export default () => <Consumer>{graphql => <KnecDashboard graphql={graphql}/>}</Consumer>
