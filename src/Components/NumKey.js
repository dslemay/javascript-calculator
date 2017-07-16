import React from 'react';
import PropTypes from 'prop-types';

import '../style/NumKey.css'

class NumKey extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.value !== "clear" ? false : true;
  }

  render() {
    var keyVal;

    if (this.props.value !== "clear") {
      keyVal = this.props.value;
    } else {
      keyVal = this.props.display === "0" ? "AC" : "C";
    }

    var processFunc = this.props.value !== "clear" ? () => this.props.addNum(this.props.value) : () => this.props.clearDisplay();
    return (
      <div className="numKey" onClick={processFunc}>
        {keyVal}
      </div>
    )
  }
}

NumKey.propTypes = {
  addNum: PropTypes.func.isRequired,
  clearDisplay: PropTypes.func.isRequired,
  display: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

export default NumKey;
