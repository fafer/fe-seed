import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Component1 from './component1';
import Component11 from './component11';
import Component12 from './component12';
import Component2 from './component2';
import Component21 from './component21';
import Component22 from './component22';
import Component1Context from './Component1Context';

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
  }

  show = () => {
    this.setState(prevState => {
      return { show: !prevState.show };
    });
  };

  render() {
    return (
      <React.Fragment>
        <span onClick={this.show}>show</span>
        <Component1Context.Provider value="222222222">
          <Component1 show={this.state.show}>
            <Component11 />
            <Component12 />
          </Component1>
        </Component1Context.Provider>
        <Component2>
          <Component21 />
          <Component22 />
        </Component2>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<Test />, document.getElementById('app'));
