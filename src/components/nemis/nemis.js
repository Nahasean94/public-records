import React from 'react'
import {isEmpty} from 'lodash'
import {Consumer} from 'graphql-react'
import TextFieldGroup from "../../shared/TextFieldsGroup"
import {addStudent} from "../../shared/queries"
import {fetchOptionsOverride} from "../../shared/fetchOverrideOptions"


class Nemis extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            education: 'primary',
            upi: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        // this.checkLocationExists = this.checkLocationExists.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.graphql
            .query({
                fetchOptionsOverride:fetchOptionsOverride,
                resetOnLoad: true,
                operation: {
                    variables: {
                        upi: this.state.upi,
                        education: this.state.education,
                    },
                    query: addStudent
                }
            })
            .request.then(({data}) => {
            this.setState({upi: '', education: ''})
            // if (data) {
            //     if (data.addStudent.exists) {
            //         let errors = {}
            //         errors.upi = 'A record with that upi already exists'
            //         this.setState({errors, invalid: true,})
            //     } else {
            //         let errors = {}
            //         this.setState({errors, invalid: false,})
            //     }
            // }
        })

    }


    render() {

        return (
            <div className="col-sm-6  offset-sm-3">
                <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                        label="UPI"
                        type="text"
                        name="upi"
                        value={this.state.upi} autoFocus={true}
                        onChange={this.onChange}

                    />
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label" htmlFor="education">Education</label>
                        <div className="col-sm-9">
                            <select className="form-control form-control-sm" id="education" name="education"
                                    required="true" value={this.state.education} onChange={this.onChange}>
                                {/*<option>Select</option>*/}
                                <option value="primary">Primary</option>
                                <option value="secondary">Secondary</option>
                            </select>

                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-9 offset-sm-3">
                            <button type="submit" className="btn btn-dark btn-sm form-control"
                            >Add
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}

export default () => <Consumer>{graphql => <Nemis graphql={graphql}/>}</Consumer>