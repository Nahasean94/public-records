import React from 'react'
import {isEmpty} from 'lodash'
import Select from 'react-select'
import TextFieldGroup from "../shared/TextFieldsGroup"

let courseOptions = [{
    value: "Informatics",
    label: "Informatics"
},
    {
        label: "Information Science",
        value: "Information Science"
    },
    {
        label: "Media Science",
        value: "Media Science"
    },
    {
        label: "Education",
        value: "Education"
    },
    {
        label: "Computer Science",
        value: "Computer Science"
    },
    {
        label: "Human Resource",
        value: "Human Resource"
    },
]


let scoreOptions = [{
    value: "1st Class",
    label: "1st Class"
},
    {
        label: "2nd Upper",
        value: "2nd Upper"
    },
    {
        label: "2nd Lower",
        value: "2nd Lower"
    },
    {
        label: "Pass",
        value: "Pass"
    },
]

class Undergraduate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            course: '',
            score: '',
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
            <div>
                <div className="col-sm-6 offset-sm-3">
                    <form onSubmit={this.onSubmit}>
                        <TextFieldGroup
                            label="Full names"
                            type="text"
                            name="names"
                            value={this.state.names}
                            onChange={this.onChange}
                        />
                        <TextFieldGroup
                            label="Year"
                            type="date"
                            name="year"
                            value={this.state.year}
                            onChange={this.onChange}
                        />
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Course</label>
                            <div className="col-sm-9 ">
                                <Select
                                    closeOnSelect={true}
                                    onChange={this.onChange}
                                    options={courseOptions}
                                    placeholder="Search Course"
                                    removeSelected={true}
                                    value={this.state.course}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Score</label>
                            <div className="col-sm-9 ">
                                <Select
                                    closeOnSelect={true}
                                    onChange={this.onChange}
                                    options={scoreOptions}
                                    placeholder="Search score"
                                    removeSelected={true}
                                    value={this.state.score}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-9 offset-3">
                                <button
                                    className="btn btn-dark btn-sm form-control "
                                    type="submit">Save
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}

export default Undergraduate