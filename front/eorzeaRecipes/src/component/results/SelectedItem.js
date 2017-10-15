import React, { Component } from 'react';
import styles from './css/SearchResults.css';
import MaterialsTree from './materials/MaterialsTree';

class SelectedItem extends Component {

	addToList(){
		this.props.addToCart(this.props.item);
	}

	render(){
		return (
			/*
			<div className={styles.selectedItem}>
				<div className={styles.searchIcon}><img className={styles.selectedImg} src={this.props.item.icon}/></div>
				<div className={styles.selectedName}>{this.props.item.item_name}</div>
				<MaterialsTree recipeTree={this.props.item}/>
			</div>*/
			<table className={styles.selectedItem}>
				<tbody>
				<tr className={styles.itemInfo}>
					<td className={styles.searchIcon}><img className={styles.selectedImg} src={this.props.item.icon}/></td>
					<td className={styles.selectedName}>{this.props.item.item_name}</td>
					<td className={styles.itemOperation} onClick={this.addToList.bind(this)}>Cart</td>
					<td className={styles.itemOperation}>Delete</td>
				</tr>
				<tr>
					<td>
					<MaterialsTree recipeTree={this.props.item}/>
					</td>
				</tr>
				</tbody>
			</table>
		);
	}
}

export default SelectedItem;
