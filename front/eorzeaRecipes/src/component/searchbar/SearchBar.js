import React, { Component } from 'react';
import styles from './css/searchbar.css';

import SearchResults from './SearchResults';

class SearchBar extends Component {
	updateState(evt){
		this.setState({
			searchString: evt.target.value
		}, function(){
			var query = this.buildQueryString();
			this.props.search(query);
		});
	}

	buildQueryString(){
		var queryString = "http://api.xivdb.com/search?string=" + this.state.searchString + "&one=recipes";
		return queryString;
	}

	setFocus(evt){
		if (evt.nativeEvent.type == 'focus')
			this.props.searchFocus(true);
		else if (evt.nativeEvent.type == 'blur')
			this.props.searchFocus(false);
	}

	render(){
		return (
			<div>
				<div className={styles.searchbar}>
					<input className={styles.inputBox} 
						onFocus={this.setFocus.bind(this)} 
						onBlur={this.setFocus.bind(this)} 
						onChange={this.updateState.bind(this)}></input>
				</div>
				<SearchResults searchFocused={this.props.isFocused} keepFocus={this.props.searchFocus.bind(this)} searchResults={this.props.searchResults} addItem={this.props.addItem.bind(this)}/>
			</div>
		);
	}
}

export default SearchBar;
