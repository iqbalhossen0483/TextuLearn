import { FiSearch } from "react-icons/fi";

export default function BookSearch() {
  return (
    <div className='mb-8'>
      <div className='relative'>
        <input
          type='text'
          placeholder='Search book'
          className='w-full px-4 py-3 border border-divider rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
        />
        <button
          type='button'
          className='absolute inset-y-0 right-0 flex items-center justify-center px-4 py-3 bg-primary text-white rounded-r-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
        >
          <FiSearch className='h-5 w-5' />
        </button>
      </div>
    </div>
  );
}
