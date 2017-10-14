import React, { Component } from 'react';
import SelectedItem from './SelectedItem';

class SelectedResults extends Component {
	render(){
		var selects = this.props.selectedResults.map((item) => {
			return <SelectedItem key={item.id} item={item}/>
		});
		return (
			<div>
				{selects}
			</div>
		);
	}
}

export default SelectedResults;
