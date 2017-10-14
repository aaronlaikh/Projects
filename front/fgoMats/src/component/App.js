import React, { Component } from 'react';
import SearchBar from '../component/searchbar/SearchBar';
import styles from '../index.css';

class App extends Component {
	render(){
		return (
			<div className="app">
			<SearchBar />
			</div>
		);
	}
}

export default App;
