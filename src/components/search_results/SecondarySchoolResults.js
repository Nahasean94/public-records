import React, {Component} from 'react'


class SecondarySchoolResults extends Component {

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
            <tr>
                <td> Chemistry</td>
                <td>80</td>
                <td>A</td>
            </tr>
            <tr>
                <td> Biology</td>
                <td>70</td>
                <td>A-</td>
            </tr>
            <tr>
                <td> Physics</td>
                <td>60</td>
                <td>b</td>
            </tr>
            <tr>
                <td>Business</td>
                <td>73</td>
                <td>A-</td>
            </tr>
            <tr>
                <td> Geography</td>
                <td>80</td>
                <td>A</td>
            </tr>
            <tr>
                <td> History</td>
                <td>80</td>
                <td>A</td>
            </tr>
            <tr>
                <td> Religion</td>
                <td>40</td>
                <td>C</td>
            </tr>
            </tbody>
        </table>
    }
}

export default SecondarySchoolResults
