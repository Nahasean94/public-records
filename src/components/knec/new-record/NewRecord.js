import React from 'react'
import {isEmpty} from 'lodash'
// import {addLocation, isLocationExists} from "../../../shared/queries"
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap"
import {Consumer} from 'graphql-react'


class NewRecord extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            exam: '',
            upi: '',
        }
        // this.onChange = this.onChange.bind(this)
        // this.onSubmit = this.onSubmit.bind(this)
        // this.checkLocationExists = this.checkLocationExists.bind(this)
    }

    // checkLocationExists() {
    //     this.props.graphql
    //         .query({
    //             fetchOptionsOverride: fetchOptionsOverride,
    //             resetOnLoad: true,
    //             operation: {
    //                 variables: {
    //                     name: this.state.name,
    //                 },
    //                 query: isLocationExists
    //             }
    //         })
    //         .request.then(({data}) => {
    //
    //         if (data) {
    //             if (data.isLocationExists.exists) {
    //                 let errors = {}
    //                 errors.name = 'A record with that name already exists'
    //                 this.setState({errors, invalid: true,})
    //             } else {
    //                 let errors = {}
    //                 this.setState({errors, invalid: false,})
    //             }
    //         }
    //     })
    //
    // }


    render() {
        const {show, onClose} = this.props

        const {errors, loading, message, isLoading, invalid} = this.state
        if (show) {
            if (loading) {
                return <p>Adding a new record</p>
            }
            return (
                <Modal isOpen={show} toggle={onClose} size="lg" className="modal-dialog modal-dialog-centered">
                    <ModalHeader toggle={onClose}>Add a new record</ModalHeader>
                    <ModalBody>
                        {message ? <div>
                            {message}
                        </div> : ""}
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label" htmlFor="exam">Exam</label>
                            <div className="col-sm-9">
                                <select className="form-control form-control-sm" id="exam" name="exam"
                                        required="true" value={this.state.exam} onChange={this.onExamChange}>
                                    <option>Select</option>
                                    <option value="male">KCPE</option>
                                    <option value="female">KCSE</option>
                                </select>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={onClose}>Cancel</Button>{' '}
                    </ModalFooter>
                </Modal>
            )
        }
        else return null
    }

}

export default ({show,onClose}) => <Consumer>{graphql => <NewRecord show={show} onClose={onClose} graphql={graphql}/>}</Consumer>