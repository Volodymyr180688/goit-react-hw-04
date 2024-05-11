 import { useState } from 'react';
import toast from 'react-hot-toast';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      try {
        await onSubmit(query);
        setQuery('');
        setError('');
      } catch (error) {
        setError('Whoops. Something went wrong! Please try again.');
        toast.error('Whoops. Something went wrong! Please try again.');
      }
    } else {
      setError('Please enter a search query');
      toast.error('Please enter a search query');
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (error !== '') {
      setError('');
    }
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
    </header>
  );
};

export default SearchBar; 