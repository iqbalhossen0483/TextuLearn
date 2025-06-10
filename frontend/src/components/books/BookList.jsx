import BookCard from "./BookCard";

// Placeholder data for books
const placeholderBooks = [
  {
    id: 1,
    title: "Book Title 1",
    imageUrl: "/book_thumbnail.jpg",
  },
  {
    id: 2,
    title: "Book Title 2",
    imageUrl: "/book_thumbnail.jpg",
  },
  {
    id: 3,
    title: "Book Title 3",
    imageUrl: "/book_thumbnail.jpg",
  },
  // Add more placeholder books if needed
];

export default function BookList() {
  // In a real application, you would fetch books from an API
  const books = placeholderBooks;

  if (books.length === 0) {
    return <p className='text-center text-secondary-text'>No books found.</p>;
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
