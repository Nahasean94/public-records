import React from 'react'

class LogBook extends React.Component {
    render() {
        return (
            <table className="table table-hover table-borderless">
                <tbody>
                <tr>
                    <th scope="row">Car Number</th>
                    <td>{this.props.web3Instance.utils.toAscii(this.props.result[0])}</td>
                </tr>
                <th scope="row">Make</th>
                <tr>
                    <td>{this.props.web3Instance.utils.toAscii(this.props.result[1])}</td>
                </tr>
                <tr>
                    <th scope="row">Year of manufacturer</th>
                    <td>{this.props.web3Instance.utils.toAscii(this.props.result[2])}</td>
                </tr>
                <tr>
                    <th scope="row">Color</th>
                    <td>{this.props.web3Instance.utils.toAscii(this.props.result[3])}</td>
                </tr>
                <tr>
                    <th scope="row">Date of registration</th>
                    <td>{this.props.web3Instance.utils.toAscii(this.props.result[4])}</td>
                </tr>
                <hr/>
                <h2>Vehicle owner</h2>
                <tr>
                    <th scope="row">Full names</th>
                    <td>{this.props.web3Instance.utils.toAscii(this.props.result[6])}</td>
                </tr>

                <tr>
                    <th scope="row">KRA Pin</th>
                    <td>{this.props.web3Instance.utils.toAscii(this.props.result[5])}</td>
                </tr>
                </tbody>
            </table>
        )
    }
}

export default LogBook