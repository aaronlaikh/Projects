import React, { Component } from 'react';
import SearchBar from '../component/searchbar/SearchBar';
import styles from './index.css';
//import SearchResults from './results/SearchResults';
import SearchResults from './searchbar/SearchResults';
import SelectedResults from './results/SelectedResults';
import ShoppingList from './shoppinglist/ShoppingList';

class App extends Component {
	constructor(){
		super();

		this.state = {
			searchResults: [],
			selectedResults: [],
			isFocused: false,
			shoppingCart: [],
			cartMats: [],
			cartQuantities: []
		}
	}

	showResults(response){
		this.setState({
			searchResults: response.recipes.results
		});
	}

	getResponseFromAPI(searchURL)
	{
		fetch(searchURL).then(function(response)
		{
			return response.json();
		});
	}

	addToSelected(item){
		$.ajax({
			type: "GET",
			dataType: "json",
			url: item.url_api,
			success: function(response){
				item.tree = response.tree;

				this.setState({
					selectedResults: this.state.selectedResults.concat(item)
				});
			}.bind(this)
		});
	}

	addItemToCart(item){
		var itemMats = [];
		var itemQuants = [];
		item.tree.map((material) =>{
			if (this.state.cartMats.indexOf(material.name) > -1)
			{
				console.log("already in mats");
				var index = this.state.cartMats.indexOf(material.name);
				this.state.cartQuantities[index] += material.quantity;
			}
			else {
				console.log("adding to mats");
				itemMats.push(material.name);
				itemQuants.push(material.quantity);
			}
		});
		console.log(this.state.cartMats);
		this.setState({
			shoppingCart: this.state.shoppingCart.concat(item),
			cartMats: this.state.cartMats.concat(itemMats),
			cartQuantities: this.state.cartQuantities.concat(itemQuants)
		}, () => {
			console.log(this.state.cartMats);
		});

	}

	deleteItemFromSelect(item){
		var selected = this.state.selectedResults;
		var index = selected.indexOf(item);
		selected.splice(index, 1);
		this.setState({
			selectedResults: selected
		});
	}

	setSearchFocus(status){
		this.setState({
			isFocused: status
		});
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
				this.showResults(response);
			}.bind(this)
		});
	}

	render(){
		//<SearchResults keepFocus={this.setSearchFocus.bind(this)} searchFocused={this.state.isFocused} addItem={this.addToSelected.bind(this)} searchResults = {this.state.searchResults}/>
		return (
			<div className="app">
				<ShoppingList cart={this.state.shoppingCart} cartMats={this.state.cartMats} cartQuantities = {this.state.cartQuantities}/>
				<div className={styles.resultsContainer}>
					<SearchBar isFocused={this.state.isFocused} searchFocus={this.setSearchFocus.bind(this)} search={this.doSearch.bind(this)} searchResults={this.state.searchResults} addItem={this.addToSelected.bind(this)}/>				
					<SelectedResults selectedResults={this.state.selectedResults} addItemToCart={this.addItemToCart.bind(this)} deleteFromResults={this.deleteItemFromSelect.bind(this)}/>
				</div>
			</div>
		);
	}
}

export default App;
