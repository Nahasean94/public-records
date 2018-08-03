import React from 'react'
import {isEmpty} from 'lodash'
import TextFieldGroup from "../../shared/TextFieldsGroup"
import Select from 'react-select'

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
            vehicle_classes: '',
            registry: '',
            names: '',
            postal_address: '',
            expiry: '',
            date: '',
        }

        // this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)

    }


    // onSubmit(e) {
    //     e.preventDefault()
    //     // if (this.isValid()) {
    //     this.setState({errors: {}, isLoading: true})
    //     this.props.graphql
    //         .query({
    //             fetchOptionsOverride: fetchOptionsOverride,
    //             resetOnLoad: true,
    //             operation: {
    //                 variables: {
    //                     dob: this.state.dob,
    //                     vehicle_classes: this.state.vehicle_classes,
    //                     registry: this.state.registry,
    //                     names: this.state.names,
    //                     postal_address: this.state.postal_address,
    //                     expiry: this.state.expiry,
    //                     date: this.state.date,
    //                 },
    //                 query: addTitleDeed
    //             }
    //         })
    //         .request.then(({data}) => {
    //             if (data) {
    //                 this.setState({
    //                     dob: '',
    //                     vehicle_classes: '',
    //                     registry: '',
    //                     names: '',
    //                     postal_address: '',
    //                     expiry: '',
    //                     date: '',
    //                     message: data
    //                         ? `New Title deed record added.`
    //                         : `An error occurred while adding record.`
    //                 })
    //             }
    //         }
    //     )
    //     // }
    // }

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
                    label="date of birth"
                    type="number"
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
                    name="date"
                    value={this.state.date}
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