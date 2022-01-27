import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import BooksList from './BooksList';

class BookSearch extends Component {
    state={
        searchResult: [],
        searchString: "", 
    }
    
    search = async event=>{
      const searchString = event.target.value;
      this.setState({searchString});
      if(searchString.length>0){
        console.log(searchString);
        BooksAPI.search(searchString).then((b)=>{
          this.setState({searchResult: b});
        });
      }
      else{
        this.setState({searchResult:[]})
      }
    }
    // search = event => {    
    //   this.setState({searchString: event.target.value});
    //     //Taking input from user
    //     if (this.state.searchString) {
    //       BooksAPI.search(this.state.searchString).then((b) => {
    //         this.setState({searchResult: b});
    //       }
    //       );
    //       // if query is empty clear the state search result
    //     } else this.setState({ searchResult: []});
    //   }
    render() {
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">
                Back
              </Link>
              <div className="search-books-input-wrapper">
                <input
                  type="text" value={this.state.searchString}
                  placeholder="Search by title or author"
                  onChange={this.search}
                />
              </div>
            </div>
            <div className="search-books-results">
            <h4>Search returned {this.state.searchResult.length} books</h4>
            {/*Using the BooksList component to display books list it should be noted that a boolean property 
            is used to determine wheather it's a search or just the normal books' list*/}
              {this.state.searchResult.length>0 &&(
                <BooksList books={this.props.books} search={true} searched={this.state.searchResult} changeBookShelf={this.props.changeBookShelf}/>
              )}
            </div>
          </div>
        )
    }
}

export default BookSearch;