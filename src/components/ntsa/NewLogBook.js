import React from 'react'
import {isEmpty} from 'lodash'

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
let taxOptions=[{
    label: "Private",
    value: "Private"
},
    {
        label: "Public",
        value: "Public"
    },

]
let previousCountryOptions=[{
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
                        label="Full names"
                        type="text"
                        name="names"
                        value={this.state.names}
                        onChange={this.onChange}
                    />
                    <TextFieldGroup
                        label="Date of birth"
                        type="number"
                        name="dob"
                        value={this.state.dob}
                        onChange={this.onChange}
                    />
                    <TextFieldGroup
                        label="Vehicle Classes Licensed"
                        type="text"
                        name="vehicle_classes"
                        value={this.state.vehicle_classes}
                        onChange={this.onChange}
                    />
                    <TextFieldGroup
                        label="Postal Address"
                        type="text"
                        name="postal_address"
                        value={this.state.postal_address}
                        onChange={this.onChange}
                    />
                    <TextFieldGroup
                        label="Date issued"
                        type="date"
                        name="date"
                        value={this.state.date}
                        onChange={this.onChange}
                    />
                    <TextFieldGroup
                        label="Date of expiry"
                        type="text"
                        name="expiry"
                        value={this.state.expiry}
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