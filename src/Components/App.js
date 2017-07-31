import React from 'react';
import '../style/App.css';
import Key from './Key';
import Display from './Display';

import { operation } from '../helpers';
import { percentageToDecimal } from '../helpers';
import { scientificNotation } from '../helpers';

class App extends React.Component {
  constructor() {
    super();
    this.addNum = this.addNum.bind(this);
    this.operations = this.operations.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);

    // Set initial state

    this.state = {
      prevVal: null,
      currVal: null,
      display: "0",
      operator: null
    }
  }

  componentDidMount() {
    window.addEventListener('keypress', this.handleKeypress);
    window.addEventListener('keydown', this.handleKeydown);
  }

  clearDisplay() { // This method is called when the C/AC button is clicked.
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
    this.setState({...states});
    var activeOperator = document.querySelector('div.active');
    if (this.state.operator !== null) {
      document.getElementById("btn-" + this.state.operator).classList.add('active');
    }
    if (states.operator === null && activeOperator !== null) {activeOperator.classList.remove('active')};
  }

  addNum(number) {
    // Tests for initial operations or immediately after pressing operator
    var values = {
      currVal: this.state.currVal,
      display: this.state.display,
      prevVal: this.state.prevVal
    };
    if (number === "\u00B1") { // This code block addresses changing the state when the plus/minus key is selected.
      if (this.state.currVal !==null) { // Update display if currently manipulating currVal state.
        if (this.state.currVal.slice(0,1) === "-") {
          values.currVal = values.display = this.state.currVal.slice(1);
        } else {
          values.currVal = values.display = "-" + this.state.currVal;
        }
      } else { // Update display if currently manipulating prevVal state (ie after using equals operation)
        if (this.state.prevVal !== null && this.state.display === this.state.prevVal) {
          if (this.state.prevVal.slice(0,1) === "-") {
            values.prevVal = values.display = this.state.prevVal.slice(1);
          } else {
            values.prevVal = values.display = "-" + this.state.prevVal;
          }
        }
      }
    } else { // This code block addresses actual numbers and the decimal point excluding the plus/minus key
      if (this.state.currVal === null || this.state.currVal === "0") {
        values.currVal = values.display = number;
      } else if (this.state.currVal.length < 16) { // Keeps the user from overflowing the display
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
      if (operator !== "=" && operator !== "%") {
        document.getElementById("btn-" + operator).classList.add('active'); // Equals sign is excluded from active class
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
      var el = document.getElementById("btn-" + this.state.operator);
      if (el !== null) {
        el.classList.remove('active');
      }
      if (operator !== "=" && operator !== "%") {
        document.getElementById("btn-" + operator).classList.add('active');
      }
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
            prevVal: result
          };
          let activeOperator = document.getElementById("btn-" + this.state.operator);
          if (activeOperator !== null) {
            activeOperator.classList.remove('active');
          }
          break;
        default:
          document.getElementById("btn-" + operator).classList.add('active');
          result = operation(this.state.prevVal, this.state.operator, this.state.currVal);
          states = {
            operator: operator,
            currVal: null,
            display: result,
            prevVal: result
          };
          break;
      }
      if (states.display.search(/\+/g) > 0) { // Removes '+' symbol from default JS scientific notation
        states.display = states.display.replace(/\+/g, '');
      }
      if (states.display.length > 16) { // Converts display State to Scientific notation if result is more than 16 numbers long.
        var resultLength = states.display.length,
        trailingZeros,
        trailingZeroCount = 0,
        exponents = 0,
        scientificNotations = 0;
        if (states.display.match(/e/g)) { // Matches existing Scientific Notations in display
          scientificNotations = Number(states.display.match(/[0-9]+$/g)[0]);
          states.display = states.display.match(/^[0-9.]+/g)[0];
        } else {
          trailingZeros = states.display.match(/0+$/g);
          trailingZeroCount = trailingZeros === null ? 0 : trailingZeros[0].length;
        }
        exponents = trailingZeroCount + scientificNotations;
        if (trailingZeros !== null) { // Scientific notation for number ending in zero(s).
          states.display = scientificNotation(states.display.slice(0, resultLength - trailingZeroCount), exponents);
        } else { // Scientific notation for number not neding in a zero.
          states.display = scientificNotation(states.display, exponents);
        }
      }
      this.setState({...states});
    } // End complete calculations conditional
  } // End operations method

  handleKeypress(e) {
    console.log(e.which);
    var mathOptions = [37,45,43,61,107,109]
    switch (true) {
      case e.which >= 48 && e.which <= 57: // case statements for numbers inc numPad.
      case e.which >= 96 && e.which <= 105:
      case e.which === 46 || 110: // case statement for "."
        this.addNum(e.key);
        break;
      case e.which === 42 || 106: // case for multiplication
        this.operations("\u00D7");
        break;
      case e.which === 47 || 111: // case for division
        this.operations("\u00F7");
        break;
      case e.which === 13:
        this.operations("=");
        break;
      case mathOptions.indexOf(e.which) > -1: // all other math operations
        this.operations(e.key);
        break;
      default:
        console.log("Not a valid keypress");
    }
  }

  /* The handleKeydown method is necessary for logging the escape and delete keys specifically.
   * Not all of the keys can be run through this method, because keydown does not account for different
   * values a key may produce when shift is pressed. Since some of the math operators are on the number keys
   * this would create bugs.
   */
  handleKeydown(e) {
    if (e.which === 27 || e.which === 8) {
      this.clearDisplay();
    }
  }

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
      <div className="calculator-app">
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
