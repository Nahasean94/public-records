import React from 'react'
import {isEmpty} from 'lodash'
import TextFieldGroup from "../../shared/TextFieldsGroup"
import Select from 'react-select'

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
    //                     title_number: this.title_number.state,
    //                     approximate_area: this.approximate_area.state,
    //                     registry: this.registry.state,
    //                     names: this.names.state,
    //                     postal_address: this.postal_address.state,
    //                     district: this.district.state,
    //                     date: this.date.state,
    //                 },
    //                 query: addTitleDeed
    //             }
    //         })
    //         .request.then(({data}) => {
    //             if (data) {
    //                 this.setState({
    //                     title_number: '',
    //                     approximate_area: '',
    //                     registry: '',
    //                     names: '',
    //                     postal_address: '',
    //                     district: '',
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
                    label="Approximate Area"
                    type="text"
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
                            onChange={this.onChange}
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