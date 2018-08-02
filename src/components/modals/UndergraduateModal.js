import React from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import {isEmpty} from 'lodash'
import TextFieldGroup from '../shared/TextFieldsGroup'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {connect} from 'react-redux'
import PublicRecords from '../../blockchain/build/contracts/PublicRecords.json'
import getWeb3 from '../../utils/getWeb3'

const contract = require('truffle-contract')

class UndergraduateModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            programme: '',
            institution: '',
            grade: '',
            date: '',
            upi: '',
            errors: {},
            isLoading: false,
            invalid: false,
            web3: null
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }

    componentWillMount() {
        // Get network provider and web3 instance.
        // See utils/getWeb3 for more info.

        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
                })

            })
            .catch(() => {
                console.log('Error finding web3.')
            })
    }


    validateInput(data) {
        let errors = {}
        if (validator.isEmpty(data.programme)) {
            errors.programme = 'This field is required'
        }
        if (validator.isEmpty(data.upi)) {
            errors.upi = 'This field is required'
        }
        if (validator.isEmpty(data.grade)) {
            errors.grade = 'This field is required'
        }
        if (validator.isEmpty(data.institution)) {
            errors.institution = 'This field is required'
        }
        if (validator.isEmpty(data.date)) {
            errors.date = 'This field is required'
        }
        if (data.grade > 100) {
            errors.grade = "Grade cannot be more than 100"
        }
        if (data.grade < 0) {
            errors.grade = "Grade cannot be less than 0"
        }
        return {
            errors,
            isValid: isEmpty(errors)
        }
    }

    isValid() {
        const {errors, isValid} = this.validateInput(this.state)
        if (!isValid) {
            this.setState({errors, invalid: true})
        }
        return isValid
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.isValid()) {
            const {programme, grade, institution, upi, date} = this.state
            this.setState({errors: {}, isLoading: true})
            const publicRecords = contract(PublicRecords)
            publicRecords.setProvider(this.state.web3.currentProvider)

            // Declaring this for later so we can chain functions on SimpleStorage.
            let publicRecordsInstance

            // Get accounts.
            this.state.web3.eth.getCoinbase((error, coinbase) => {
                publicRecords.deployed().then((instance) => {
                    publicRecordsInstance = instance
                    return publicRecordsInstance.addUndergraduateRecord(upi, programme, grade, date, institution, {from: coinbase})
                }).then((result) => {
                    console.log(result)
                    this.props.onClose()
                    this.setState({todo: ''})

                })
            })

        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {show, onClose} = this.props
        const {errors, programme, isLoading, invalid, upi,grade, date,institution} = this.state

        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Add a new Undergraduate Record</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                label="Student UPI"
                                type="text"
                                name="upi"
                                value={upi}
                                onChange={this.onChange}
                                errors={errors.upi}
                                autofocus={true}
                            />
                            <TextFieldGroup
                                label="Programme"
                                type="text"
                                name="programme"
                                value={programme}
                                onChange={this.onChange}
                                errors={errors.programme}
                                autofocus={true}
                            />
                            <TextFieldGroup
                                label="Grade"
                                type="text"
                                name="grade"
                                value={grade}
                                onChange={this.onChange}
                                errors={errors.grade}
                            />
                            <TextFieldGroup
                                label="Institution UPI"
                                type="text"
                                name="institution"
                                value={institution}
                                onChange={this.onChange}
                                errors={errors.institution}
                            />
                            <TextFieldGroup
                                label="Date awarded"
                                type="date"
                                name="date"
                                value={date}
                                onChange={this.onChange}
                                errors={errors.date}
                            />

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label" htmlFor="county"></label>
                                <div className="col-sm-9">
                                    <button
                                            className="form-control btn btn-primary btn-sm"
                                            type="submit">Save
                                    </button>
                                </div>
                            </div>
                        </form>
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


UndergraduateModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}
UndergraduateModal.contextTypes = {
    router: PropTypes.object.isRequired
}


export default connect(null, {})(UndergraduateModal)

