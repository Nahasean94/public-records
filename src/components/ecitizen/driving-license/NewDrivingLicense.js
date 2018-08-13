import React from 'react'
import {isEmpty} from 'lodash'
import TextFieldGroup from "../../shared/TextFieldsGroup"
import Select from 'react-select'
import PublicRecords from '../../../blockchain/build/contracts/PublicRecords.json'
import getWeb3 from '../../../utils/getWeb3'

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

    onSubmit(e) {
        e.preventDefault()
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

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})

    }

    onChangeVehicleClasses(vehicle_classes) {
        this.setState({vehicle_classes})

    }

    render() {
        const {loading, message} = this.state
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
                />
                <TextFieldGroup
                    label="Date of birth"
                    type="date"
                    name="dob"
                    value={this.state.dob}
                    onChange={this.onChange}
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
                    </div>
                </div>
                <TextFieldGroup
                    label="Postal Address"
                    type="text"
                    name="postal_address"
                    value={this.state.postal_address}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    label="Date issued"
                    type="date"
                    name="date_of_issue"
                    value={this.state.date_of_issue}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    label="National ID"
                    type="number"
                    name="nationalID"
                    value={this.state.nationalID}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    label="Date of expiry"
                    type="date"
                    name="expiry"
                    value={this.state.expiry}
                    onChange={this.onChange}
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