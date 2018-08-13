import React from 'react'
import {isEmpty} from 'lodash'
import Select from 'react-select'
import TextFieldGroup from "../shared/TextFieldsGroup"
import PublicRecords from "../../blockchain/build/contracts/PublicRecords"
import getWeb3 from "../../utils/getWeb3"

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

class Undergraduate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            course: '',
            upi: '',
            score: '',
            date:'',
            institution:'MOI',
            web3: null,
        }

        this.onChange = this.onChange.bind(this)
       this.onChangeCourseOptions=this.onChangeCourseOptions.bind(this)
       this.onChangeScoreOptions=this.onChangeScoreOptions.bind(this)
       this.onSubmit=this.onSubmit.bind(this)
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
        const publicRecords = contract(PublicRecords)
        publicRecords.setProvider(this.state.web3.currentProvider)

        // Declaring this for later so we can chain functions on SimpleStorage.
        let publicRecordsInstance
        // Get accounts.
        this.state.web3.eth.getCoinbase((error, coinbase) => {

            publicRecords.deployed().then((instance) => {
                publicRecordsInstance = instance
                return publicRecordsInstance.addUndergraduateRecord(this.state.upi, this.state.course, this.state.score, this.state.date, this.state.institution,{from: coinbase})
            }).then((result) => {
                console.log(result)
            })
        })
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
                            label="Student UPI"
                            type="text"
                            name="upi"
                            value={this.state.upi}
                            onChange={this.onChange}
                        />
                        <TextFieldGroup
                            label="Year"
                            type="date"
                            name="date"
                            value={this.state.date}
                            onChange={this.onChange}
                        />
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
        )
    }
}

export default Undergraduate