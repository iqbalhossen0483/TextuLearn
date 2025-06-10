/* eslint-disable @next/next/no-img-element */
export default function BookCard({ book }) {
  return (
    <div className='border border-divider rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200'>
      <div className='aspect-w-3 aspect-h-4 bg-gray-200'>
        <img
          src={book.imageUrl}
          alt={book.title}
          className='object-cover w-full h-full'
        />
      </div>
      <div className='p-4'>
        <h3
          className='text-lg font-semibold text-primary-dark truncate'
          title={book.title}
        >
          {book.title}
        </h3>
        {/* Add more book details here if needed, e.g., author, short description */}
      </div>
    </div>
  );
}
