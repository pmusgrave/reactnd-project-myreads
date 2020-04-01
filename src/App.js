import React from 'react';
import { Switch,Route,Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks.js';
import SearchPage from './SearchPage.js';

class BooksApp extends React.Component {
  state = {
    shelves: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    },
    query: "",
    query_results: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      let currentlyReading = Object.values(books).filter((book) => ( book.shelf === "currentlyReading" ));
      let wantToRead = Object.values(books).filter((book) => ( book.shelf === "wantToRead" ));
      let read = Object.values(books).filter((book) => ( book.shelf === "read" ));

      this.setState((prev_state) => ({
        shelves:
        {
          currentlyReading,
          wantToRead,
          read, 
        }
      }));
    });
  }

  update_query = (query) => {
    this.setState((prev_state) => ({
      query,
    }));
  }

  update_query_results = (value) => {
    if (value === "") {
      this.setState((prev_state) => ({
        query_results: [],
      }));
      return;
    }

    BooksAPI.search(value)
    .then((data) => {
      data.forEach(book => {
        this.state.shelves.currentlyReading.filter((b) => book.id === b.id).map((match) => {
          book.shelf = "currentlyReading";
          console.log(book.id)
        })
        this.state.shelves.wantToRead.filter((b) => book.id === b.id).map((match) => {
          book.shelf = "wantToRead";
          console.log(book.id)
        })
        this.state.shelves.read.filter((b) => book.id === b.id).map((match) => {
          book.shelf = "read";
          console.log(book.id)
        })
      });

      this.setState((prev_state) => ({
        query_results: data
      }));
    },
    (err) => {
      console.log(err);
    });
  }

  change_shelf = (book, shelf) => {
    let current_shelf;
    let new_shelf;
    let shelves_copy = {...this.state.shelves};
    let updated_book = {...book};

    if (book.shelf === undefined && shelf === "none") {
      return;
    }
    else if (book.shelf === shelf) {
      return;
    }
    else if (book.shelf === undefined && shelf !== "none") {
      current_shelf = [...this.state.query_results];
      let current_index = current_shelf.indexOf(book);
      new_shelf = [...this.state.shelves[shelf]];

      updated_book.shelf = shelf;
      new_shelf = new_shelf.concat(updated_book);
      current_shelf.splice(current_index, 1, updated_book);
      shelves_copy[shelf] = new_shelf;

      this.setState((prev_state) => ({
        ...prev_state,
        shelves: shelves_copy,
        query_results: current_shelf,
      }));

      BooksAPI.update(updated_book,updated_book.shelf)
      .then(this.update_query_results(this.state.query));
    }
    else if (book.shelf !== undefined && shelf !== "none") {
      current_shelf = [...this.state.shelves[book.shelf]];
      let current_index = current_shelf.indexOf(book);
      new_shelf = [...this.state.shelves[shelf]];

      updated_book.shelf = shelf;
      current_shelf.splice(current_index, 1);
      new_shelf = new_shelf.concat(updated_book);
      shelves_copy[shelf] = new_shelf;
      shelves_copy[book.shelf] = current_shelf;

      this.setState((prev_state) => ({
        ...prev_state,
        shelves: shelves_copy,
      }));

      BooksAPI.update(updated_book,updated_book.shelf)
      .then(this.update_query_results(this.state.query));
    }
    else if (book.shelf !== undefined && shelf === "none") {
      current_shelf = [...this.state.shelves[book.shelf]];
      let current_index = current_shelf.indexOf(book);

      updated_book.shelf = shelf;
      current_shelf.splice(current_index, 1);

      shelves_copy[book.shelf] = current_shelf;

      this.setState((prev_state) => ({
        ...prev_state,
        shelves: shelves_copy,
      }));

      BooksAPI.update(updated_book,updated_book.shelf)
      .then(this.update_query_results(this.state.query));
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path="/search">
          <SearchPage
            change_shelf={this.change_shelf.bind(this)}
            query={this.state.query}
            query_results={this.state.query_results}
            update_query={this.update_query.bind(this)}
            update_query_results={this.update_query_results.bind(this)}/>
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
