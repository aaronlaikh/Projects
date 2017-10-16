import React, { Component } from 'react';
import styles from './css/ShoppingList.css';

class CartItem extends Component {
	decrement(){
		console.log("decrementing");
		this.props.updateQuantity(this.props.item, -1);
	}

	increment(){
		console.log("incrementing");
		this.props.updateQuantity(this.props.item, 1);
	}

	render(){
		var mats = this.props.item.tree.map((material) => {
			//this.props.addMaterials(material.name, material.quantity);
			return (<div><div>{material.quantity}</div><div>{material.name}</div></div>);
		});
		return (
			<tr>
				<td className={styles.cartQuantityContainer}>
					<div className={styles.cartEditQuantity} onClick={this.decrement.bind(this)}>-</div>
					<div className={styles.cartQuantity}>{this.props.item.quantity}</div>
					<div className={styles.cartEditQuantity} onClick={this.increment.bind(this)}>+</div>
				</td>
				<td className={styles.cartName}>{this.props.item.name}</td>
			</tr>
		);
	}
}

export default CartItem;
