import React from 'react'
import {isEmpty} from 'lodash'
// import {addLocation, isLocationExists} from "../../../shared/queries"
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap"
import {Consumer} from 'graphql-react'
import KCSE from "./KCSE"
import KCPE from "./KCPE"


class NewRecord extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            exam: '',
        }
        this.onExamChange = this.onExamChange.bind(this)
        // this.onSubmit = this.onSubmit.bind(this)
        // this.checkLocationExists = this.checkLocationExists.bind(this)
    }

onExamChange(e){
        this.setState({exam:e.target.value})
}


    render() {
        const {show, onClose} = this.props

        const {errors, loading, message, isLoading, invalid} = this.state
        if (show) {
            if (loading) {
                return <p>Adding a new record</p>
            }
            return (
                <Modal isOpen={show} toggle={onClose} size="lg" className="modal-dialog modal-dialog-centered">
                    <ModalHeader toggle={onClose}>Add a new record</ModalHeader>
                    <ModalBody>
                        {message ? <div>
                            {message}
                        </div> : ""}
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label" htmlFor="exam">Exam</label>
                            <div className="col-sm-9">
                                <select className="form-control form-control-sm" id="exam" name="exam"
                                        required="true" value={this.state.exam} onChange={this.onExamChange}>
                                    <option>Select</option>
                                    <option value="kcpe">KCPE</option>
                                    <option value="kcse">KCSE</option>
                                </select>
                            </div>
                        </div>
                        {this.state.exam==='kcse' && <Consumer>{graphql=><KCSE graphql={graphql}/>}</Consumer>}
                        {this.state.exam==='kcpe' && <Consumer>{graphql=><KCPE graphql={graphql}/>}</Consumer>}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={onClose}>Cancel</Button>{' '}
                    </ModalFooter>
                </Modal>
            )
        }
        else return null
    }

}

export default ({show,onClose}) => <Consumer>{graphql => <NewRecord show={show} onClose={onClose} graphql={graphql}/>}</Consumer>