import React, { Component } from 'react';
import SearchBar from '../component/searchbar/SearchBar';
import styles from '../index.css';
import SearchResults from './results/SearchResults';

class App extends Component {
	constructor(){
		super();

		this.state = {
			searchResults: []
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

	componentDidMount(){
		console.log("component mounted");
		this.doSearch("http://api.xivdb.com/search?string=allagan&one=recipes");
		//console.log(this.state.searchResults);
	}

	render(){
		return (
			<div className="app">
				<SearchBar search={this.doSearch.bind(this)}/>
				<SearchResults searchResults = {this.state.searchResults}/>
			</div>
		);
	}
}

export default App;
