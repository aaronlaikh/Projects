import React, { Component } from 'react';
//import CartItem from './CartItem';
import CartItem from './cartItem';
import MaterialItemTally from './MaterialItemTally';
import styles from './css/ShoppingList.css';

class ShoppingList extends Component {
	constructor()
	{
		super();
		this.state = {
			items: []
		};
	}

	addToMaterialsList(name, quantity){
		var obj = {};
		obj[name] = quantity;
		this.setState(obj);
	}

	updateQuantity(item, quantity)
	{
		console.log(quantity);
		if (quantity < 1)
		{
			this.props.deleteCartItem(item);
		}
		else {
			this.props.addCartItem(item);
		}
	}

	render(){
		//Update the state with the quantities of the items.
		var cart = this.props.cart.map((item, i)=>{
			return <CartItem key={item.id} item={item} updateQuantity={this.updateQuantity.bind(this)} addMaterials={this.addToMaterialsList.bind(this)}/>
		});

		var materialsTally = [];
		var index= 0;
		for (var key in this.props.cartMats)
		{
			materialsTally.push(<MaterialItemTally key={index++} item_name={key} quantity={this.props.cartMats[key]}/>);
		}

		return (
			<div className={styles.shoppingList}>Cart
				<div className={styles.itemList}>
					<table><tbody>{cart}</tbody></table></div>
				<div className={styles.materialsTally}>
					<table><tbody>{materialsTally}</tbody></table>
				</div>
			</div>
		);
	}
}

export default ShoppingList;
