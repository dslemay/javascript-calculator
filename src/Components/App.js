import React from 'react';
import '../style/App.css';
import NumKey from './NumKey';
import Display from './Display';
import MathKey from './MathKey';

import { operation } from '../helpers';

class App extends React.Component {
  constructor() {
    super();
    this.addNum = this.addNum.bind(this);
    this.operations = this.operations.bind(this);

    // Set initial started

    this.state = {
      prevVal: null,
      currVal: "0",
      display: "0",
      operator: null
    }
  }

  addNum(number) {
    // Tests for initial operations or immediately after pressing operator
    var values = {
      currVal: this.state.currVal,
      display: this.state.display
    };
    if (this.state.currVal === null || this.state.currVal === "0") {
      values.currVal = values.display = number;
      this.setState({...values});
    } else { // Concatenate number pressed onto current display
      values.currVal = values.display = values.currVal.concat(number);
      this.setState({...values});
    }
  // Test if there is an active MathKey. If so, remove active class.
  var activeOperator = document.querySelector('div.active');
  if (activeOperator !== null) {activeOperator.classList.remove('active')};
  }

  operations(operator) {
    var states = {...this.state};
    // Tests for first operation of a chain.
    if (this.state.prevVal === null) {
      if (operator !== "=") {
        document.getElementById(operator).classList.add('active'); // Equals sign is excluded from active class
      }
      states.operator = operator;
      states.prevVal = this.state.currVal;
      states.currVal = null;
      this.setState({...states});
    }

    // Checks if no numbers have been clicked since last call of operations method to change operator used.
    if (this.state.currVal === null) {
      var el = document.getElementById(this.state.operator);
      if (el !== null) {
        el.classList.remove('active');
      }
      document.getElementById(operator).classList.add('active');
      this.setState({operator: operator});
    }

    // Perform operations
    var result;
    if (this.state.prevVal && this.state.currVal !== null) {
      if(operator !== "=") { // Process all operations
        document.getElementById(operator).classList.add('active');
        result = operation(this.state.prevVal, this.state.operator, this.state.currVal);
        states = {
          operator: operator,
          currVal: null,
          display: result,
          prevVal: result
        }
        this.setState({...states});
      } else { // Process final operations when equals is pressed
        result = operation(this.state.prevVal, this.state.operator, this.state.currVal);
        states = {
          operator: null,
          currVal: null,
          display: result,
          prevVal: null
        }
        this.setState({...states});
      }
    }

  }

  render() {
    var numKeys = [7,8,9,4,5,6,1,2,3];
    var mathKeys = ["\u00F7", "\u00D7", "-", "+", "="];

    return (
      <div>
        <Display display={this.state.display} />
        {numKeys.map(key => <NumKey key={key} value={key.toString()} addNum={this.addNum} />)}
        {mathKeys.map(key => <MathKey key={key} value={key} operations={this.operations}/>)}

      </div>
    );
  }
}

export default App;
