import React from 'react';
import { Switch,Route,Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks.js';

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
    let shelves_copy = {...this.state.shelves};
    let prev_shelf = [...this.state.shelves[book.shelf]];
    let prev_index = prev_shelf.indexOf(book);

    if (book.shelf === shelf) {
      return;
    }
    else if (shelf === "none") {
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
      let new_shelf = [...this.state.shelves[shelf]];
      let updated_book = {...book};

      updated_book.shelf = shelf;

      prev_shelf.splice(prev_index, 1);
      new_shelf = new_shelf.concat(updated_book);

      shelves_copy[book.shelf] = prev_shelf;
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
        <Route exact path="/add">
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
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
              <Link to="/add">
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
