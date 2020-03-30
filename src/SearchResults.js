import React from 'react';
import Bookshelf from './Bookshelf.js';

function SearchResults(props) {
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
