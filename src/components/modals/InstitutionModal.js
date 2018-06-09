import React from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import {isEmpty} from 'lodash'
import TextFieldGroup from '../shared/TextFieldsGroup'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {connect} from 'react-redux'
import classnames from "classnames"
import PublicRecords from '../../build/contracts/PublicRecords.json'
import getWeb3 from '../../utils/getWeb3'

const contract = require('truffle-contract')

class InstitutionModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            category: '',
            dateFounded: '',
            county: '',
            upi: '',
            errors: {},
            isLoading: false,
            invalid: false,
            web3: null
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.checkSchoolExists = this.checkSchoolExists.bind(this)
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

    checkSchoolExists(e) {
        const field = e.target.name
        const val = e.target.value
        if (val !== '') {
            // this.props.isSchoolExists(val).then(res => {
            //     if (res) {
            //         let errors = this.state.errors
            //         let invalid
            //         if (res.data) {
            //             invalid = true
            //             errors[field] = 'There is school registered with such name'
            //         } else {
            //             invalid = false
            //             errors[field] = ''
            //         }
            //         this.setState({errors, invalid})
            //     }
            // })
        }
    }

    validateInput(data) {
        let errors = {}
        if (validator.isEmpty(data.name)) {
            errors.name = 'This field is required'
        }
        if (data.name.length < 3) {
            errors.name = 'School name must be at least 3 characters long'
        }
        if (typeof data.name !== 'string') {
            errors.name = 'School name must be a string'
        }
        if (validator.isEmpty(data.category)) {
            errors.category = 'This field is required'
        }
        if (validator.isEmpty(data.county)) {
            errors.county = 'This field is required'
        }
        if (validator.isEmpty(this.state.dateFounded)) {
            errors.dateFounded = 'This field is required'
            this.setState({errors, invalid: true})
        }
        if (Date.parse(data.dateFounded) > Date.parse(new Date())) {
            errors.dateFounded = "Date of founded cannot be in future"
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
            const {name, dateFounded, county, upi, category} = this.state
            this.setState({errors: {}, isLoading: true})
            const publicRecords = contract(PublicRecords)
            publicRecords.setProvider(this.state.web3.currentProvider)

            // Declaring this for later so we can chain functions on SimpleStorage.
            let publicRecordsInstance

            // Get accounts.
            this.state.web3.eth.getCoinbase((error, coinbase) => {
                publicRecords.deployed().then((instance) => {
                    publicRecordsInstance = instance
                    return publicRecordsInstance.addInstitution(name, dateFounded, county, upi, category, {from: coinbase})
                }).then((result) => {
                    console.log(result)
                    this.setState({todo: ''})

                })
            })

            // this.props.registerSchool({
            //     name: this.state.name,
            //     category: this.state.category,
            //     county: this.state.county
            // }).then(
            //     (school) => {
            //         this.props.addFlashMessage({
            //             type: 'success',
            //             text: 'You have signed up successfully. Please use the login in form below to access your account'
            //         })
            //         this.props.onClose()
            //         this.props.addSchool(school.data)
            //         this.setState({name: '', category: '', isLoading: false})
            //     },
            //     err => this.setState({errors: err.response.data, isLoading: false})
            // )
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {show, onClose} = this.props
        const {errors, name, isLoading, invalid, upi, dateFounded} = this.state

        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Register a new school/institution</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                label="Name"
                                type="text"
                                name="name"
                                value={name}
                                onChange={this.onChange}
                                errors={errors.name}
                                // checkUserExists={this.checkSchoolExists}
                                autofocus={true}
                            />
                            <TextFieldGroup
                                label="Date founded"
                                type="date"
                                name="dateFounded"
                                value={dateFounded}
                                onChange={this.onChange}
                                errors={errors.dateFounded}
                            />
                            <TextFieldGroup
                                label="Upi"
                                type="text"
                                name="upi"
                                value={upi}
                                onChange={this.onChange}
                                errors={errors.upi}
                            />
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label" htmlFor="category">Category</label>
                                <div className="col-sm-9">

                                    <select
                                        className={classnames("form-control form-control-sm", {"is-invalid": errors.category})}
                                        name="category"
                                        required="true" onChange={this.onChange}>
                                        <option>Select</option>
                                        <option value="ECDE">ECDE</option>
                                        <option value="primary">primary</option>
                                        <option value="secondary">secondary</option>
                                        <option value="tertiary">tertiary</option>
                                    </select>
                                    {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label" htmlFor="county">County</label>
                                <div className="col-sm-9">

                                    <select
                                        className={classnames("form-control form-control-sm", {"is-invalid": errors.county})}
                                        id="county" name="county"
                                        required="true" onChange={this.onChange}>
                                        <option>Select</option>
                                        <option value="Nairobi">Nairobi</option>
                                        <option value="Kisumu">Kisumu</option>
                                        <option value="Kiambu">Kiambu</option>
                                        <option value="Nakuru">Nakuru</option>
                                        <option value="Bungoma">Bungoma</option>
                                        <option value="Uasin Gishu">Uasin Gishu</option>
                                        <option value="Kisii">Kisii</option>
                                        <option value="Meru">Meru</option>
                                        <option value="Muranga">Murang'a</option>
                                        <option value="Narok">Narok</option>
                                    </select>
                                    {errors.county && <div className="invalid-feedback">{errors.county}</div>}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label" htmlFor="county"></label>
                                <div className="col-sm-9">
                                    <button disabled={isLoading || invalid}
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


InstitutionModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    // isSchoolExists: PropTypes.func.isRequired,
}
InstitutionModal.contextTypes = {
    router: PropTypes.object.isRequired
}


export default connect(null, {})(InstitutionModal)

