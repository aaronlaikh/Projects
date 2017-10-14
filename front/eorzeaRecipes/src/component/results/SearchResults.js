import React, { Component } from 'react';
import ResultItem from './ResultItem';
import styles from './css/SearchResults.css';

class SearchResults extends Component {
	render(){
		var results = this.props.searchResults.map((result) =>{
			return <ResultItem selectItem={this.props.addItem.bind(this)}  key={result.id} item={result}/>
		});
		return (
			<div className={styles.resultsBox}>
				{results}
			</div>
		);
	}
}

export default SearchResults;
