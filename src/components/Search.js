import React, {Component} from 'react'
import InstitutionResults from "./search_results/InstitutionResults"
import ECDEResults from "./search_results/ECDEResults"
import PrimarySchoolResults from "./search_results/PrimarySchoolResults"
import SecondarySchoolResults from "./search_results/SecondarySchoolResults"
import UndergraduateResults from "./search_results/UndergraduateResults"

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.onChange = this.onChange.bind(this)

    }

    onChange(e) {
        console.log(e.target.value)
    }

    render() {
        return (
            <div className="container">
                <h1>PUBLIC RECORDS</h1>
                <form>
                    <div className="input-group">
                        <input type="text" className="form-control form-control-sm"
                               placeholder="Search"
                               aria-label="Search" aria-describedby="basic-addon1"
                        />
                    </div>
                    <fieldset className="form-group ">
                        <div className="form-check  ">
                            <input className="form-check-input" type="radio"
                                   value="student" name="search-type" onChange={this.onChange} id="search-student"/>
                            <label className="form-check-label" htmlFor="search-student">Student</label>
                        </div>
                        <div className="form-check  ">
                            <input className="form-check-input" type="radio"
                                   value="institution" name="search-type" onChange={this.onChange}
                                   id="search-institution"/>
                            <label className="form-check-label" htmlFor="search-institution">Institution</label>
                        </div>
                        <div className="form-check  ">
                            <input className="form-check-input" type="radio"
                                   value="id" name="search-type" onChange={this.onChange}
                                   id="search-id"/>
                            <label className="form-check-label" htmlFor="search-id">National ID (will display non academic records)</label>
                        </div>
                        <div className="form-check  ">
                            <input className="form-check-input" type="radio"
                                   value="id" name="search-type" onChange={this.onChange}
                                   id="search-car"/>
                            <label className="form-check-label" htmlFor="search-car">Car number plate (will display log book of the car)</label>
                        </div>
                        <div className="form-check  ">
                            <input className="form-check-input" type="radio"
                                   value="id" name="search-type" onChange={this.onChange}
                                   id="search-land"/>
                            <label className="form-check-label" htmlFor="search-land">Plot number (will display title deed of the plot/land)</label>
                        </div>
                    </fieldset>
                    <div className="form-group  ">
                        <input className="form-control btn btn-primary btn-sm" type="submit" value="Search"/>
                    </div>
                </form>
                <div className="row">
                    <div className="col-sm-4 card">
                        <InstitutionResults/>
                    </div>
                    <div className="col-sm-4 card">
                        <ECDEResults/>
                    </div>
                    <div className="col-sm-4 card">
                        <PrimarySchoolResults/>
                    </div>
                    <div className="col-sm-4 card">
                        <SecondarySchoolResults/>
                    </div>
                    <div className="col-sm-4 card">
                        <UndergraduateResults/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search