import React, {Component} from "react"
import InstitutionModal from './modals/InstitutionModal'
import ECDEModal from './modals/ECDEModal'
import PrimarySchoolModal from './modals/PrimarySchoolModal'
import SecondarySchoolModal from './modals/SecondarySchoolModal'
import UndergraduateModal from './modals/UndergraduateModal'
import Link from "react-router-dom/es/Link"


class Add extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showAddInstitutionModal: false,
            showAddECDEModal: false,
            showAddPrimarySchoolModal: false,
            showAddSecondarySchoolModal: false,
            showAddUndergraduateModal: false,
        }
        this.showAddInstitutionModal = this.showAddInstitutionModal.bind(this)
        this.closeAddInstitutionModal = this.closeAddInstitutionModal.bind(this)
        this.showAddECDEModal = this.showAddECDEModal.bind(this)
        this.closeAddECDEModal = this.closeAddECDEModal.bind(this)
        this.showAddPrimarySchoolModal = this.showAddPrimarySchoolModal.bind(this)
        this.closeAddPrimarySchoolModal = this.closeAddPrimarySchoolModal.bind(this)
        this.showAddSecondarySchoolModal = this.showAddSecondarySchoolModal.bind(this)
        this.closeAddSecondarySchoolModal = this.closeAddSecondarySchoolModal.bind(this)
        this.showAddUndergraduateModal = this.showAddUndergraduateModal.bind(this)
        this.closeAddUndergraduateModal = this.closeAddUndergraduateModal.bind(this)

    }



    showAddInstitutionModal(e) {
        e.preventDefault()
        this.setState({showAddInstitutionModal: true})
    }

    closeAddInstitutionModal() {
        this.setState({showAddInstitutionModal: false})
    }

    showAddECDEModal(e) {
        e.preventDefault()
        this.setState({showAddECDEModal: true})
    }

    closeAddECDEModal() {
        this.setState({showAddECDEModal: false})
    }

    showAddPrimarySchoolModal(e) {
        e.preventDefault()
        this.setState({showAddPrimarySchoolModal: true})
    }

    closeAddPrimarySchoolModal() {
        this.setState({showAddPrimarySchoolModal: false})
    }

    showAddSecondarySchoolModal(e) {
        e.preventDefault()
        this.setState({showAddSecondarySchoolModal: true})
    }

    closeAddSecondarySchoolModal() {
        this.setState({showAddSecondarySchoolModal: false})
    }

    showAddUndergraduateModal(e) {
        e.preventDefault()
        this.setState({showAddUndergraduateModal: true})
    }

    closeAddUndergraduateModal() {
        this.setState({showAddUndergraduateModal: false})
    }

    render() {
        const {showAddInstitutionModal, showAddECDEModal, showAddPrimarySchoolModal, showAddSecondarySchoolModal, showAddUndergraduateModal,} = this.state
        return (
            <div className="container">
                <h1>PUBLIC RECORDS</h1>
                {/*<ul className="list-inline">*/}
                    {/*<li className="list-inline-item"><Link to="/">Home</Link></li>*/}
                    {/*<li className="list-inline-item"><Link to="/search">Search</Link></li>*/}
                {/*</ul>*/}
                <hr/>
                <div className="row">
                    <ul className="list-unstyled">
                        <li>
                            <button className="btn btn-primary btn-sm" onClick={this.showAddInstitutionModal}>Add
                                institution
                            </button>
                        </li>
                        <br/>
                        <li>
                            <button className="btn btn-primary btn-sm" onClick={this.showAddECDEModal}>Add ECDE Record
                            </button>
                        </li>
                        <br/>
                        <li>
                            <button className="btn btn-primary btn-sm" onClick={this.showAddPrimarySchoolModal}>Add
                                Primary School Record
                            </button>
                        </li>
                        <br/>
                        <li>
                            <button className="btn btn-primary btn-sm" onClick={this.showAddSecondarySchoolModal}>Add
                                Secondary School Record
                            </button>
                        </li>
                        <br/>
                        <li>
                            <button className="btn btn-primary btn-sm" onClick={this.showAddUndergraduateModal}>Add
                                Undergraduate Record
                            </button>
                        </li>
                        <br/>
                    </ul>
                </div>
                <InstitutionModal show={showAddInstitutionModal} onClose={this.closeAddInstitutionModal}/>
                <ECDEModal show={showAddECDEModal} onClose={this.closeAddECDEModal}/>
                <PrimarySchoolModal show={showAddPrimarySchoolModal} onClose={this.closeAddPrimarySchoolModal}/>
                <SecondarySchoolModal show={showAddSecondarySchoolModal} onClose={this.closeAddSecondarySchoolModal}/>
                <UndergraduateModal show={showAddUndergraduateModal} onClose={this.closeAddUndergraduateModal}/>
            </div>
        )
    }
}

export default Add
