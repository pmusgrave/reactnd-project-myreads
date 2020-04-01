import React from 'react';
import Bookshelf from './Bookshelf.js';

function SearchResults(props) {
	if (props.query != '' && (props.list.length === 0 || props.list.length === undefined)) {
		return(
			<div className="search-books-results">
	      <p>No Results Found</p>
	    </div>
		);	
	}
	return(
		<div className="search-books-results">
      <Bookshelf
        title=""
        book_list={props.list}
        change_shelf={props.change_shelf}/>
    </div>
	);
}

export default SearchResults;
