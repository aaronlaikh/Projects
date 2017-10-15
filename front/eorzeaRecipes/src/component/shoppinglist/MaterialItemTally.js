import React, { Component } from 'react';
import styles from './css/ShoppingList.css';

class MaterialItemTally extends Component {
	render(){
		return (
			<tr>
				<td className={styles.tallyQuantity}>{this.props.quantity}</td>
				<td className={styles.tallyItem}>{this.props.item_name}</td>
			</tr>
		);
	}
}

export default MaterialItemTally;
