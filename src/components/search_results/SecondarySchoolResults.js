import React, {Component} from 'react'

class SecondarySchoolResults extends Component {

    render() {
        return <div>
            <ul className="list-unstyled">
                <li><strong>Student
                    UPI: </strong>&nbsp;{this.props.web3Instance.utils.toAscii(this.props.result[1]).toString()}</li>
                <li><strong>Date awarded: </strong>&nbsp;{this.props.web3Instance.utils.toAscii(this.props.result[2]).toString()}</li>
                <li><strong>Institution
                    UPI: </strong>&nbsp;{this.props.web3Instance.utils.toAscii(this.props.result[3]).toString()}</li>
            </ul>
            <table className="table table-sm table-hover table-borderless">
                <thead>
                <tr>
                    <th scope="col">Subject</th>
                    <th scope="col">Score</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td scope="row"> English</td>
                    <td>{this.props.result[4].c[0]}</td>
                </tr>
                <tr>
                    <td scope="row">Kishwahili</td>
                    <td>{this.props.result[5].c[0]}</td>
                </tr>
                <tr>
                    <td scope="row">Math</td>
                    <td>{this.props.result[6].c[0]}</td>
                </tr>
                <tr>
                    <td scope="row">Science</td>
                    <td>{this.props.result[7].c[0]}</td>
                </tr>
                <tr>
                    <td scope="row">Social Studies & Religion</td>
                    <td>{this.props.result[8].c[0]}</td>
                </tr>
                </tbody>
            </table>
        </div>
    }
}

export default SecondarySchoolResults
