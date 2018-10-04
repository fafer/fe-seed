import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Component1 from './component1'
import Component11 from './component11'
import Component12 from './component12'
import Component2 from './component2'
import Component21 from './component21'
import Component22 from './component22'

export default class Test extends Component {

  constructor(props) {
    super(props)
    this.state = {
      show:true
    }
    this.show = this.show.bind(this)
  }

  show() {
    this.setState((prevState) => {
      return {show:!prevState.show}
    })
  }
  render() {
    return (
      <React.Fragment>
        <span onClick={this.show}>show</span>
        <Component1 show={this.state.show} >
          <Component11></Component11>
          <Component12></Component12>
        </Component1>
        <Component2>
          <Component21></Component21>
          <Component22></Component22>
        </Component2>
      </React.Fragment>
    )
  }
}

ReactDOM.render(
  <Test></Test>,
  document.getElementById('app')
)