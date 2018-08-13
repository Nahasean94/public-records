import React from 'react'
import {isEmpty} from 'lodash'
import Select from 'react-select'
import TextFieldGroup from "../../shared/TextFieldsGroup"
import getWeb3 from "../../utils/getWeb3"
import PublicRecords from "../../blockchain/build/contracts/PublicRecords"
import Menu from "./Menu"
import PropTypes from "prop-types"
import Logbooks from "./Logbooks"

const contract = require('truffle-contract')


let makeOptions = [
    {
        label: "TOYOTA COROLLA",
        value: "TOYOTA COROLLA"
    },
    {
        label: "AUDI A8",
        value: "AUDI A8"
    },
    {
        label: "TOYOTA LANDCRUISER",
        value: "TOYOTA LANDCRUISER"
    },
    {
        label: "RANGE ROVER SPORT",
        value: "RANGE ROVER SPORT"
    },
    {
        label: "VOLVO XC90 EXCELLENCE",
        value: "VOLVO XC90 EXCELLENCE"
    },

]
let typeOptions = [{
    label: "Motor Vehicle",
    value: "Motor Vehicle"
},
    {
        label: "SUV",
        value: "SUV"
    },
    {
        label: "Tuk tuk",
        value: "Tuk tuk"
    },
]
let bodyOptions = [{
    label: "SALOON",
    value: "SALOON"
},
    {
        label: "SUV",
        value: "SUV"
    },
    {
        label: "SEDAN",
        value: "SEDAN"
    },
    {
        label: "CROSSOVER",
        value: "CROSSOVER"
    },
    {
        label: "STATION WAGON",
        value: "STATION WAGON"
    },
]
let modelOptions = [{
    label: "V8",
    value: "V8"
},
    {
        label: "T8 Inscription",
        value: "T8 Inscription"
    },
    {
        label: "TA-NZE124",
        value: "TA-NZE124"
    },
    {
        label: "250G",
        value: "250G"
    },
    {
        label: "3.6R",
        value: "3.6R"
    },
]
let fuelOptions = [{
    label: "Petrol",
    value: "Petrol"
},
    {
        label: "Diesel",
        value: "Diesel"
    },
]
let yearOptions = () => {
    let years = []
    for (let i = 1990; i <= 2019; i++) {
        years.push({label: i, value: i})
    }
    return years
}
let ratingOptions = [{
    label: "3600",
    value: "3600"
},
    {
        label: "2000",
        value: "2000"
    },
    {
        label: "1490",
        value: "1490"
    },
    {
        label: "5400",
        value: "5400"
    },
    {
        label: "6750",
        value: "6750"
    },
]
let colorOptions = [{
    label: "BLACK",
    value: "BLACK"
},
    {
        label: "WHITE",
        value: "WHITE"
    },
    {
        label: "GREY",
        value: "GREY"
    },
    {
        label: "BLUE",
        value: "BLUE"
    },
    {
        label: "RED",
        value: "RED"
    },
]
let dutyOptions = [{
    label: "Paid",
    value: "Paid"
},
    {
        label: "Unpaid",
        value: "Unpaid"
    },

]
let passengersOptions = () => {
    let passengers = []
    for (let i = 2; i <= 65; i++) {
        passengers.push({label: i, value: i})
    }
    return passengers
}
let taxOptions = [{
    label: "Private",
    value: "Private"
},
    {
        label: "Public",
        value: "Public"
    },

]
let previousCountryOptions = [{
    label: "Japan",
    value: "Japan"
},
    {
        label: "Germany",
        value: "Germany"
    },
    {
        label: "USA",
        value: "USA"
    },
    {
        label: "Sweden",
        value: "Sweden"
    },
    {
        label: "China",
        value: "China"
    },

]
let axleOptions = [{
    label: 1,
    value: 1
},
    {
        label: 2,
        value: 2
    },
    {
        label: 4,
        value: 4
    },
    {
        label: 6,
        value: 6
    },

]

