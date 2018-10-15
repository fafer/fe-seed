import React, { Component } from 'react';

export default class Component1 extends Component {

	constructor(props) {
		super(props);
		console.log('初始化：Component1');
	}

	componentDidMount() {
		console.log('已挂载componentDidMount：Component1');
		this.setState({});
	}

	componentWillMount() {
		console.log('将要挂载componentWillMount：Component1');
	}

	componentWillUnmount() {
		console.log('将要卸载componentWillUnmount：Component1');
	}

	shouldComponentUpdate() {
		console.log('是否要更新shouldComponentUpdate：Component1');
		return true;
	}

	componentWillReceiveProps() {
		console.log('将要接收参数componentWillReceiveProps：Component1');
	}

	componentWillUpdate() {
		console.log('将要更新componentWillUpdate：Component1');
	}

	componentDidUpdate() {
		console.log('更新componentDidUpdate：Component1');
	}

	render() {
		console.log('渲染render：Component1');
		if (!this.props.show) return <div>Component1</div>;
		return <div>{this.props.children}</div>;
	}
}