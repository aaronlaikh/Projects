import React, { Component } from 'react';
import styles from '../css/Materials.css';
import MaterialsTree from './MaterialsTree';

class MaterialItem extends Component {
	constructor(){
		super();

		this.state={
			nestedMaterial: false,
			recipeTree: [],
			showNested: false
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

	toggleNested(){
		console.log("toggling nested");
		this.setState({
			showNested: !this.state.showNested
		});
	}

	componentDidMount(){
		console.log("mounting material");
		var query = this.props.item.url_api;
		this.doSearch(query);
	}

	render(){
		var nestedTable = null;
		if (this.state.nestedMaterial)
		{
			console.log("loading");
			nestedTable = (<MaterialsTree recipeTree={this.state.recipeTree}/>);
		}
		return (
			<tr>
				<div className={styles.materialImage}><img src={this.props.item.icon}/></div>
				<div className={styles.materialQuantity}>{this.props.item.quantity}</div>
				<div className={this.state.nestedMaterial ? styles.nestedMaterialName : styles.materialName} onClick={this.toggleNested.bind(this)}>{this.props.item.name}
					{this.state.nestedMaterial &&
						<div className={this.state.showNested ? styles.nestedTable : styles.hidden}>{nestedTable}</div>
					}
				</div>
			</tr>
		);
	}
}

export default MaterialItem;
