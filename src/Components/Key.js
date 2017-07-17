import React from 'react';
import PropTypes from 'prop-types';

import '../style/Key.css'

class NumKey extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.value !== "clear" ? false : true;
  }

  render() {
    var keyVal;
    var processFunc;

    // Dynamically updates clear button
    if (this.props.value !== "clear") {
      keyVal = this.props.value;
    } else {
      keyVal = this.props.display === "0" ? "AC" : "C";
    }

    // Sets onClick function for button types (clear, number, math)
    switch (this.props.type) {
      case "number":
        processFunc = () => this.props.addNum(this.props.value);
        break;
      case "clear":
        processFunc = () => this.props.clearDisplay();
        break;
      case "math":
        processFunc = () => this.props.operations(this.props.value);
        break;
    }

    // var processFunc = this.props.value !== "clear" ? () => this.props.addNum(this.props.value) : () => this.props.clearDisplay();
    return (
      <div id={"btn-" + this.props.value} className="numKey" onClick={processFunc}>
        {keyVal}
      </div>
    )
  }
}

NumKey.propTypes = {
  addNum: PropTypes.func.isRequired,
  operations: PropTypes.func.isRequired,
  clearDisplay: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  display: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

export default NumKey;
