import React, { Component } from 'react';
import styles from './css/ShoppingList.css';

class CartItem extends Component {
	render(){
		var mats = this.props.item.tree.map((material) => {
			//this.props.addMaterials(material.name, material.quantity);
			return (<div><div>{material.quantity}</div><div>{material.name}</div></div>);
		});
		return (
			<ul className={styles.cartName}>{this.props.item.name}
			</ul>
		);
	}
}

export default CartItem;
