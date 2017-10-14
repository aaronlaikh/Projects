import React, { Component } from 'react';

class ResultItem extends Component {
	render(){
		return (
			<div>
				{this.props.item.item_name}
			</div>
		);
	}
}

export default ResultItem;
