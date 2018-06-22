import React, {Component} from 'react'


class ECDEResults extends Component {

    render() {
        return <table className="table table-sm table-hover table-borderless">
            <thead>
            <tr>
                <th scope="col">Subject</th>
                <th scope="col">Score</th>
                <th scope="col">Grade</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td> English</td>
                <td>80</td>
                <td>A</td>
            </tr>
            <tr>
                <td> Kiswahili</td>
                <td>87</td>
                <td>A</td>
            </tr>
            <tr>
                <td> Math</td>
                <td>90</td>
                <td>A</td>
            </tr>
            </tbody>
        </table>
    }
}

export default ECDEResults
