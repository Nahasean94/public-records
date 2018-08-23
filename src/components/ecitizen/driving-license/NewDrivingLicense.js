import React from 'react'
import {isEmpty} from 'lodash'
import TextFieldGroup from "../../shared/TextFieldsGroup"
import Select from 'react-select'
import PublicRecords from '../../../blockchain/build/contracts/PublicRecords.json'
import getWeb3 from '../../../utils/getWeb3'
import validator from "validator"

const contract = require('truffle-contract')

let vehicleClasses = [{
    label: "A",
    value: "A"
},
    {
        label: "B",
        value: "B"
    },
    {
        label: "C",
        value: "C"
    },
    {
        label: "D",
        value: "D"
    },
    {
        label: "E",
        value: "E"
    },
    {
        label: "F",
        value: "F"
    },
    {
        label: "G",
        value: "G"
    },
    {
        label: "H",
        value: "H"
    },
]

class NewDrivingLicense extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dob: '',
            vehicle_classes:[],
            names: '',
            postal_address: '',
            expiry: '',
            date_of_issue: '',
            nationalID: '',
            web3: null,
            errors:{}
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onChangeVehicleClasses = this.onChangeVehicleClasses.bind(this)

    }
    componentWillMount() {
        // Get network provider and web3 instance.
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
    validateInfo(data){
        let errors={}
    if (validator.isEmpty(data.dob)) {
        errors.dob = 'This field is required'
    }
    if (validator.isEmpty(data.date_of_issue)) {
        errors.date_of_issue = 'This field is required'
    }
    if (validator.isEmpty(data.names)) {
        errors.names = 'This field is required'
    }
    if (validator.isEmpty(data.expiry)) {
        errors.expiry = 'This field is required'
    }
    if (validator.isEmpty(data.postal_address)) {
        errors.postal_address = 'This field is required'
    }
    // if (!data.postal_address) {
    //     errors.postal_address = 'This field is required'
    // }
    if (!data.nationalID) {
        errors.nationalID = 'This field is required'
    }
    if (data.vehicle_classes.length<1) {
        errors.vehicle_classes = 'This field is required'
    }

    if (data.nationalID.length > 8 || data.nationalID.length < 8) {
        errors.car_number = 'National ID must be between 8 numbers'
    }
    if (!data.names.match(/[\sa-zA-Z0-9]/g)) {
        errors.names = "Full names can only contain letters and spaces"
    }
    if (data.names.split(" ").length < 2) {
        errors.names = "You must provide at least 2 names"
    }
    // if (!data.names.match(/[\sa-zA-Z0-9]/g)) {
    //     errors.names = "Full names can only contain letters and spaces"
    // }
    if (data.names.split(" ").length < 2) {
        errors.names = "You must provide at least 2 names"
    }

    if (!data.postal_address.match(/[\sa-zA-Z0-9]/g)) {
        errors.postal_address = "Postal address should take the format 352 Eldoret"
    }
    if (Date.parse(data.dob) > Date.parse(new Date())) {
        errors.dob = "You cannot be born in the future"
    }
    if (Date.parse(data.dob) < Date.parse(new Date(2000))) {
        errors.dob = "You must be 18 and above"
    }
    if (Date.parse(data.date_of_issue)> Date.parse(new Date())) {
        errors.date_of_issue = "Date of issue cannot be in the future"
    }
    if (Date.parse(data.expiry) < Date.parse(new Date())) {
        errors.expiry = "Expiry date cannot be in the past"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


    isInfoValid() {
        const {errors, isValid} = this.validateInfo(this.state)
        if (!isValid) {
            this.setState({errors})
        }
        return isValid
    }


    onSubmit(e) {
        e.preventDefault()
        if(this.isInfoValid()){
        let {vehicle_classes} = this.state
        vehicle_classes = vehicle_classes.map(host => {
            return host.value
        })
        const publicRecords = contract(PublicRecords)
        publicRecords.setProvider(this.state.web3.currentProvider)

        // Declaring this for later so we can chain functions on SimpleStorage.
        let publicRecordsInstance
console.log(vehicle_classes)
        // Get accounts.
        this.state.web3.eth.getCoinbase((error, coinbase) => {

            publicRecords.deployed().then((instance) => {
                publicRecordsInstance = instance

                return publicRecordsInstance.addDrivingLicense(this.state.nationalID,this.state.dob,vehicle_classes,this.state.names,this.state.postal_address,this.state.expiry,this.state.date_of_issue, {from: coinbase})

            }).then((result) => {
               console.log(result)
            })
        })
        }

    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})

    }

    onChangeVehicleClasses(vehicle_classes) {
        this.setState({vehicle_classes})

    }

    render() {
        const {loading, message,errors} = this.state
        if (loading) {
            return <p>Adding record…</p>
        }
        if (message) {
            return <div className="alert alert-info">{message}</div>
        }
        return (
            <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                    label="Full names"
                    type="text"
                    name="names"
                    value={this.state.names}
                    onChange={this.onChange}
                    error={errors.names}
                />
                <TextFieldGroup
                    label="Date of birth"
                    type="date"
                    name="dob"
                    value={this.state.dob}
                    onChange={this.onChange}
                    error={errors.dob}
                />
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Vehicle classes licensed</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChangeVehicleClasses}
                            options={vehicleClasses}
                            placeholder="Search vehicle classes"
                            removeSelected={true}
                            value={this.state.vehicle_classes}
                            multi={true}
                        />
                        {errors && errors.vehicle_classes &&<div className="alert alert-danger">{errors.vehicle_classes}</div>}
                    </div>
                </div>
                <TextFieldGroup
                    label="PO Box"
                    type="text"
                    name="postal_address"
                    value={this.state.postal_address}
                    onChange={this.onChange}
                    error={errors.postal_address}
                />
                <TextFieldGroup
                    label="Date issued"
                    type="date"
                    name="date_of_issue"
                    value={this.state.date_of_issue}
                    onChange={this.onChange}
                    error={errors.date_of_issue}

                />
                <TextFieldGroup
                    label="National ID"
                    type="number"
                    name="nationalID"
                    value={this.state.nationalID}
                    onChange={this.onChange}
                    error={errors.nationalID}
                />
                <TextFieldGroup
                    label="Date of expiry"
                    type="date"
                    name="expiry"
                    value={this.state.expiry}
                    onChange={this.onChange}
                    error={errors.expiry}
                />

                <div className="form-group row">
                    <div className="col-sm-9 offset-3">
                        <button
                            className="btn btn-dark btn-sm form-control "
                            type="submit">Save
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

export default NewDrivingLicense