import React, { Component } from 'react';
import SelectedItem from './SelectedItem';
import styles from './css/SearchResults.css';

class SelectedResults extends Component {
	render(){
		var selects = this.props.selectedResults.map((item) => {
			return <SelectedItem key={item.id} item={item} addToCart={this.props.addItemToCart.bind(this)} deleteFromResults={this.props.deleteFromResults.bind(this)}/>
		});
		return (
			<div className={styles.selectContainer}>
				<div className={styles.selectedBox}>
					{selects}
				</div>
			</div>
		);
	}
}

export default SelectedResults;
