import React from 'react';
import '../style/App.css';
import Key from './Key';
import Display from './Display';

import { operation } from '../helpers';
import { percentageToDecimal } from '../helpers';

class App extends React.Component {
  constructor() {
    super();
    this.addNum = this.addNum.bind(this);
    this.operations = this.operations.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);

    // Set initial state

    this.state = {
      prevVal: null,
      currVal: null,
      display: "0",
      operator: null
    }
  }

  clearDisplay() {
    var states = {...this.state};
    if (this.state.display !== "0") {
      states.display = states.currVal = "0";
    }
    if (this.state.display === "0") {
      states = {
        prevVal: null,
        currVal: null,
        display: "0",
        operator: null
      }
    }
    var activeOperator = document.querySelector('div.active');
    if (this.state.operator !== null && activeOperator !== null) {activeOperator.classList.remove('active')};
    this.setState({...states});
  }

  addNum(number) {
    // Tests for initial operations or immediately after pressing operator
    var values = {
      currVal: this.state.currVal,
      display: this.state.display
    };
    if (number === "\u00B1") { // This code block addresses changing the state when the plus/minus key is selected.
      if (this.state.currVal !== null && this.state.currVal.slice(0,1) === "-") {
        values.currVal = values.display = this.state.currVal.slice(1);
      }
      if (this.state.currVal !== null && this.state.currVal.slice(0,1) !== "-") {
        values.currVal = values.display = "-" + this.state.currVal;
      }
    } else { // This code block addresses actual numbers and the decimal point excluding the plus/minus key
      if (this.state.currVal === null || this.state.currVal === "0") {
        values.currVal = values.display = number;
      } else {
        values.currVal = values.display = values.currVal.concat(number);
      }
    }
  this.setState({...values});
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
      if (operator !== "%") { // Percentage performs different types of operations and stores states differently.
        states.operator = operator;
        states.prevVal = this.state.currVal;
        states.currVal = null;
      } else {
        states.prevVal = states.display = percentageToDecimal(this.state.currVal);
        states.currVal = null;
      }
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
      switch (operator) {
        case "%":
          result = operation(this.state.prevVal, operator, this.state.currVal);
          states = {
            currVal: result,
            display: result
          };
          break;
        case "=":
          result = operation(this.state.prevVal, this.state.operator, this.state.currVal);
          states = {
            operator: null,
            currVal: null,
            display: result,
            prevVal: null
          };
          break;
        default:
          document.getElementById(operator).classList.add('active');
          result = operation(this.state.prevVal, this.state.operator, this.state.currVal);
          states = {
            operator: operator,
            currVal: null,
            display: result,
            prevVal: result
          };
          break;
      }
      this.setState({...states});
    }
  } // End operations method


  render() {
    var keys = [
      {type: "clear", value: "clear"},
      {type: "number", value: "\u00B1"},
      {type: "math", value: "%"},
      {type: "math", value: "\u00D7"},
      {type: "number", value: "7"},
      {type: "number", value: "8"},
      {type: "number", value: "9"},
      {type: "math", value: "\u00F7"},
      {type: "number", value: "4"},
      {type: "number", value: "5"},
      {type: "number", value: "6"},
      {type: "math", value: "-"},
      {type: "number", value: "1"},
      {type: "number", value: "2"},
      {type: "number", value: "3"},
      {type: "math", value: "+"},
      {type: "number", value: "0"},
      {type: "number", value: "."},
      {type: "math", value: "="},
    ]

    return (
      <div>
        <Display display={this.state.display} />
        <div className="calculator-buttons">
          {keys.map(key =>
            <Key
              key={key.value}
              type={key.type}
              value={key.value}
              addNum={this.addNum}
              operations={this.operations}
              clearDisplay={this.clearDisplay}
              display={this.state.display}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
