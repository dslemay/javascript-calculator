import React from 'react';
import PropTypes from 'prop-types';

import '../style/NumKey.css'

class NumKey extends React.Component {
  render() {
    return (
      <div className="numKey" onClick={() => this.props.addNum(this.props.value)}>
        {this.props.value}
      </div>
    )
  }
}

NumKey.propTypes = {
  addNum: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

export default NumKey;
