import React, { Component } from 'react';
import styles from './css/SearchResults.css';
import MaterialsTree from './materials/MaterialsTree';
import CrafterInfo from './CrafterInfo';

class SelectedItem extends Component {

	addToList(){
		this.props.addToCart(this.props.item);
	}

	deleteThis(){
		this.props.deleteFromResults(this.props.item);
	}

	render(){
		return (
			/*
			<div className={styles.selectedItem}>
				<div className={styles.searchIcon}><img className={styles.selectedImg} src={this.props.item.icon}/></div>
				<div className={styles.selectedName}>{this.props.item.item_name}</div>
				<MaterialsTree recipeTree={this.props.item}/>
			</div>*/
			<div className={styles.selectedItem}>
				<table className={styles.itemNameInfoTable}>
					<tbody>
					<tr className={styles.itemInfo}>
						<td className={styles.searchIcon}><img className={styles.selectedImg} src={this.props.item.icon}/></td>
						<td className={styles.selectedName}>{this.props.item.item_name}</td>
						<td className={styles.itemOperation} onClick={this.deleteThis.bind(this)}>-</td>
						<td className={styles.itemOperation} onClick={this.addToList.bind(this)}>+</td>
					</tr>
					</tbody>
				</table>
				<table>
					<tbody>
					<tr>
						<td className={styles.craftContainer}>
						<CrafterInfo item={this.props.item}/>
						</td>
						<td className={styles.materialsContainer}>
						<MaterialsTree recipeTree={this.props.item}/>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default SelectedItem;
