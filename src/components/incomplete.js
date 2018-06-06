import React, { Component } from "react";
import IncompleteList from "./incomplete_list";

class Incomplete extends Component {
  render() {
    return (
      <div className="col-sm-6">
        <IncompleteList />
      </div>
    );
  }
}

export default Incomplete;
