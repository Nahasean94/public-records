import React from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import {isEmpty} from 'lodash'
import TextFieldGroup from '../shared/TextFieldsGroup'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {connect} from 'react-redux'
import PublicRecords from '../../../build/contracts/PublicRecords.json'
import getWeb3 from '../../utils/getWeb3'

const contract = require('truffle-contract')

class SecondarySchoolModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            upi: '',
            english: '',
            kiswahili: '',
            math: '',
            biology: '',
            chemistry: '',
            physics: '',
            history: '',
            geography: '',
            religion: '',
            business: '',
            date: '',
            institution: '',
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
        if (validator.isEmpty(data.upi)) {
            errors.upi = 'This field is required'
        }
        if (validator.isEmpty(data.english)) {
            errors.english = 'This field is required'
        }
        if (validator.isEmpty(data.kiswahili)) {
            errors.kiswahili = 'This field is required'
        }
        if (validator.isEmpty(data.math)) {
            errors.math = 'This field is required'
        }
        if (validator.isEmpty(data.institution)) {
            errors.institution = 'This field is required'
        }
        if (data.english > 100) {
            errors.english = "Mark cannot be more than 100"
        }
        if (data.english < 0) {
            errors.english = "Mark cannot be less than 0"
        }
        if (data.kiswahili > 100) {
            errors.kiswahili = "Mark cannot be more than 100"
        }
        if (data.kiswahili < 0) {
            errors.kiswahili = "Mark cannot be less than 0"
        }
        if (data.math > 100) {
            errors.math = "Mark cannot be more than 100"
        }
        if (data.math < 0) {
            errors.math = "Mark cannot be less than 0"
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
            const {upi, english, date, math, kiswahili, institution, biology, chemistry, physics, history, geography, religion, business} = this.state

            this.setState({errors: {}, isLoading: true})
            const publicRecords = contract(PublicRecords)
            publicRecords.setProvider(this.state.web3.currentProvider)

            // Declaring this for later so we can chain functions on SimpleStorage.
            let publicRecordsInstance

            // Get accounts.
            this.state.web3.eth.getCoinbase((error, coinbase) => {
                publicRecords.deployed().then((instance) => {
                    publicRecordsInstance = instance
                    return publicRecordsInstance.addSecondarySchoolRecord(upi, english, kiswahili, math, biology, chemistry, physics, history, geography, religion, business, date, institution, {from: coinbase})
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
        const {errors, isLoading, invalid, upi, english, date, math, kiswahili, institution, biology, chemistry, physics, history, geography, religion, business} = this.state

        if (show) {
            return (
                <Modal isOpen={show} toggle={onClose} size="lg">
                    <ModalHeader toggle={onClose}>Enter a new Secondary school Record</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                label="UPI"
                                type="text"
                                name="upi"
                                value={upi}
                                onChange={this.onChange}
                                errors={errors.upi}
                                autofocus={true}
                            />
                            <TextFieldGroup
                                label="English"
                                type="number"
                                name="english"
                                value={english}
                                onChange={this.onChange}
                                errors={errors.english}
                            />
                            <TextFieldGroup
                                label="Kiswahili"
                                type="number"
                                name="kiswahili"
                                value={kiswahili}
                                onChange={this.onChange}
                                errors={errors.kiswahili}
                            />
                            <TextFieldGroup
                                label="Math"
                                type="number"
                                name="math"
                                value={math}
                                onChange={this.onChange}
                                errors={errors.math}
                            />
                            <TextFieldGroup
                                label="Chemistry"
                                type="number"
                                name="chemistry"
                                value={chemistry}
                                onChange={this.onChange}
                                errors={errors.chemistry}
                            />
                            <TextFieldGroup
                                label="Biology"
                                type="number"
                                name="biology"
                                value={biology}
                                onChange={this.onChange}
                                errors={errors.biology}
                            />
                            <TextFieldGroup
                                label="Physics"
                                type="number"
                                name="physics"
                                value={physics}
                                onChange={this.onChange}
                                errors={errors.physics}
                            />
                            <TextFieldGroup
                                label="History"
                                type="number"
                                name="history"
                                value={history}
                                onChange={this.onChange}
                                errors={errors.history}
                            />
                            <TextFieldGroup
                                label="Geography"
                                type="number"
                                name="geography"
                                value={geography}
                                onChange={this.onChange}
                                errors={errors.geography}
                            />
                            <TextFieldGroup
                                label="Religion"
                                type="number"
                                name="religion"
                                value={religion}
                                onChange={this.onChange}
                                errors={errors.religion}
                            />
                            <TextFieldGroup
                                label="Business"
                                type="number"
                                name="business"
                                value={business}
                                onChange={this.onChange}
                                errors={errors.business}
                            />
                            <TextFieldGroup
                                label="Date awarded"
                                type="date"
                                name="date"
                                value={date}
                                onChange={this.onChange}
                                errors={errors.date}
                            />
                            <TextFieldGroup
                                label="Institution UPI"
                                type="text"
                                name="institution"
                                value={institution}
                                onChange={this.onChange}
                                errors={errors.institution}
                            />


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


SecondarySchoolModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,

}
SecondarySchoolModal.contextTypes = {
    router: PropTypes.object.isRequired
}


export default connect(null, {})(SecondarySchoolModal)

