import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ShelfChanger from './ShelfChanger';
//This component to display each book
class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired
    }
  render() {
    return (
    <div className='book'>
        <div className='book-top'>
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+ this.props.book.imageLinks.smallThumbnail+')' }}></div>
            <ShelfChanger changeBookShelf={this.props.changeBookShelf} book={this.props.book}/>
        </div>
        <div className="book-title">{this.props.book.title}</div>
            {/*Listing the array of authors */}
            {Array.isArray(this.props.book.authors) &&
            this.props.book.authors.map(a=>(
                <div className="book-authors" key={a}>{a}</div>
            ))}
    </div>
    )
  }
}
export default Book
