import React, { Component } from 'react';
import styles from '../css/Materials.css';
import MaterialsTree from './MaterialsTree';

class MaterialItem extends Component {
	constructor(){
		super();

		this.state={
			nestedMaterial: false,
			recipeTree: [],
			showNested: false,
		};
	}

	doSearch(searchURL){
		/*
		var response = this.getResponseFromAPI(searchURL);
		console.log(response);*/

		$.ajax({
			type: "GET",
			dataType: "json",
			url: searchURL,
			success: function(response){
				if (response.craftable)
				{
					this.setState({
						nestedMaterial: true,
						recipeTree: response.craftable[0]
					});
				}
			}.bind(this)
		});
	}

	updateSubmaterials(evt){
		this.props.updateMats(this.props.item.name, this.props.item.quantity, this.state.recipeTree.desiredMats, evt.target.checked);
	}

	toggleNested(evt){
		evt.stopPropagation();
		this.setState({
			showNested: !this.state.showNested
		});
	}

	componentDidMount(){
		var query = this.props.item.url_api;
		this.doSearch(query);

	}

	render(){
		var nestedTable = null;
		if (this.state.nestedMaterial)
		{
			nestedTable = (<MaterialsTree nested={true} quantity={this.props.item.quantity} updateMats={this.props.updateMats.bind(this)} recipeTree={this.state.recipeTree}/>);
		}
		return (
			<tr>
				<td>
					<div className={styles.materialImage}><img src={this.props.item.icon}/></div>
					<div className={styles.materialQuantity}>{this.props.item.quantity}</div>
					<div className={styles.subMatCheckbox}>{
						this.state.nestedMaterial &&
							<input type="checkbox" onChange={this.updateSubmaterials.bind(this)} />
						}
					</div>
					<div className={this.state.nestedMaterial ? styles.nestedMaterialName : styles.materialName}>
						<p onClick={this.toggleNested.bind(this)}>{this.props.item.name}</p>
						{this.state.nestedMaterial &&
							<div className={this.state.showNested ? styles.nestedTable : styles.hidden}>{nestedTable}</div>
						}
					</div>
				</td>
			</tr>
		);
	}
}

export default MaterialItem;
