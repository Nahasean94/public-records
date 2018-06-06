import React, { Component } from "react";
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addTodo} from "../actions/todoActions"
class IncompleteList extends Component {
  render() {
    return (
      <ol className="list-group">
          {this.props.todos.map((todo,key)=>{
              console.log(todo)
              return  <li key={key} className="list-group-item d-flex justify-content-between align-items-center">
                  {todo}
                  <span>
            <button className="btn btn-sm btn-danger">
              <i className="fa fa-trash" />
            </button>
          </span>
              </li>
          })}

      </ol>
    );
  }
}
IncompleteList.propTypes={
    todos:PropTypes.array.isRequired,
}
function maptStateToProps(state) {
    return{ todos:state.todoReducers}
}
export default connect(maptStateToProps,{addTodo})(IncompleteList)
