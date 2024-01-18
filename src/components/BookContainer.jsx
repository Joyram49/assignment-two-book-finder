import { useState } from "react";
import jsonData from "../data/db.json";
import BookList from "./books/BookList";
import Header from "./header/Header";

export default function BookContainer() {
  const [books, setBooks] = useState(jsonData);

  // search books according to user searched text
  const handleSearch = (searchText) => {
    const searchedBooks = books.filter((book) =>
      book.name.toLowerCase().trim().includes(searchText.toLowerCase().trim())
    );
    setBooks([...searchedBooks]);
  };

  //  sort books according to user preferene
  const handleSort = (type) => {
    let tempDB = [...books];

    switch (type) {
      case "name_asc":
        tempDB.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_desc":
        tempDB.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "year_asc":
        tempDB.sort((a, b) => {
          const yearA = new Date(a.published).getFullYear();
          const yearB = new Date(b.published).getFullYear();
          return yearA - yearB;
        });
        break;
      case "year_desc":
        tempDB.sort((a, b) => {
          const yearA = new Date(a.published).getFullYear();
          const yearB = new Date(b.published).getFullYear();
          return yearB - yearA;
        });
        break;
      default:
        break;
    }
    setBooks([...tempDB]);
  };

  // toggled favourite books
  const handleFavourite = (id) => {
    const filterdBooks = books.map((book) => {
      if (book.id === id) {
        return {
          ...book,
          isFavourite: !book.isFavourite,
        };
      } else {
        return book;
      }
    });
    setBooks([...filterdBooks]);
  };

  return (
    <main className='my-10 lg:my-14'>
      <Header onSort={handleSort} onSearch={handleSearch} />
      <BookList books={books} onFavourite={handleFavourite} />
    </main>
  );
}
