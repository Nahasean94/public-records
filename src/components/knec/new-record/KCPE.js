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

class KCPE extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            math: '',
            english: '',
            kiswahili: '',
            science: '',
            social_studies: '',
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
                            science: this.state.science,
                            social_studies: this.state.social_studies,
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
                            science: '',
                            social_studies: '',
                            message: data
                                ? `New KCPE record added.`
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
                    <label className="col-sm-3 col-form-label">Science</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChange}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.science}
                            name="science"
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Social studies & Religion</label>
                    <div className="col-sm-9 ">
                        <Select
                            closeOnSelect={true}
                            onChange={this.onChange}
                            options={marksOptions()}
                            placeholder="Search Score"
                            removeSelected={true}
                            value={this.state.location}
                            name="social_studies"
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

                export default KCPE