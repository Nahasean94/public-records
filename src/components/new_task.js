import React, {Component} from "react"
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {addTodo, saveTodo} from "../actions/todoActions"
import Todo from '../../build/contracts/Todo.json'
import getWeb3 from '../utils/getWeb3'

const contract = require('truffle-contract')

class NewTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todo: '',
            web3: null
        }
        this.onNewTask = this.onNewTask.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    componentWillMount() {
        // Get network provider and web3 instance.
        // See utils/getWeb3 for more info.

        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
                })

                // Instantiate contract once web3 provided.

            })
            .catch(() => {
                console.log('Error finding web3.')
            })
    }

    onNewTask(e) {
        e.preventDefault()
        const todoObject = contract(Todo)
        todoObject.setProvider(this.state.web3.currentProvider)

        // Declaring this for later so we can chain functions on SimpleStorage.
        var todoInstance

        // Get accounts.
        this.state.web3.eth.getCoinbase((error, coinbase) => {
            todoObject.deployed().then((instance) => {
                todoInstance = instance
                return todoInstance.addTodo(this.state.todo,{from:coinbase})
            }).then((result) => {
                console.log(result)
                this.setState({todo: ''})
                  this.props.addTodo(result.logs[0].args.todoItem)
            })
        })
    }


    onChange(e) {
        this.setState({todo: e.target.value})
    }

    // onNewTask(e) {
    //     e.preventDefault()
    //     this.props.saveTodo(this.state.todo)
    //     this.setState({todo: ''})
    //
    // }

    render() {
        const {todo} = this.state
        return (
            <form onSubmit={this.onNewTask}>
                <div className="form-group">
                    <input type="text" className="form-control form-control-sm " onChange={this.onChange} value={todo}/>
                </div>
                <div className="form-group">
                    <input type="submit" className="form-control form-control-sm btn btn-primary btn-sm"/>
                </div>
            </form>
        )
    }
}

NewTask.propTypes = {
    addTodo: PropTypes.func.isRequired,
    saveTodo: PropTypes.func.isRequired
}
export default connect(null, {addTodo, saveTodo})(NewTask)


// import React, { Component } from 'react'
// import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
// import getWeb3 from './utils/getWeb3'
//
// import './css/oswald.css'
// import './css/open-sans.css'
// import './css/pure-min.css'
// import './App.css'
//
// class App extends Component {
//   constructor(props) {
//     super(props)
//
//     this.state = {
//       storageValue: 0,
//       web3: null
//     }
//   }
//
//
//   render() {
//     return (
//       <div className="App">
//         <nav className="navbar pure-menu pure-menu-horizontal">
//             <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
//         </nav>
//
//         <main className="container">
//           <div className="pure-g">
//             <div className="pure-u-1-1">
//               <h1>Good to Go!</h1>
//               <p>Your Truffle Box is installed and ready.</p>
//               <h2>Smart Contract Example</h2>
//               <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
//               <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
//               <p>The stored value is: {this.state.storageValue}</p>
//             </div>
//           </div>
//         </main>
//       </div>
//     );
//   }
// }
//
// export default App
