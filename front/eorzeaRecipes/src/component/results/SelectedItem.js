import React, { Component } from 'react';
import styles from './css/SearchResults.css';
import MaterialsTree from './materials/MaterialsTree';

class SelectedItem extends Component {
	render(){
		console.log(this.props.item);
		return (
			<div className={styles.selectedItem}>
				<div className={styles.searchIcon}><img className={styles.selectedImg} src={this.props.item.icon}/></div>
				<div className={styles.selectedName}>{this.props.item.item_name}</div>
				<MaterialsTree recipeTree={this.props.item}/>
			</div>
		);
	}
}

export default SelectedItem;
