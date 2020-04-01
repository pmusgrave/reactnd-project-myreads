import React from 'react';
import SearchBar from './SearchBar.js';
import SearchResults from './SearchResults.js';

function SearchPage(props) {
	return (
		<div className="search-books">
			<SearchBar
				query={props.query}
				update_query={props.update_query}
				update_query_results={props.update_query_results}/>
			<SearchResults
				query={props.query}
				list={props.query_results}
				change_shelf={props.change_shelf}/>
		</div>
	);
}

export default SearchPage;
