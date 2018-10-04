import React, { Component } from 'react'
export default class Component22 extends Component {
  
  constructor(props) {
    super(props)
    console.log('初始化：Component22')
  }
 
  componentDidMount() {
    console.log('已挂载componentDidMount：Component22')
    this.setState({})
  }

  componentWillMount() {
    console.log('将要挂载componentWillMount：Component22')
  }

  componentWillUnmount() {
    console.log('将要卸载componentWillUnmount：Component22')
  }

  shouldComponentUpdate() {
    console.log('是否要更新shouldComponentUpdate：Component22')
    return true
  }

  componentWillReceiveProps() {
    console.log('将要接收参数componentWillReceiveProps：Component22')
  }

  componentWillUpdate() {
    console.log('将要更新componentWillUpdate：Component22')
  }

  componentDidUpdate() {
    console.log('更新componentDidUpdate：Component22')    
  }

  render() {
    console.log('渲染render：Component22')
    return <div>Component22</div>
  }
}