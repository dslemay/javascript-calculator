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
        processFunc = () => {
          this.props.addNum(this.props.value);
          let keyDiv = document.getElementById('btn-' + this.props.value).classList;
          keyDiv.add('active');
          setTimeout(() => keyDiv.remove('active'), 300);
        }
        break;
      case "clear":
        processFunc = () => {
          this.props.clearDisplay();
          let keyDiv = document.getElementById('btn-' + this.props.value).classList;
          keyDiv.add('active');
          setTimeout(() => keyDiv.remove('active'), 300);
        }
        break;
      case "math":
        processFunc = () => {
          this.props.operations(this.props.value);
          if (this.props.value === "%" || this.props.value === "=") {
            let keyDiv = document.getElementById('btn-' + this.props.value).classList;
            keyDiv.add('active');
            setTimeout(() => keyDiv.remove('active'), 300);
          }
        }
        break;
      default:
        throw new Error(this.props.type + " is not valid for processing onClick function of the component");
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
