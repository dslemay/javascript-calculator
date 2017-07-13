import React from 'react';
import PropTypes from 'prop-types';
import '../style/Display.css';

class Display extends React.Component {
  render() {
    return (
      <div className="display-field">
        {this.props.display}
      </div>
    )
  }
}

Display.propTypes = {
  display: PropTypes.string.isRequired
}

export default Display;
