import React, { Component } from 'react';
import styles from './css/searchbar.css';

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

	render(){
		return (
			<div className={styles.searchbar}>
				<input className={styles.inputBox} onChange={this.updateState.bind(this)}></input>
			</div>
		);
	}
}

export default SearchBar;
