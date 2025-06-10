import BookList from "@/components/books/BookList";
import BookSearch from "@/components/books/BookSearch";

export default function BooksPage() {
  return (
    <div className='bg-gray-50'>
      <div className='container mx-auto px-4 py-8 '>
        <BookSearch />
        <BookList />
      </div>
    </div>
  );
}
