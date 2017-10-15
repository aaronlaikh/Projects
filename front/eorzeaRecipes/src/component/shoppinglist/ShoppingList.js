import React, { Component } from 'react';
//import CartItem from './CartItem';
import CartItem from './cartItem';
import MaterialItemTally from './MaterialItemTally';
import styles from './css/ShoppingList.css';

class ShoppingList extends Component {
	constructor()
	{
		super();
		this.state = {};
	}

	addToMaterialsList(name, quantity){
		var obj = {};
		obj[name] = quantity;
		this.setState(obj);
		console.log(name, quantity);
	}

	render(){
		var cart = this.props.cart.map((item, i)=>{
			return <CartItem key={item.id} item={item} addMaterials={this.addToMaterialsList.bind(this)}/>
		});

		var materialsTally = [];

		for (var i = 0; i < this.props.cartMats.length; i++)
		{
			materialsTally.push(<MaterialItemTally item_name={this.props.cartMats[i]} quantity={this.props.cartQuantities[i]}/>);
		}

		return (
			<div className={styles.shoppingList}>Cart
				<div className={styles.itemList}>{cart}</div>
				<div className={styles.materialsTally}>
					<table>{materialsTally}</table>
				</div>
			</div>
		);
	}
}

export default ShoppingList;
