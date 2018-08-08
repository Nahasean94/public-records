import React, {Component} from 'react'
import PublicRecords from '../blockchain/build/contracts/PublicRecords.json'
import getWeb3 from '../utils/getWeb3'
import promisesAll from 'promise-all'

const contract = require('truffle-contract')

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            searchType: '',
            web3: null,
            institutionResult: [],
            studentResult: [],
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

        const publicRecords = contract(PublicRecords)
        publicRecords.setProvider(this.state.web3.currentProvider)

        // Declaring this for later so we can chain functions on SimpleStorage.
        let publicRecordsInstance

        // Get accounts.
        this.state.web3.eth.getCoinbase((error, coinbase) => {

            let results = []
            publicRecords.deployed().then(async (instance) => {
                publicRecordsInstance = instance
                return await promisesAll(
                    await publicRecordsInstance.getSecondarySchoolInfo(upi, {from: coinbase}).then(result => results = [...result]),
                    await publicRecordsInstance.getHumanitites(upi, {from: coinbase}).then(result => results = [...results, ...result]),
                    await publicRecordsInstance.getCoreSubjects(upi, {from: coinbase}).then(result => results = [...results, ...result]),
                    await publicRecordsInstance.getSciences(upi, {from: coinbase}).then(result => results = [...results, ...result]),
                    await publicRecordsInstance.getElectives(upi, {from: coinbase}).then(result => results = [...results, ...result]))


                // return await promisesAll(await publicRecordsInstance.getPrimarySchoolInfo(upi, {from: coinbase}).then(result=>results=[...result]),await publicRecordsInstance.getPrimarySchoolSubjects(upi, {from: coinbase}).then(result=>results=[...results,...result] ))
            }).then(() => {
                console.log(results)
                this.setState({studentResult: results})
            })

        })
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

                this.setState({institutionResult: result})
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
        const {institutionResult, web3, studentResult} = this.state
        return (
            <div className="container">
                <form onSubmit={this.onSubmit}>
                    <div className="input-group well">
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
                        <input className="form-control btn btn-info btn-sm col-sm-2" type="submit" value="Search"/>
                    </div>
                </form>
                <div className="row">
                    {/*{institutionResult && institutionResult.length > 0 && <div className="col-sm-4 card">*/}
                    {/*<InstitutionResults result={institutionResult} web3Instance={web3}/></div>}*/}

                    <div className="col-sm-1"></div>

                    {/*{studentResult && studentResult.length>0 && <div className="col-sm-4 card"> <ECDEResults  result={studentResult} web3Instance={web3}/> </div>}*/}


                    {/*{studentResult && studentResult.length>0&&  <div className="col-sm-4 card">*/}
                    {/*<PrimarySchoolResults result={studentResult} web3Instance={web3}/>*/}
                    {/*</div>}*/}
                    {/*{studentResult && studentResult.length > 0 && <div className="col-sm-4 card">*/}
                    {/*<SecondarySchoolResults result={studentResult} web3Instance={web3}/>*/}
                    {/*</div>}*/}
                    {/*<div className="col-sm-4 card">*/}
                    {/*<SecondarySchoolResults/>*/}
                    {/*</div>*/}
                    {/*<div className="col-sm-4 card">*/}
                    {/*<UndergraduateResults/>*/}
                    {/*</div>*/}
                </div>
            </div>
        )
    }
}

export default Search