import React, { Component } from 'react';
import ResultItem from './ResultItem';

class SearchResults extends Component {
	render(){
		var results = this.props.searchResults.map(function(result){
			return <ResultItem key={result.id} item={result}/>
		});
		return (
			<div>
				{results}
			</div>
		);
	}
}

export default SearchResults;
