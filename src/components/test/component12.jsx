import React, { Component } from 'react';
export default class Component12 extends Component {

	constructor(props) {
		super(props);
		console.log('初始化：Component12');
	}

	componentDidMount() {
		console.log('已挂载componentDidMount：Component12');
		this.setState({});
	}

	componentWillMount() {
		console.log('将要挂载componentWillMount：Component12');
	}

	componentWillUnmount() {
		console.log('将要卸载componentWillUnmount：Component12');
	}

	shouldComponentUpdate() {
		console.log('是否要更新shouldComponentUpdate：Component12');
		return true;
	}

	componentWillReceiveProps() {
		console.log('将要接收参数componentWillReceiveProps：Component12');
	}

	componentWillUpdate() {
		console.log('将要更新componentWillUpdate：Component12');
	}

	componentDidUpdate() {
		console.log('更新componentDidUpdate：Component12');
	}

	render() {
		console.log('渲染render：Component12');
		return <div>Component12</div>;
	}
}