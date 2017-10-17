import React, { Component } from 'react';
import styles from '../css/Materials.css';
import MaterialItem from './MaterialItem';

class MaterialsTree extends Component {
	render(){
		var mats = this.props.recipeTree.tree.map((material) =>
		{
			return (<MaterialItem item={material} key={material.id}/>)
		}); 
		return (
			<table className={styles.materialsTable}>
				<tbody>
				{mats}
				</tbody>
			</table>
		);
	}
}

export default MaterialsTree;
