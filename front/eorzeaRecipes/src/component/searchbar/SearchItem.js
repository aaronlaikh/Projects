import React, { Component } from 'react';
import styles from './css/SearchResults.css';

class SearchItem extends Component {
	selectItem(){
		this.props.keepFocus(false);
		this.props.selectItem(this.props.item);
	}

	render(){
		return (
			<div className={styles.resultItem} onMouseDown={this.selectItem.bind(this)}>
				<div className={styles.searchIcon}><img src={this.props.item.icon}/></div>
				<div className={styles.resultName}>{this.props.item.item_name}</div>
			</div>
		);
	}
}

export default SearchItem;
