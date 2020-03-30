import React from 'react';

function BookshelfChanger(props) {
	return(
		<div className="book-shelf-changer">
      <select onChange={(event) => {props.change_shelf(props.book, event.target.value)}}>
        <option value="move" disabled>Move to...</option>
        <option value="currently_reading">Currently Reading</option>
        <option value="want_to_read">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
	);
}

export default BookshelfChanger;
