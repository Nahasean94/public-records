import React from 'react'
import {isEmpty} from 'lodash'
import {fetchOptionsOverride} from "../../../shared/fetchOverrideOptions"
import {addPrimarySchoolRecord, students} from "../../../shared/queries"
import Select from 'react-select'
import {Query} from 'graphql-react'
import TextFieldGroup from "../../shared/TextFieldsGroup"

let marksOptions = () => {
    let marks = []
    for (let i = 0; i <= 100; i++) {
        marks.push({
            label: i,
            value: i
        })
    }
    return marks
}
let upiOptions

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

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)

    }


    onSubmit(e) {
        e.preventDefault()
        // if (this.isValid()) {
        this.setState({errors: {}, isLoading: true})
        this.props.graphql
            .query({
                fetchOptionsOverride: fetchOptionsOverride,
                resetOnLoad: true,
                operation: {
                    variables: {
                        dob:this.dob.state,
                        vehicle_classes:this.vehicle_classes.state,
                        registry:this.registry.state,
                        names:this.names.state,
                        postal_address:this.postal_address.state,
                        expiry:this.expiry.state,
                        date:this.date.state,
                    },
                    query: addTitleDeed
                }
            })
            .request.then(({data}) => {
                if (data) {
                    this.setState({
                        dob: '',
                        vehicle_classes: '',
                        registry: '',
                        names: '',
                        postal_address: '',
                        expiry: '',
                        date: '',
                        message: data
                            ? `New Title deed record added.`
                            : `An error occurred while adding record.`
                    })
                }
            }
        )
        // }
    }

    onChange(e) {
        this.setState({[e.target.name]:e.target.value})

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
                    type="number"
                    name="dob"
                    value={this.state.dob}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    label="Vehicle Classes Licensed"
                    type="text"
                    name="vehicle_classes"
                    value={this.state.vehicle_classes}
                    onChange={this.onChange}
                />
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
                    type="text"
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