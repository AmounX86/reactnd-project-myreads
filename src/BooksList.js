import React, { Component } from 'react';
import Shelf from './Shelf';

class BooksList extends Component {
  shelfNames = [
    { name: "currentlyReading", title: "Currently Reading"},
    { name: "wantToRead", title: "Want to Read"},
    { name: "read", title: "Read"},
    { name: "none", title: "None"},
  ]
  render() {
    return (
      <div>
        <div className="list-books">
          <div className="list-books-title"><h1>My reads</h1></div>
          <div className="list-books-content">
            {/* Normal books list */}
            {this.props.search ===false && this.shelfNames.map((shelf)=>{
              let filteredBooks=this.props.books.filter(b=>b.shelf===shelf.name);
              return(                  
                  <Shelf key={shelf.name} title={shelf.title} books={filteredBooks} changeBookShelf={this.props.changeBookShelf}/>                
              )
            })}
            {/*Search results books list it should be noted that we check first the presence of the book in any
            of our shelves and assign the shelf to the book to be displayed correctly */}
            { this.props.searched &&
              this.props.searched.map((k)=>{
                let testBook = this.props.books.filter(x=>x.id === k.id);
                if(testBook.length>0) {
                  k.shelf = testBook[0].shelf;
                }
                return true;
              })
            }
            {this.props.search === true &&
            this.shelfNames.map((shelf)=>{
              let filteredBooks=this.props.searched.filter(b=>b.shelf===shelf.name);
              if (shelf.name==="none"){
                filteredBooks = this.props.searched.filter(b=>b.shelf===undefined);
              }
              return(                  
                  <Shelf key={shelf.name} title={shelf.title} books={filteredBooks} changeBookShelf={this.props.changeBookShelf}/>                
              )
            })}
          </div>
        </div>
        <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
      </div>
    )
  }
}
export default  BooksList