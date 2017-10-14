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
			isFocused: false
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
			console.log(response.json());
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
				<ShoppingList />
				<SearchBar isFocused={this.state.isFocused} searchFocus={this.setSearchFocus.bind(this)} search={this.doSearch.bind(this)} searchResults={this.state.searchResults} addItem={this.addToSelected.bind(this)}/>				
				<SelectedResults selectedResults={this.state.selectedResults}/>
			</div>
		);
	}
}

export default App;
