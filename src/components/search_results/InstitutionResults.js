import React, {Component} from 'react'


class InstitutionResults extends Component {

    render() {
        return <table className="table table-sm table-hover table-borderless">

            <tbody>
            <tr>
                <th scope="row">Name</th>
                <td> Moi University</td>
            </tr>
            <tr>
                <th scope="row">County</th>
                <td>Uasin Gishu</td>

            </tr>
            <tr>
                <th scope="row">Date Founded</th>
                <td>1984</td>

            </tr>
            <tr>
                <th scope="row">Category</th>
                <td>Tertiary</td>

            </tr>
            <tr>
                <th scope="row">UPI</th>
                <td>ASDF</td>
            </tr>
            </tbody>
        </table>
    }
}

export default InstitutionResults

