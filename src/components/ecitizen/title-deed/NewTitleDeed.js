import React from 'react'
import {isEmpty} from 'lodash'
import TextFieldGroup from "../../shared/TextFieldsGroup"
import Select from 'react-select'
import getWeb3 from "../../../utils/getWeb3"
import PublicRecords from "../../../blockchain/build/contracts/PublicRecords"

const contract = require('truffle-contract')

let districtOptions = [{
    label: "Nakuru",
    value: "Nakuru"
}, {
    label: "Kiambu",
    value: "Kiambu"
}, {
    label: "Eldoret",
    value: "Eldoret"
}, {
    label: "Kisumu",
    value: "Kisumu"
}, {
    label: "Kitale",
    value: "Kitale"
}
]


class NewTitleDeed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title_number: '',
            approximate_area: '',
            registry: '',
            names: '',
            postal_address: '',
            district: '',
            date: '',
            web3: null,
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onChangeDistrict = this.onChangeDistrict.bind(this)


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
        let {district} = this.state
        district = district.value
        const publicRecords = contract(PublicRecords)
        publicRecords.setProvider(this.state.web3.currentProvider)

        // Declaring this for later so we can chain functions on SimpleStorage.
        let publicRecordsInstance
        // Get accounts.
        this.state.web3.eth.getCoinbase((error, coinbase) => {

            publicRecords.deployed().then((instance) => {
                publicRecordsInstance = instance
                return publicRecordsInstance.addTitleDeed(this.state.title_number, this.state.approximate_area, this.state.registry, this.state.names, this.state.expiry, this.state.postal_address, district, this.state.date, {from: coinbase})
            }).then((result) => {
                console.log(result)
            })
        })

    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})

    }

    onChangeDistrict(district) {
        this.setState({district})

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
                    label="Title Number"
                    type="number"
                    name="title_number"
                    value={this.state.title_number}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    label="Approximate Area(acres)"
                    type="number"
                    name="approximate_area"
                    value={this.state.approximate_area}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    label="Registry Map Sheet No"
                    type="number"
                    name="registry"
                    value={this.state.registry}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    label="Full names"
                    type="text"
                    name="names"
                    value={this.state.names}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    label="Postal Address"
                    type="text"
                    name="postal_address"
                    value={this.state.postal_address}
                    onChange={this.onChange}
                />
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">District</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChangeDistrict}
                            options={districtOptions}
                            placeholder="Search district"
                            removeSelected={true}
                            value={this.state.district}
                        />
                    </div>
                </div>
                <TextFieldGroup
                    label="Date"
                    type="date"
                    name="date"
                    value={this.state.date}
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

export default NewTitleDeed