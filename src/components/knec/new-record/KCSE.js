import React from 'react'
import {isEmpty} from 'lodash'
import {fetchOptionsOverride} from "../../../shared/fetchOverrideOptions"
import {addSecondarySchoolRecord, students} from "../../../shared/queries"
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
class KCSE extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            upi: '',
            math: '',
            english: '',
            kiswahili: '',
            chemistry: '',
            biology: '',
            physics: '',
            geography: '',
            history: '',
            religion: '',
            business: '',
            year:'',
            message: ''
        }
        this.onChangeMath=this.onChangeMath.bind(this)
        this.onChangeChemistry=this.onChangeChemistry.bind(this)
        this.onChangeBiology=this.onChangeBiology.bind(this)
        this.onChangeKiswahili=this.onChangeKiswahili.bind(this)
        this.onChangeEnglish=this.onChangeEnglish.bind(this)
        this.onChangePhysics=this.onChangePhysics.bind(this)
        this.onChangeGeography=this.onChangeGeography.bind(this)
        this.onChangeHistory=this.onChangeHistory.bind(this)
        this.onChangeReligion=this.onChangeReligion.bind(this)
        this.onChangeBusiness=this.onChangeBusiness.bind(this)
        this.onChangeUpi=this.onChangeUpi.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }


    onSubmit(e) {
        e.preventDefault()
            this.setState({errors: {}, isLoading: true})
            this.props.graphql
                .query({
                    fetchOptionsOverride: fetchOptionsOverride,
                    resetOnLoad: true,
                    operation: {
                        variables: {
                            upi: this.state.upi.value,
                            math: this.state.math.value,
                            english: this.state.english.value,
                            kiswahili: this.state.kiswahili.value,
                            chemistry: this.state.chemistry.value,
                            physics: this.state.physics.value,
                            biology: this.state.biology.value,
                            geography: this.state.geography.value,
                            religion: this.state.religion.value,
                            history: this.state.history.value,
                            business: this.state.business.value,
                            year: this.state.year,
                        },
                        query: addSecondarySchoolRecord
                    }
                })
                .request.then(({data}) => {
                    if (data) {
                        this.setState({
                            math: '',
                            english: '',
                            kiswahili: '',
                            chemistry: '',
                            biology: '',
                            physics: '',
                            geography: '',
                            history: '',
                            religion: '',
                            business: '',
                            year:'',
                            message: data
                                ? `New KCSE record added.`
                                : `An error occurred while adding record.`
                        })
                    }
                }
            )
    }


    onChangeMath(math) {
        this.setState({math})
    }
    onChangeChemistry(chemistry) {
        this.setState({chemistry})
    }

    onChangeBiology(biology) {
        this.setState({biology})
    }

    onChangeKiswahili(kiswahili) {
        this.setState({kiswahili})
    }
    onChangeEnglish(english) {
        this.setState({english})
    }
    onChangePhysics(physics) {
        this.setState({physics})
    }
    onChangeGeography(geography) {
        this.setState({geography})
    }
    onChangeHistory(history) {
        this.setState({history})
    }
    onChangeReligion(religion) {
        this.setState({religion})

    }
    onChangeBusiness(business) {
        this.setState({business})

    }
    onChangeUpi(upi) {
        this.setState({upi})

    }
    onChange(e) {
        this.setState({[e.target.name]:e.target.value})

    }

    render() {
        const {loading, message} = this.state
        if (loading) {
            return <p>Creating account…</p>
        }
        if (message) {
            return <div className="alert alert-info">{message}</div>
        }
        return (
            <form onSubmit={this.onSubmit}>
                <Query
                    loadOnMount
                    loadOnReset
                    fetchOptionsOverride={fetchOptionsOverride}
                    variables={{education:'secondary'}}
                    query={students}
                >
                    {({loading, data}) => {
                        if (data) {
                            upiOptions = data.students.map(student => {
                                return {
                                    label: student.upi,
                                    value: student.upi
                                }
                            })
                            return  <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Student UPI</label>
                                <div className="col-sm-9 "><Select
                                closeOnSelect={true}
                                onChange={this.onChangeUpi}
                                options={upiOptions}
                                placeholder="Search Student UPI"
                                removeSelected={true}
                                value={this.state.upi}

                            />
                                </div>
                            </div>
                        }
                        else if (loading) {
                            return <p>Loading…</p>
                        }
                        return <p>Loading failed.</p>
                    }
                    }
                </Query>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Math</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChangeMath}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.math}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">English</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChangeEnglish}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.english}

                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Kiswahili</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChangeKiswahili}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.kiswahili}

                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Chemistry</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChangeChemistry}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.chemistry}

                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Biology</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChangeBiology}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.biology}

                        />
                    </div>

                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Physics</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChangePhysics}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.physics}

                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Geography</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChangeGeography}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.geography}

                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">History</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChangeHistory}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.history}

                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Religion</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChangeReligion}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.religion}

                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Business</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChangeBusiness}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.business}

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

export default KCSE