class NewLogBook extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            entry_number: '',
            car_number: '',
            chassis: '',
            make: '',
            model: '',
            type: '',
            body: '',
            fuel: '',
            manufacture_year: '',
            rating: '',
            engine_number: '',
            color: '',
            registration_date: '',
            duty: '',
            passengers: '',
            tare_weight: '',
            tax_class: '',
            axles: '',
            previous_reg_country: '',
            previous_reg: '',
            kra_pin: '',
            full_names: '',
            postal_address: '',
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onChangeMakeOptions = this.onChangeMakeOptions.bind(this)
        this.onChangeTypeOptions = this.onChangeTypeOptions.bind(this)
        this.onChangeBodyOptions = this.onChangeBodyOptions.bind(this)
        this.onChangeModelOptions = this.onChangeModelOptions.bind(this)
        this.onChangeFuelOptions = this.onChangeFuelOptions.bind(this)
        this.onChangeYearOptions = this.onChangeYearOptions.bind(this)
        this.onChangeRatingOptions = this.onChangeRatingOptions.bind(this)
        this.onChangeColorOptions = this.onChangeColorOptions.bind(this)
        this.onChangeDutyOptions = this.onChangeDutyOptions.bind(this)
        this.onChangePassengersOptions = this.onChangePassengersOptions.bind(this)
        this.onChangeTaxOptions = this.onChangeTaxOptions.bind(this)
        this.onChangePreviousCountryOptions = this.onChangePreviousCountryOptions.bind(this)
        this.onChangeAxleOptions = this.onChangeAxleOptions.bind(this)

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

            publicRecords.deployed().then(async (instance) => {
                publicRecordsInstance = instance
                // return publicRecordsInstance.addLogbookA(this.state.entry_number, this.state.car_number, this.state.chassis, this.state.make.value, this.state.model.value, this.state.type.value, {from: coinbase})
// let car_info=[]
//                 console.log(car_info)
                return publicRecordsInstance.addLogbook(this.state.car_number, this.state.make.value, this.state.manufacture_year.value, this.state.color.value, this.state.registration_date, this.state.kra_pin, this.state.full_names, {from: coinbase})
                // return await promiseAll(
                //     publicRecordsInstance.addLogbookA(this.state.entry_number, this.state.car_number, this.state.chassis, this.state.make.value, this.state.model.value, this.state.type.value, {from: coinbase}),
                //     publicRecordsInstance.addLogbookB(this.state.car_number, this.state.body.value, this.state.fuel.value, this.state.manufacture_year.value, this.state.rating.value, this.state.engine_number, this.state.color.value, {from: coinbase}),
                //     publicRecordsInstance.addLogbookC(this.state.car_number, this.state.registration_date.value, this.state.duty.value, this.state.passengers.value, this.state.tare_weight, this.state.tax_class.value, this.state.previous_reg_country.value, {from: coinbase})
                //     , publicRecordsInstance.addLogbookOwner(this.state.car_number, this.state.kra_pin, this.state.full_names, this.state.postal_address, {from: coinbase}))
            }).then(async (result) => {
                // return await promiseAll(
                //     publicRecordsInstance.addLogbookA(this.state.entry_number, this.state.car_number, this.state.chassis, this.state.make.value, this.state.model.value, this.state.type.value, {from: coinbase}),
                //     publicRecordsInstance.addLogbookB(this.state.car_number, this.state.body.value, this.state.fuel.value, this.state.manufacture_year.value, this.state.rating.value, this.state.engine_number, this.state.color.value, {from: coinbase}),
                //     publicRecordsInstance.addLogbookC(this.state.car_number, this.state.registration_date.value, this.state.duty.value, this.state.passengers.value, this.state.tare_weight, this.state.tax_class.value, this.state.previous_reg_country.value, {from: coinbase})
                //     , publicRecordsInstance.addLogbookOwner(this.state.car_number, this.state.kra_pin, this.state.full_names, this.state.postal_address, {from: coinbase}))
            })
        })

    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})

    }

    onChangeMakeOptions(make) {
        this.setState({make})
    }

    onChangeTypeOptions(type) {
        this.setState({type})
    }

    onChangeBodyOptions(body) {
        this.setState({body})
    }

    onChangeModelOptions(model) {
        this.setState({model})
    }

    onChangeFuelOptions(fuel) {
        this.setState({fuel})
    }

    onChangeYearOptions(manufacture_year) {
        this.setState({manufacture_year})
    }

    onChangeRatingOptions(rating) {
        this.setState({rating})
    }

    onChangeColorOptions(color) {
        this.setState({color})
    }

    onChangeDutyOptions(duty) {
        this.setState({duty})
    }

    onChangePassengersOptions(passengers) {
        this.setState({passengers})
    }

    onChangeTaxOptions(tax_class) {
        this.setState({tax_class})
    }

    onChangePreviousCountryOptions(previous_reg_country) {
        this.setState({previous_reg_country})
    }

    onChangeAxleOptions(axles) {
        this.setState({axles})
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
                                {/*<TextFieldGroup*/}
                                {/*label="Entry number"*/}
                                {/*type="text"*/}
                                {/*name="entry_number"*/}
                                {/*value={this.state.entry_number}*/}
                                {/*onChange={this.onChange}*/}
                                {/*/>*/}
                                <TextFieldGroup
                                    label="Car number"
                                    type="text"
                                    name="car_number"
                                    value={this.state.car_number}
                                    onChange={this.onChange}

                                />
                                {/*<TextFieldGroup*/}
                                {/*label="Chassis"*/}
                                {/*type="text"*/}
                                {/*name="chassis"*/}
                                {/*value={this.state.chassis}*/}
                                {/*onChange={this.onChange}*/}

                                {/*/>*/}
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Make</label>
                                    <div className="col-sm-9 ">
                                        <Select
                                            closeOnSelect={true}
                                            onChange={this.onChangeMakeOptions}
                                            options={makeOptions}
                                            placeholder="Search car make"
                                            removeSelected={true}
                                            value={this.state.make}
                                        />
                                    </div>
                                </div>
                                {/*<div className="form-group row">*/}
                                {/*<label className="col-sm-3 col-form-label">Vehicle model</label>*/}
                                {/*<div className="col-sm-9 ">*/}
                                {/*<Select*/}
                                {/*closeOnSelect={true}*/}
                                {/*onChange={this.onChangeModelOptions}*/}
                                {/*options={modelOptions}*/}
                                {/*placeholder="Search vehicle model"*/}
                                {/*removeSelected={true}*/}
                                {/*value={this.state.model}*/}
                                {/*/>*/}
                                {/*</div>*/}
                                {/*</div>*/}
                                {/*<div className="form-group row">*/}
                                {/*<label className="col-sm-3 col-form-label">Type</label>*/}
                                {/*<div className="col-sm-9 ">*/}
                                {/*<Select*/}
                                {/*closeOnSelect={true}*/}
                                {/*onChange={this.onChangeTypeOptions}*/}
                                {/*options={typeOptions}*/}
                                {/*placeholder="Search Types"*/}
                                {/*removeSelected={true}*/}
                                {/*value={this.state.type}*/}
                                {/*/>*/}
                                {/*</div>*/}
                                {/*</div>*/}
                                {/*<div className="form-group row">*/}
                                {/*<label className="col-sm-3 col-form-label">Body</label>*/}
                                {/*<div className="col-sm-9 ">*/}
                                {/*<Select*/}
                                {/*closeOnSelect={true}*/}
                                {/*onChange={this.onChangeBodyOptions}*/}
                                {/*options={bodyOptions}*/}
                                {/*placeholder="Search body type"*/}
                                {/*removeSelected={true}*/}
                                {/*value={this.state.body}*/}
                                {/*/>*/}
                                {/*</div>*/}
                                {/*</div>*/}
                                {/*<div className="form-group row">*/}
                                {/*<label className="col-sm-3 col-form-label">Fuel</label>*/}
                                {/*<div className="col-sm-9 ">*/}
                                {/*<Select*/}
                                {/*closeOnSelect={true}*/}
                                {/*onChange={this.onChangeFuelOptions}*/}
                                {/*options={fuelOptions}*/}
                                {/*placeholder="Search fuel"*/}
                                {/*removeSelected={true}*/}
                                {/*value={this.state.fuel}*/}
                                {/*/>*/}
                                {/*</div>*/}
                                {/*</div>*/}
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Year of manufacture</label>
                                    <div className="col-sm-9 ">
                                        <Select
                                            closeOnSelect={true}
                                            onChange={this.onChangeYearOptions}
                                            options={yearOptions()}
                                            placeholder="Search year"
                                            removeSelected={true}
                                            value={this.state.manufacture_year}
                                        />
                                    </div>
                                </div>
                                {/*<div className="form-group row">*/}
                                {/*<label className="col-sm-3 col-form-label">Rating</label>*/}
                                {/*<div className="col-sm-9 ">*/}
                                {/*<Select*/}
                                {/*closeOnSelect={true}*/}
                                {/*onChange={this.onChangeRatingOptions}*/}
                                {/*options={ratingOptions}*/}
                                {/*placeholder="Search rating"*/}
                                {/*removeSelected={true}*/}
                                {/*value={this.state.rating}*/}
                                {/*/>*/}
                                {/*</div>*/}
                                {/*</div>*/}

                                {/*<TextFieldGroup*/}
                                {/*label="Engine number"*/}
                                {/*type="text"*/}
                                {/*name="engine_number"*/}
                                {/*value={this.state.engine_number}*/}
                                {/*onChange={this.onChange}*/}

                                {/*/>*/}
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Color</label>
                                    <div className="col-sm-9 ">
                                        <Select
                                            closeOnSelect={true}
                                            onChange={this.onChangeColorOptions}
                                            options={colorOptions}
                                            placeholder="Search color"
                                            removeSelected={true}
                                            value={this.state.color}
                                        />
                                    </div>
                                </div>
                                <TextFieldGroup
                                    label="Date of registration"
                                    type="date"
                                    name="registration_date"
                                    value={this.state.registration_date}
                                    onChange={this.onChange}
                                />
                                {/*<div className="form-group row">*/}
                                {/*<label className="col-sm-3 col-form-label">Duty</label>*/}
                                {/*<div className="col-sm-9 ">*/}
                                {/*<Select*/}
                                {/*closeOnSelect={true}*/}
                                {/*onChange={this.onChangeDutyOptions}*/}
                                {/*options={dutyOptions}*/}
                                {/*placeholder="Search duty"*/}
                                {/*removeSelected={true}*/}
                                {/*value={this.state.duty}*/}
                                {/*/>*/}
                                {/*</div>*/}
                                {/*</div>*/}
                                {/*<div className="form-group row">*/}
                                {/*<label className="col-sm-3 col-form-label">Passengers</label>*/}
                                {/*<div className="col-sm-9 ">*/}
                                {/*<Select*/}
                                {/*closeOnSelect={true}*/}
                                {/*onChange={this.onChangePassengersOptions}*/}
                                {/*options={passengersOptions()}*/}
                                {/*placeholder="Search number of passengers"*/}
                                {/*removeSelected={true}*/}
                                {/*value={this.state.passengers}*/}
                                {/*/>*/}
                                {/*</div>*/}
                                {/*</div>*/}
                                {/*<TextFieldGroup*/}
                                {/*label="Tare weight"*/}
                                {/*type="number"*/}
                                {/*name="tare_weight"*/}
                                {/*value={this.state.tare_weight}*/}
                                {/*onChange={this.onChange}*/}

                                {/*/>*/}
                                {/*<div className="form-group row">*/}
                                {/*<label className="col-sm-3 col-form-label">Tax class</label>*/}
                                {/*<div className="col-sm-9 ">*/}
                                {/*<Select*/}
                                {/*closeOnSelect={true}*/}
                                {/*onChange={this.onChangeTaxOptions}*/}
                                {/*options={taxOptions}*/}
                                {/*placeholder="Search tax class"*/}
                                {/*removeSelected={true}*/}
                                {/*value={this.state.tax_class}*/}
                                {/*/>*/}
                                {/*</div>*/}
                                {/*</div>*/}
                                {/*<div className="form-group row">*/}
                                {/*<label className="col-sm-3 col-form-label">Axles</label>*/}
                                {/*<div className="col-sm-9 ">*/}
                                {/*<Select*/}
                                {/*closeOnSelect={true}*/}
                                {/*onChange={this.onChangeAxleOptions}*/}
                                {/*options={axleOptions}*/}
                                {/*placeholder="Search number or axles"*/}
                                {/*removeSelected={true}*/}
                                {/*value={this.state.axles}*/}
                                {/*/>*/}
                                {/*</div>*/}
                                {/*</div>*/}
                                {/*<div className="form-group row">*/}
                                {/*<label className="col-sm-3 col-form-label">Previous country of registration</label>*/}
                                {/*<div className="col-sm-9 ">*/}
                                {/*<Select*/}
                                {/*closeOnSelect={true}*/}
                                {/*onChange={this.onChangePreviousCountryOptions}*/}
                                {/*options={previousCountryOptions}*/}
                                {/*placeholder="Search country"*/}
                                {/*removeSelected={true}*/}
                                {/*value={this.state.previous_reg_country}*/}
                                {/*/>*/}
                                {/*</div>*/}
                                {/*</div>*/}
                                <hr/>
                                <h4>Vehicle owner information</h4>
                                <TextFieldGroup
                                    label="KRA Pin"
                                    type="text"
                                    name="kra_pin"
                                    value={this.state.kra_pin}
                                    onChange={this.onChange}

                                />
                                <TextFieldGroup
                                    label="Full names"
                                    type="text"
                                    name="full_names"
                                    value={this.state.full_names}
                                    onChange={this.onChange}

                                />
                                {/*<TextFieldGroup*/}
                                {/*label="Postal Address"*/}
                                {/*type="text"*/}
                                {/*name="postal_address"*/}
                                {/*value={this.state.postal_address}*/}
                                {/*onChange={this.onChange}*/}

                                {/*/>*/}
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
NewLogBook.contextTypes = {
    router: PropTypes.object.isRequired
}
export default NewLogBook