import React from 'react';
import { Switch,Route,Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks.js';
import SearchPage from './SearchPage.js';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    shelves: {
      currentlyReading: [],
      wantToRead: [],
      read: [],  
    },
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      let currentlyReading = Object.values(books).filter((book) => ( book.shelf === "currentlyReading" ));
      let wantToRead = Object.values(books).filter((book) => ( book.shelf === "wantToRead" ));
      let read = Object.values(books).filter((book) => ( book.shelf === "read" ));

      this.setState((prev_state) => ({
        shelves:
        {
          currentlyReading: currentlyReading,
          wantToRead: wantToRead,
          read: read,  
        }
      }));
    });
  }

  change_shelf = (book, shelf) => {
    if (book.shelf === shelf) {
      return;
    }
    else if (shelf === "none") {
      if (book.shelf === "none" || book.shelf === undefined) {
        return;
      }
      let shelves_copy = {...this.state.shelves};
      let prev_shelf = [...this.state.shelves[book.shelf]];
      let prev_index = prev_shelf.indexOf(book);
      prev_shelf.splice(prev_index, 1);

      shelves_copy[book.shelf] = prev_shelf;

      this.setState((prev_state) => ({
        ...prev_state,
        shelves: shelves_copy,
      }));

      BooksAPI.update(book, shelf);
      return;
    }
    else{
      let shelves_copy = {...this.state.shelves};
      let prev_shelf;
      if (book.shelf != undefined) {
        prev_shelf = [...this.state.shelves[book.shelf]];
        let prev_index = prev_shelf.indexOf(book);
        prev_shelf.splice(prev_index, 1);
        shelves_copy[book.shelf] = prev_shelf;
      }
      
      let new_shelf = [...this.state.shelves[shelf]];
      let updated_book = {...book};
      updated_book.shelf = shelf;
      new_shelf = new_shelf.concat(updated_book);
      shelves_copy[shelf] = new_shelf;

      this.setState((prev_state) => ({
        ...prev_state,
        shelves: shelves_copy,
      }));

      BooksAPI.update(book, shelf);
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path="/search">
          <SearchPage change_shelf={this.change_shelf.bind(this)}/>
        </Route>

        <Route exact path="/">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <ListBooks
              currentlyReading={this.state.shelves["currentlyReading"]}
              wantToRead={this.state.shelves["wantToRead"]}
              read={this.state.shelves["read"]}
              change_shelf={this.change_shelf.bind(this)}/>
            <div className="open-search">
              <Link to="/search">
                <button>Add a book</button>
              </Link>
            </div>
          </div>
        </Route>
      </Switch>
    )
  }
}

export default BooksApp;
