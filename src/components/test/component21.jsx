import React, { Component } from 'react'
export default class Component21 extends Component {

  constructor(props) {
    super(props)
    console.log('初始化：Component21')
  }

  componentDidMount() {
    console.log('已挂载componentDidMount：Component21')
    this.setState({})
  }

  componentWillMount() {
    console.log('将要挂载componentWillMount：Component21')
  }

  componentWillUnmount() {
    console.log('将要卸载componentWillUnmount：Component21')
  }

  shouldComponentUpdate() {
    console.log('是否要更新shouldComponentUpdate：Component21')
    return true
  }

  componentWillReceiveProps() {
    console.log('将要接收参数componentWillReceiveProps：Component21')
  }

  componentWillUpdate() {
    console.log('将要更新componentWillUpdate：Component21')
  }

  componentDidUpdate() {
    console.log('更新componentDidUpdate：Component21')
  }

  render() {
    console.log('渲染render：Component21')
    return <div>Component21</div>
  }
}