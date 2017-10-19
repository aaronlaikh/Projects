import React, { Component } from 'react';
import styles from '../css/Materials.css';
import MaterialItem from './MaterialItem';

class MaterialsTree extends Component {

	updateMats(item_name, quantity, mats_array, operation){
		if (this.props.nested)
		{
			this.props.updateMats(this.props.recipeTree.name, this.props.recipeTree.quantity, this.props.recipeTree.desiredMats, false);
		}
		//true to use submats. false to remove submats.
		if (operation)
		{
			delete this.props.recipeTree.desiredMats[item_name];
			for (var key in mats_array)
			{
				if (this.props.recipeTree.desiredMats[key] != null)
				{
					this.props.recipeTree.desiredMats[key] += (quantity * mats_array[key]);
				}
				else
					this.props.recipeTree.desiredMats[key] = (quantity * mats_array[key]);
			}
			console.log(this.props.recipeTree["desiredMats"]);
		}
		else {
			for (var key in mats_array)
			{
				if (this.props.recipeTree.desiredMats[key] != null)
				{
					if (this.props.recipeTree.desiredMats[key] == quantity)
						delete this.props.recipeTree.desiredMats[key];
					else{
						this.props.recipeTree.desiredMats[key] -= (quantity * mats_array[key]);
						if (this.props.recipeTree.desiredMats[key] <= 0)
							delete this.props.recipeTree.desiredMats[key];
					}
				}
				else
					console.log("deleting nothing ERROR");
			}
			this.props.recipeTree.desiredMats[item_name] = quantity;
			console.log(this.props.recipeTree.desiredMats);
		}

		if (this.props.nested)
		{
			this.props.updateMats(this.props.recipeTree.name, this.props.recipeTree.quantity, this.props.recipeTree.desiredMats, true);
		}
	}

	componentDidMount()
	{
		this.props.recipeTree["desiredMats"] = {};
		//load the direct tree
		this.props.recipeTree.tree.map((material) =>
		{
//			var obj = {};
//			obj[material.name] = material.quantity;
			this.props.recipeTree.desiredMats[material.name] = material.quantity;
		});
		this.props.recipeTree["quantity"] = this.props.quantity;
		console.log("mounting materials");
		console.log(this.props.recipeTree);
	}

	render(){
		var mats = this.props.recipeTree.tree.map((material) =>
		{
			return (<MaterialItem item={material} updateMats={this.updateMats.bind(this)} key={material.id}/>)
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
