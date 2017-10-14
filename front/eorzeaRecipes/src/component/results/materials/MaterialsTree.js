import React, { Component } from 'react';

class MaterialsTree extends Component {
	render(){
		var mats = this.props.recipeTree.tree.map((material) =>
		{
			return (<div>{material.name}</div>)
		}); 
		return (
			<div>
				{mats}
			</div>
		);
	}
}

export default MaterialsTree;
