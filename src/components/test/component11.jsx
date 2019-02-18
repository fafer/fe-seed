import React, { Component } from 'react';
import Component1Context from './Component1Context';

export default class Component11 extends Component {
  static contextType = Component1Context;

  constructor(props) {
    super(props);
    console.log('初始化：Component11');
  }

  componentDidMount() {
    console.log('已挂载componentDidMount：Component11');
    this.setState({});
  }

  UNSAFE_componentWillMount() {
    console.log('将要挂载componentWillMount：Component11');
  }

  componentWillUnmount() {
    console.log('将要卸载componentWillUnmount：Component11');
  }

  shouldComponentUpdate() {
    console.log('是否要更新shouldComponentUpdate：Component11');
    return true;
  }

  UNSAFE_componentWillReceiveProps() {
    console.log('将要接收参数componentWillReceiveProps：Component11');
  }

  UNSAFE_componentWillUpdate() {
    console.log('将要更新componentWillUpdate：Component11');
  }

  componentDidUpdate() {
    console.log('更新componentDidUpdate：Component11');
  }

  render() {
    console.log('渲染render：Component11', this.context);
    return <div onClick={() => this.setState({})}>Component11</div>;
  }
}
