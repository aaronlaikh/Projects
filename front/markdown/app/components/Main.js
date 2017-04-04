//import { MarkdownPreview } from 'react-marked-markdown';

var React = require('react');
var ReactDOM = require('react-dom');

var Input = require('./Input');
var Preview = require('./Preview');
var marked = require('marked');
//var styles = require('../css/Main.css');
//var MarkdownPreview = require('react-marked-markdown');

class Main extends React.Component {

	constructor(){
		super();
		this.state = {
			text: ""
		};


	}
	handleChange(data){
		this.setState({
			text: data
		});
	}

	renderInput(){
		const markdownInput= {
			width: '50%',
			height: '100%',
			display: 'inline-block',
			background: 'green'
		};
		return <Input value={this.state.text} onUpdate={(this.handleChange.bind(this))}/>
	}

	renderPreview(){
		const markdownPreview= {
			width: '50%',
			height: '100%',
			display: 'inline-block'
		};
		return <Preview className={markdownPreview} value={marked(this.state.text)}/>;
		//return <MarkdownPreview value={this.state.text}/>;
	}

	render()
	{
		return (<div>
			<div>
				{this.renderInput()}
			</div>
			<div>
				{this.renderPreview()}
			</div>
		</div>
		);
	}
}

module.exports = Main;