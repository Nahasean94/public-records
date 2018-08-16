import React from 'react'
import {isEmpty} from 'lodash'
import Select from 'react-select'
import TextFieldGroup from "../shared/TextFieldsGroup"
import PublicRecords from "../../blockchain/build/contracts/PublicRecords"
import getWeb3 from "../../utils/getWeb3"
import Menu from "./Menu"
import PropTypes from "prop-types"
import Logbooks from "../ntsa/Logbooks"
import validator from "validator"

const contract = require('truffle-contract')

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
let upiOptions = [{
    label: "ABC",
    value: "ABC"
}, {
    label: "BDD",
    value: "BDD"
}, {
    label: "JKI",
    value: "JKI"
}, {
    label: "ZXY",
    value: "ZXY"
}, {
    label: "WFY",
    value: "WFY"
}]
let yearOptions = () => {
    let marks = []
    for (let i = 1987; i <= 2017; i++) {
        marks.push({
            label: i,
            value: i
        })
    }
    return marks
}
class Undergraduate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            course: '',
            upi: '',
            score: '',
            year: '',
            institution: 'MOI',
            web3: null,
        }

        this.onChange = this.onChange.bind(this)
        this.onChangeCourseOptions = this.onChangeCourseOptions.bind(this)
        this.onChangeScoreOptions = this.onChangeScoreOptions.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeYear = this.onChangeYear.bind(this)
        this.onChangeUpi=this.onChangeUpi.bind(this)
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
    onChangeYear(year) {
        this.setState({year})
    }
    validateInfo(data) {
        let errors = {}

        if (!data.make.value) {
            errors.make = 'This field is required'
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
        if (this.isInfoValid()) {
            const publicRecords = contract(PublicRecords)
            publicRecords.setProvider(this.state.web3.currentProvider)

            // Declaring this for later so we can chain functions on SimpleStorage.
            let publicRecordsInstance
            // Get accounts.
            this.state.web3.eth.getCoinbase((error, coinbase) => {

                publicRecords.deployed().then((instance) => {
                    publicRecordsInstance = instance
                    return publicRecordsInstance.addUndergraduateRecord(this.state.upi.value, this.state.course.value, this.state.score.value, this.state.year.value, this.state.institution, {from: coinbase})
                }).then((result) => {
                    console.log(result)
                })
            })
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})

    }

    onChangeCourseOptions(course) {
        this.setState({course})

    }

    onChangeScoreOptions(score) {
        this.setState({score})

    }
    onChangeUpi(upi) {
        this.setState({upi})
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
            <div className="container">
                <div className="row">
                    <div className="col-sm-2">
                        <Menu router={this.context.router} active="add-record"/>
                    </div>
                    <div className="col-sm-6 offset-sm-1">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Student UPI</label>
                                <div className="col-sm-9 ">
                                    <Select
                                        closeOnSelect={true}
                                        onChange={this.onChangeUpi}
                                        options={upiOptions}
                                        placeholder="Search Upi"
                                        removeSelected={true}
                                        value={this.state.upi}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Year</label>
                                <div className="col-sm-9 ">
                                    <Select
                                        closeOnSelect={true}
                                        onChange={this.onChangeYear}
                                        options={yearOptions()}
                                        placeholder="Search Year"
                                        removeSelected={true}
                                        value={this.state.year}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Course</label>
                                <div className="col-sm-9 ">
                                    <Select
                                        closeOnSelect={true}
                                        onChange={this.onChangeCourseOptions}
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
                                        onChange={this.onChangeScoreOptions}
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
            </div>
        )
    }
}
Undergraduate.contextTypes = {
    router: PropTypes.object.isRequired
}
export default Undergraduate