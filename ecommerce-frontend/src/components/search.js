import React, { useState } from 'react';
import { useAppContext } from './appContext';

const Search = () => {
  const [query, setQuery] = useState('');
  const { handleSearch } = useAppContext();

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    handleSearch(searchTerm);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search shoe..."
        className="search-input"
      />
    </div>
  );
};

export default Search;