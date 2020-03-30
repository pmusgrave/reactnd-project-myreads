import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchBar from './SearchBar.js';
import SearchResults from './SearchResults.js';

class SearchPage extends Component {
	state = {
		query: "",
		query_results: [],
	};

	update_query = (value) => {
		if (value === "") {
			this.setState((prev_state) => ({
				query: value,
				query_results: [],
			}));
			return;
		}

		BooksAPI.search(value)
		.then((data) => {
			this.setState((prev_state) => ({
				query: value,
				query_results: data,
			}));
		},
		(err) => {
			console.log(err);
		});
	}

	render() {
		return (
			<div className="search-books">
	      <SearchBar
	      	query={this.state.query}
	      	update_query={this.update_query.bind(this)}/>
	      <SearchResults
	      	list={this.state.query_results}
	      	change_shelf={this.props.change_shelf}/>
	    </div>
		);
	}
}

export default SearchPage;
