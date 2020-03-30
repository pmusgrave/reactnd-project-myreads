import React from 'react';
import Bookshelf from './Bookshelf.js';

function ListBooks(props) {
  return(
    <div className="list-books-content">
      <div>
        <Bookshelf
          title="Currently Reading"
          book_list={props.currently_reading}
          change_shelf={props.change_shelf}/>
        <Bookshelf
          title="Want to Read"
          book_list={props.want_to_read}/>
        <Bookshelf
          title="Read"
          book_list={props.read}/>
      </div>
    </div>
  );
}

export default ListBooks;
