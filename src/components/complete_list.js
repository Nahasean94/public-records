import React, { Component } from "react";
class CompleteList extends Component {
  render() {
    return (
      <ol className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Code
          <span>
            <button className="btn btn-sm btn-danger">
              <i className="fa fa-trash" />
            </button>
          </span>
        </li>
      </ol>
    );
  }
}

export default CompleteList;
