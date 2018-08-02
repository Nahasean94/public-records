import React, {Component} from 'react'


class InstitutionResults extends Component {

    render() {

        return <table className="table table-sm table-hover table-borderless">
            <tbody>
            <tr>
                <th scope="row">Name</th>
                <td>{this.props.web3Instance.utils.toAscii(this.props.result[1]).toString()}</td>
            </tr>
            <tr>
                <th scope="row">County</th>
                <td>{this.props.web3Instance.utils.toAscii(this.props.result[3])}</td>

            </tr>
            <tr>
                <th scope="row">Date Founded</th>
                <td>{this.props.web3Instance.utils.toAscii(this.props.result[2])}</td>

            </tr>
            <tr>
                <th scope="row">Category</th>
                <td>{this.props.web3Instance.utils.toAscii(this.props.result[4])}</td>

            </tr>
            <tr>
                <th scope="row">UPI</th>
                <td>{this.props.web3Instance.utils.toAscii(this.props.result[5])}</td>
            </tr>
            </tbody>
        </table>
    }
}

export default InstitutionResults

