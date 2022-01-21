import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksList from './BooksList'
import { Route, Switch, Link } from 'react-router-dom'
import BookSearch from './BookSearch'

class BooksApp extends React.Component {
  state = {
    books: [],
  }
  //Chaning the shelf of the book
  changeBookShelf = (book, shelf)=>{
    BooksAPI.update(book, shelf).then(()=>{
      book.shelf = shelf;
      this.setState(prevState => ({
        books: prevState.books.filter(b=>b.id !== book.id).concat(book)
      }));
    });
  }
  //Fetching books' list on component load
  componentDidMount(){
    BooksAPI.getAll().then(b=>this.setState({
      books: b
    }));
  }
  render() {
    return (
      <div className="app">
        <Switch>
          {/*TODO: Add route for the book details page when done */}
          <Route exact path="/" render={()=>(
            <div>
              <BooksList search={false} books={this.state.books} changeBookShelf={this.changeBookShelf}/>
              <div className="open-search">
                <Link to="/search" className="open-search"><button></button></Link>
              </div>
            </div>
          )} />
          <Route path="/search" render={()=>(<BookSearch books={this.state.books} changeBookShelf={this.changeBookShelf}/>)} />
        </Switch>
      </div>
    )
  }
}
export default BooksApp
