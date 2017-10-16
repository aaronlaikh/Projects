import React, { Component } from 'react';
import styles from '../css/Materials.css';

class MaterialItem extends Component {
	render(){
		return (
			<tr>
				<td className={styles.materialImage}><img src={this.props.item.icon}/></td>
				<td className={styles.materialQuantity}>{this.props.item.quantity}</td>
				<td className={styles.materialName}>{this.props.item.name}</td>
			</tr>
		);
	}
}

export default MaterialItem;
