import React from 'react'
import {isEmpty} from 'lodash'
import {fetchOptionsOverride} from "../../../shared/fetchOverrideOptions"
import {addKcseRecord} from "../../../shared/queries"
import Select from 'react-select'

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

class KCSE extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
            message: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }


    onSubmit(e) {
        e.preventDefault()
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true})
            this.props.graphql
                .query({
                    fetchOptionsOverride: fetchOptionsOverride,
                    resetOnLoad: true,
                    operation: {
                        variables: {
                            math: this.state.math,
                            english: this.state.english,
                            kiswahili: this.state.kiswahili,
                            chemistry: this.state.chemistry,
                            physics: this.state.physics,
                            biology: this.state.biology,
                            geography: this.state.geography,
                            religion: this.state.religion,
                            history: this.state.history,
                            business: this.state.business,
                        },
                        query: addKcseRecord
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
                            message: data
                                ? `New KCSE record added.`
                                : `An error occurred while adding record.`
                        })
                    }
                }
            )
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
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
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Math</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChange}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.math}
                            name="math"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">English</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChange}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.english}
                            name="english"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Kiswahili</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChange}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.kiswahili}
                            name="kiswahili"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Chemistry</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChange}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.chemistry}
                            name="chemistry"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Biology</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChange}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.biology}
                            name="biology"
                        />
                    </div>

                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Physics</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChange}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.physics}
                            name="physics"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Geography</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChange}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.geography}
                            name="geography"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">History</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChange}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.history}
                            name="history"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Religion</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChange}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.religion}
                            name="religion"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Business</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChange}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.business}
                            name="business"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-9 offset-3">
                        <button disabled={this.state.isLoading || this.state.invalid}
                                className="btn btn-dark btn-sm form-control "
                                type="submit">Sign up
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

export default KCSE