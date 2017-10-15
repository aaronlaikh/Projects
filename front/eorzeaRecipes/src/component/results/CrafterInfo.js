import React, { Component } from 'react';
import styles from './css/SearchResults.css';

class CrafterInfo extends Component {

	render(){
		return (
			<table className={styles.crafterInfo}>
				<tbody>
					<tr>
					<td>Class</td>
					<td>{this.props.item.class_name}</td>
					</tr>
				</tbody>
			</table>
		);
	}
}

export default CrafterInfo;
