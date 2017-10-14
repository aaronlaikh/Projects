import React, { Component } from 'react';
import SearchItem from './SearchItem';
import styles from './css/SearchResults.css';

class SearchResults extends Component {
	render(){
		var results = this.props.searchResults.map((result) =>{
			return <SearchItem keepFocus={this.props.keepFocus} searchFocus={this.props.searchFocused} selectItem={this.props.addItem.bind(this)}  key={result.id} item={result}/>
		});
		console.log(this.props.searchFocused);
		return (
			<div className={this.props.searchFocused ? styles.resultsBox : styles.hiddenBox}>
				{results}
			</div>
		);
	}
}

export default SearchResults;
