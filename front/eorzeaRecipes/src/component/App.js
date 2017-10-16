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
			cartMats: {}		
		};
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
		var itemIndex = -1;
		for (var i = 0; i < this.state.shoppingCart.length; i++)
		{
			if (this.state.shoppingCart[i].name == item.name)
			{
				itemIndex = i;
				break;
			}
		}

		var matsCopy=Object.assign({}, this.state).cartMats;
		item.tree.map((material) =>{
			if (this.state.cartMats[material.name]!= null)
			{
				matsCopy[material.name] += material.quantity;
			}
			else {
				matsCopy[material.name] = material.quantity;
			}
		});
		if (itemIndex < 0){
			item.quantity = 1;
			this.setState({
				shoppingCart: this.state.shoppingCart.concat(item),
				cartMats: matsCopy
			});
		}
		else {
			var cartCopy = Object.assign({}, this.state).shoppingCart;
			cartCopy[itemIndex].quantity += 1;
			this.setState({
				shoppingCart: cartCopy,
				cartMats: matsCopy
			});
		}
	}

	deleteItemFromCart(item){
		var itemIndex = -1;
		for (var i = 0; i < this.state.shoppingCart.length; i++)
		{
			if (this.state.shoppingCart[i].name == item.name)
			{
				itemIndex = i;
				break;
			}
		}
		var matsCopy=Object.assign({}, this.state).cartMats;
		item.tree.map((material) =>{
			if (matsCopy[material.name] != null)
			{
				matsCopy[material.name] -= material.quantity;
				if (matsCopy[material.name] <= 0)
					delete matsCopy[material.name];
			}
			else {
				console.log("deleting materials that aren't there");
			}
		});
		if (itemIndex < 0){
			console.log("ERROR, DELETING ITEM THAT ISN'T IN THE CART");
		}
		else {
			var cartCopy = Object.assign({}, this.state).shoppingCart;
			cartCopy[itemIndex].quantity -= 1;
			if (cartCopy[itemIndex].quantity <= 0)
			{
				cartCopy.splice(itemIndex,1);
			}
			this.setState({
				shoppingCart: cartCopy,
				cartMats: matsCopy
			});
		}

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
			<div className={styles.app}>
				<ShoppingList cart={this.state.shoppingCart} addCartItem={this.addItemToCart.bind(this)} deleteCartItem={this.deleteItemFromCart.bind(this)} cartMats={this.state.cartMats}/>
				<div className={styles.resultsContainer}>
					<SearchBar isFocused={this.state.isFocused} searchFocus={this.setSearchFocus.bind(this)} search={this.doSearch.bind(this)} searchResults={this.state.searchResults} addItem={this.addToSelected.bind(this)}/>				
					<SelectedResults selectedResults={this.state.selectedResults} addItemToCart={this.addItemToCart.bind(this)} deleteFromResults={this.deleteItemFromSelect.bind(this)}/>
				</div>
			</div>
		);
	}
}

export default App;
