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
    currently_reading: [],
    want_to_read : [],
    read: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books: books,
      }));
    });
  }

  change_shelf = (book, shelf) => {
    console.log(book,shelf);
    let updated_book = {}; 
    Object.assign(updated_book, book);
    updated_book.current_shelf = shelf;
    console.log(updated_book,shelf);
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
              currently_reading={this.state.currently_reading}
              want_to_read={this.state.want_to_read}
              read={this.state.read}
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
