import React, { Component } from 'react';
import SelectedItem from './SelectedItem';
import styles from './css/SearchResults.css';

class SelectedResults extends Component {
	render(){

		console.log(this.props.selectedResults);
		var selects = this.props.selectedResults.map((item) => {
			return <SelectedItem key={item.id} item={item} addToCart={this.props.addItemToCart.bind(this)}/>
		});
		return (
			<div className={styles.selectedBox}>
				{selects}
			</div>
		);
	}
}

export default SelectedResults;
