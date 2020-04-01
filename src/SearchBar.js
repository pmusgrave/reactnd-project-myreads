import React from 'react';
import { Link } from 'react-router-dom';

function SearchBar(props) {
	return(
		<div className="search-books-bar">
      <Link to="/">
      	<button className="close-search">Close</button>  
      </Link>
      <div className="search-books-input-wrapper">
        <input
        	type="text"
        	placeholder="Search by title or author"
        	text={props.query}
        	onChange={(event) => {
            props.update_query(event.target.value);
            props.update_query_results(event.target.value)}
          }/>
      </div>
    </div>
	);
}

export default SearchBar;
