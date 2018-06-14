import React, {Component} from 'react'

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
                    <div className="form-check  form-check-inline">
                        <input className="form-check-input" type="radio"
                               value="student" name="search-type" onChange={this.onChange} id="search-student"/>
                        <label className="form-check-label" htmlFor="search-student">Student</label>
                    </div>
                    <div className="form-check  form-check-inline">
                        <input className="form-check-input" type="radio"
                               value="institution" name="search-type" onChange={this.onChange}
                               id="search-institution"/>
                        <label className="form-check-label" htmlFor="search-institution">Institution</label>
                    </div>
                </fieldset>
                <div className="form-group  ">
                    <input className="form-control btn btn-primary btn-sm" type="submit" value="Search"/>
                </div>
            </form>
            </div>
        )
    }
}
export  default Search