import React, {Component} from 'react'
import InstitutionResults from "./search_results/InstitutionResults"
import SecondarySchoolResults from "./search_results/SecondarySchoolResults"
import UndergraduateResults from "./search_results/UndergraduateResults"
import PublicRecords from '../../build/contracts/PublicRecords.json'
import getWeb3 from '../utils/getWeb3'

const contract = require('truffle-contract')

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            searchType: '',
            web3: null
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

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

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    searchStudent(upi) {

    }

    searchInstitution(upi) {

        const publicRecords = contract(PublicRecords)
        publicRecords.setProvider(this.state.web3.currentProvider)

        // Declaring this for later so we can chain functions on SimpleStorage.
        let publicRecordsInstance

        // Get accounts.
        this.state.web3.eth.getCoinbase((error, coinbase) => {

            publicRecords.deployed().then((instance) => {
                publicRecordsInstance = instance
                return publicRecordsInstance.getInstitution(upi, {from: coinbase})
            }).then((result) => {
                console.log(this.state.web3.utils.toAscii(result[1]))
                console.log(this.state.web3.utils.toAscii(result[2]))
                console.log(this.state.web3.utils.toAscii(result[3]))
                console.log(this.state.web3.utils.toAscii(result[4]))
            })
        })
    }

    searchId(upi) {

    }

    searchCar(upi) {

    }

    searchLand(upi) {

    }

    onSubmit(e) {
        e.preventDefault()
        const {search, searchType} = this.state
        if (search) {
            if (searchType === 'student') {
                this.searchStudent(search)
            }
            else if (searchType === 'institution') {
                this.searchInstitution(search)
            }
            else if (searchType === 'id') {
                this.searchId(search)
            }
            else if (searchType === 'car') {
                this.searchCar(search)
            }
            else if (searchType === 'land') {
                this.searchLand(search)
            }
        }
    }

    render() {
        return (
            <div className="container">
                <h1>PUBLIC RECORDS</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="input-group">
                        <input type="text" className="form-control form-control-sm"
                               placeholder="Search"
                               aria-label="Search" aria-describedby="basic-addon1"
                               onChange={this.onChange} name="search"/>

                    </div>
                    <fieldset className="form-group ">
                        <div className="form-check">
                            <input className="form-check-input" type="radio"
                                   value="student" name="searchType" onChange={this.onChange} id="searchStudent"/>
                            <label className="form-check-label" htmlFor="searchStudent">Student</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio"
                                   value="institution" name="searchType" onChange={this.onChange}
                                   id="searchInstitution"/>
                            <label className="form-check-label" htmlFor="searchInstitution">Institution</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio"
                                   value="id" name="searchType" onChange={this.onChange}
                                   id="searchId"/>
                            <label className="form-check-label" htmlFor="searchId">National ID (will display non
                                academic records)</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio"
                                   value="id" name="searchType" onChange={this.onChange}
                                   id="searchCar"/>
                            <label className="form-check-label" htmlFor="searchCar">Car number plate (will display log
                                book of the car)</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio"
                                   value="id" name="searchType" onChange={this.onChange}
                                   id="searchLand"/>
                            <label className="form-check-label" htmlFor="searchLand">Plot number (will display title
                                deed of the plot/land)</label>
                        </div>
                    </fieldset>
                    <div className="form-group  ">
                        <input className="form-control btn btn-primary btn-sm col-sm-2" type="submit" value="Search"/>
                    </div>
                </form>
                <div className="row">
                    <div className="col-sm-4 card">
                        <InstitutionResults/>
                    </div>
                    <div className="col-sm-1"></div>
                    {/*<div className="col-sm-4 card">*/}
                    {/*<ECDEResults/>*/}
                    {/*</div>*/}
                    {/*<div className="col-sm-4 card">*/}
                    {/*<PrimarySchoolResults/>*/}
                    {/*</div>*/}
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