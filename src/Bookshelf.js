import React from 'react';
import BookshelfChanger from './BookshelfChanger.js';

function Bookshelf(props) {
	return(
		<div className="bookshelf">
			{props.title !== "" && <h2 className="bookshelf-title">{props.title}</h2>}
      <div className="bookshelf-books">
        <ol className="books-grid">
          {Array.isArray(props.book_list) && props.book_list.map((book) => (
          	<li key={book.id}>
	            <div className="book">
	              <div className="book-top">
	                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url({book.image_url})' }}></div>
	                <BookshelfChanger
	                	book={book}
	                	change_shelf={props.change_shelf}/>
	              </div>
	              <div className="book-title">{book.title}</div>
	              <div className="book-authors">{book.author}</div>
	            </div>
	          </li>
          ))}
        </ol>
      </div>
    </div>
	);
}

export default Bookshelf;
