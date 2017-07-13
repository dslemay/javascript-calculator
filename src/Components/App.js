import React from 'react';
import '../style/App.css';
import NumKey from './NumKey';
import Display from './Display';

class App extends React.Component {
  constructor() {
    super();
    this.addNum = this.addNum.bind(this);

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
    console.log(number);
    // if (this.state.currVal === undefined || this.state.currVal === "0") {
    //   // var values = {currVal, display};
    //   this.setState({
    //     currVal: number,
    //     display: number
    //   });
    // } else { // Concatenate number pressed onto current display
    //   var currDisplay = this.state.display;
    //
    // }
  }

  render() {
    var numKeys = [7,8,9,4,5,6,1,2,3];

    return (
      <div>
        <Display display={this.state.display} />
        {
          numKeys.map(key => <NumKey key={key} value={key.toString()} addNum={this.addNum} />)
        }
      </div>
    );
  }
}

export default App;
