import React, { Component } from 'react';
import SearchBar from '../component/searchbar/SearchBar';
import styles from '../index.css';
import SearchResults from './results/SearchResults';
import SelectedResults from './results/SelectedResults';

class App extends Component {
	constructor(){
		super();

		this.state = {
			searchResults: [],
			selectedResults: []
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
		return (
			<div className="app">
				<SearchBar search={this.doSearch.bind(this)}/>
				<SearchResults addItem={this.addToSelected.bind(this)} searchResults = {this.state.searchResults}/>
				<SelectedResults selectedResults={this.state.selectedResults}/>
			</div>
		);
	}
}

export default App;
