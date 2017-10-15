import React, { Component } from 'react';
import styles from './css/ShoppingList.css';

class CartItem extends Component {
	render(){
		var mats = this.props.item.tree.map((material) => {
			return (<div>
					<div>{material.quantity}</div><div>{material.name}</div></div>);
		});
		return (
			<ul className={styles.cartName}>{this.props.item.name}
				{mats}
			</ul>
		);
	}
}

export default CartItem;
