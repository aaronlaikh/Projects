var React = require('react');
var ReactDOM = require('react-dom');

class Preview extends React.Component {

	toMarkup(string) {
		console.log(string);
		return {
			__html: string
		};
	}

	render(){
		return <div dangerouslySetInnerHTML={this.toMarkup(this.props.value)}></div>;
	}
}

module.exports = Preview;