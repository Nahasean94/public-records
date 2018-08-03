import React from 'react'
import {isEmpty} from 'lodash'
import Select from 'react-select'
import TextFieldGroup from "../../shared/TextFieldsGroup"


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

    }
    onSubmit(e) {
        e.preventDefault()
        // if (this.isValid()) {
        this.setState({errors: {}, isLoading: true})
    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value})

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
            <div className="col-sm-8 offset-sm-2">

                <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                        label="Entry number"
                        type="text"
                        name="entry_number"
                        value={this.state.entry_number}
                        onChange={this.onChange}

                    />
                    <TextFieldGroup
                        label="Car number"
                        type="text"
                        name="car_number"
                        value={this.state.car_number}
                        onChange={this.onChange}

                    />
                    <TextFieldGroup
                        label="Chassis"
                        type="text"
                        name="chassis"
                        value={this.state.chassis}
                        onChange={this.onChange}

                    />
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Make</label>
                        <div className="col-sm-9 ">
                            <Select
                                closeOnSelect={true}
                                onChange={this.onChange}
                                options={makeOptions}
                                placeholder="Search car make"
                                removeSelected={true}
                                value={this.state.social_studies}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Vehicle model</label>
                        <div className="col-sm-9 ">
                            <Select
                                closeOnSelect={true}
                                onChange={this.onChange}
                                options={modelOptions}
                                placeholder="Search vehicle model"
                                removeSelected={true}
                                value={this.state.social_studies}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Type</label>
                        <div className="col-sm-9 ">
                            <Select
                                closeOnSelect={true}
                                onChange={this.onChange}
                                options={typeOptions}
                                placeholder="Search Types"
                                removeSelected={true}
                                value={this.state.type}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Body</label>
                        <div className="col-sm-9 ">
                            <Select
                                closeOnSelect={true}
                                onChange={this.onChange}
                                options={bodyOptions}
                                placeholder="Search body type"
                                removeSelected={true}
                                value={this.state.body}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Fuel</label>
                        <div className="col-sm-9 ">
                            <Select
                                closeOnSelect={true}
                                onChange={this.onChange}
                                options={fuelOptions}
                                placeholder="Search fuel"
                                removeSelected={true}
                                value={this.state.fuel}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Year of manufacture</label>
                        <div className="col-sm-9 ">
                            <Select
                                closeOnSelect={true}
                                onChange={this.onChange}
                                options={yearOptions()}
                                placeholder="Search year"
                                removeSelected={true}
                                value={this.state.manufacture_year}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Rating</label>
                        <div className="col-sm-9 ">
                            <Select
                                closeOnSelect={true}
                                onChange={this.onChange}
                                options={ratingOptions}
                                placeholder="Search rating"
                                removeSelected={true}
                                value={this.state.rating}
                            />
                        </div>
                    </div>

                    <TextFieldGroup
                        label="Engine number"
                        type="text"
                        name="engine_number"
                        value={this.state.engine_number}
                        onChange={this.onChange}

                    />
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Color</label>
                        <div className="col-sm-9 ">
                            <Select
                                closeOnSelect={true}
                                onChange={this.onChange}
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
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Duty</label>
                        <div className="col-sm-9 ">
                            <Select
                                closeOnSelect={true}
                                onChange={this.onChange}
                                options={dutyOptions}
                                placeholder="Search duty"
                                removeSelected={true}
                                value={this.state.duty}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Passengers</label>
                        <div className="col-sm-9 ">
                            <Select
                                closeOnSelect={true}
                                onChange={this.onChange}
                                options={passengersOptions()}
                                placeholder="Search number of passengers"
                                removeSelected={true}
                                value={this.state.passengers}
                            />
                        </div>
                    </div>
                    <TextFieldGroup
                        label="Tare weight"
                        type="number"
                        name="tare_weight"
                        value={this.state.tare_weight}
                        onChange={this.onChange}

                    />
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Tax class</label>
                        <div className="col-sm-9 ">
                            <Select
                                closeOnSelect={true}
                                onChange={this.onChange}
                                options={taxOptions}
                                placeholder="Search tax class"
                                removeSelected={true}
                                value={this.state.tax_class}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Axles</label>
                        <div className="col-sm-9 ">
                            <Select
                                closeOnSelect={true}
                                onChange={this.onChange}
                                options={axleOptions}
                                placeholder="Search number or axles"
                                removeSelected={true}
                                value={this.state.rating}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Previous country of registration</label>
                        <div className="col-sm-9 ">
                            <Select
                                closeOnSelect={true}
                                onChange={this.onChange}
                                options={previousCountryOptions}
                                placeholder="Search country"
                                removeSelected={true}
                                value={this.state.previous_reg_country}
                            />
                        </div>
                    </div>
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
                    <TextFieldGroup
                        label="Postal Address"
                        type="text"
                        name="postal_address"
                        value={this.state.postal_address}
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
            </div>
        )
    }
}

export default NewLogBook