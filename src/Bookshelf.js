import React from 'react';
import BookshelfChanger from './BookshelfChanger.js';

function Bookshelf(props) {
	return(
		<div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.book_list.map((book) => (
          	<li key={book}>
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
