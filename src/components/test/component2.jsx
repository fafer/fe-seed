import React, { Component } from 'react';

export default class Component2 extends Component {

	constructor(props) {
		super(props);
		console.log('初始化：Component2');
	}

	componentDidMount() {
		console.log('已挂载componentDidMount：Component2');
		this.setState({});
	}

	componentWillMount() {
		console.log('将要挂载componentWillMount：Component2');
	}

	componentWillUnmount() {
		console.log('将要卸载componentWillUnmount：Component2');
	}

	shouldComponentUpdate(nextProps) {
		console.log(this.props === nextProps ? 'true' : 'false');
		console.log('是否要更新shouldComponentUpdate：Component2');
		return true;
	}

	componentWillReceiveProps() {
		console.log('将要接收参数componentWillReceiveProps：Component2');
	}

	componentWillUpdate() {
		console.log('将要更新componentWillUpdate：Component2');
	}

	componentDidUpdate() {
		console.log('更新componentDidUpdate：Component2');
	}

	render() {
		console.log('渲染render：Component2');
		// if(!this.props.show) return <div>Component2</div>
		return <div>{this.props.children}</div>;
	}
}