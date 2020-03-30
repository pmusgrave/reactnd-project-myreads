import React from 'react';
import Bookshelf from './Bookshelf.js';

function ListBooks(props) {
  return(
    <div className="list-books-content">
      <div>
        <Bookshelf
          title="Currently Reading"
          book_list={props.currentlyReading}
          change_shelf={props.change_shelf}/>
        <Bookshelf
          title="Want to Read"
          book_list={props.wantToRead}
          change_shelf={props.change_shelf}/>
        <Bookshelf
          title="Read"
          book_list={props.read}
          change_shelf={props.change_shelf}/>
      </div>
    </div>
  );
}

export default ListBooks;
