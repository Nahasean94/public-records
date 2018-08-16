import React from 'react'

class DrivingLicense extends React.Component {
    render() {
        return (
            <table className="table table-hover table-borderless">
                <tbody>
                    <tr>
                        <th scope="row">Full names</th>
                        <td>{this.props.web3Instance.utils.toAscii(this.props.result[6])}</td>
                    </tr>
                    <tr>
                        <th scope="row">National ID</th>
                        <td>{this.props.result[3].c[0]}</td>
                    </tr>
                    <tr>
                        <th scope="row">Date of birth</th>
                        <td>{this.props.web3Instance.utils.toAscii(this.props.result[4])}</td>
                    </tr>
                    <tr>
                        <th scope="row">Postal address</th>
                        <td>{this.props.web3Instance.utils.toAscii(this.props.result[5])}</td>
                    </tr>
                    <tr>
                        <th scope="row">Date of issue</th>
                        <td>{this.props.web3Instance.utils.toAscii(this.props.result[1])}</td>
                    </tr>

                    <tr>
                        <th scope="row">Vehicle classes licensed</th>
                        <td>
                            <ol>
                                <li>{this.props.web3Instance.utils.toAscii(this.props.result[0][0])}</li>
                                <li>{this.props.web3Instance.utils.toAscii(this.props.result[0][1])}</li>
                            </ol>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Expiry Date</th>
                        <td>{this.props.web3Instance.utils.toAscii(this.props.result[2])}</td>
                    </tr>
                </tbody>
            </table>
    )
    }
    }

    export default DrivingLicense