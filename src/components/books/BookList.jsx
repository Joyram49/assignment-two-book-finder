import BookItem from "./BookItem";

export default function BookList({ books = [], onFavourite }) {
  return (
    <div className='container mx-auto grid grid-cols-1 gap-8 max-w-7xl md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {books.map((data) => (
        <BookItem key={data.id} data={data} onFavourite={onFavourite} />
      ))}
    </div>
  );
}
