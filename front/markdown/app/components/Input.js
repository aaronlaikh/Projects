var React = require('react');
var ReactDOM = require('react-dom');

class Input extends React.Component {
	constructor(){
		super();
		this.state={
			value: ""
		};

		//this.displayChange = this.displayChange.bind(this);
	}
/*
	displayChange(event){
		this.setState({value: event.target.value});
		console.log(event.target.value);

	}*/

	updateState(event){
		this.props.onUpdate(event.refs.markdownInput.value);
	}

	render(){
		const markdownInput= {
			width: '50%',
			height: '100%',
			display: 'inline-block',
			background: 'green'
		};
		return <textarea className={markdownInput} type="text" ref="markdownInput" onChange={()=> this.updateState(this)}></textarea>//{this.displayChange}></input>;
	}
}

module.exports = Input;