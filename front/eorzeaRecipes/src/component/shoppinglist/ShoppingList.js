import React, { Component } from 'react';
//import CartItem from './CartItem';
import CartItem from './cartItem';
import styles from './css/ShoppingList.css';

class ShoppingList extends Component {
	render(){
		var cart = this.props.cart.map((item, i)=>{
			return <CartItem key={i} item={item}/>
		});
		console.log(this.props.shoppingCart);
		return (
			<div className={styles.shoppingList}>Cart
				{cart}
			</div>
		);
	}
}

export default ShoppingList;
