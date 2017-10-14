import React, { Component } from 'react';
import styles from './css/SearchResults.css';

class ResultItem extends Component {
	selectItem(){
		this.props.keepFocus(true);
		this.props.selectItem(this.props.item);
	}

	render(){
		return (
			<div className={styles.resultItem} onClick={this.selectItem.bind(this)}>
				<div className={styles.searchIcon}><img src={this.props.item.icon}/></div>
				<div className={styles.resultName}>{this.props.item.item_name}</div>
			</div>
		);
	}
}

export default ResultItem;
