import React from 'react';
import PropTypes from 'prop-types';

import '../style/MathKey.css';

class MathKey extends React.Component {
  render() {
    return (
      <div id={this.props.value} className="mathKey" onClick={() => this.props.operations(this.props.value)}>
        {this.props.value}
      </div>
    )
  }
}

MathKey.propTypes = {
  operations: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

export default MathKey;
