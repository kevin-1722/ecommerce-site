import React, { useState, useEffect } from 'react';
import { useAppContext } from './appContext';

const SearchAndFilter = () => {
  const [query, setQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const { 
    handleSearch, 
    products,
    handleFilterAndSort 
  } = useAppContext();

  // Trigger filtering whenever any parameter changes
  useEffect(() => {
    handleFilterAndSort(query, categoryFilter, sortOption);
  }, [query, categoryFilter, sortOption]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    handleSearch(searchTerm);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategoryFilter(selectedCategory);
  };

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSortOption(selectedSort);
  };

  // Get unique categories from products
  const categories = [...new Set(products.map(product => product.category))];

  return (
    <div className="search-and-filter-container">
      <div className="search-and-filter-wrapper">
        <div className="search-container">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search products..."
            className="search-input"
          />
        </div>
        <div className="filter-container">
          <select 
            value={categoryFilter} 
            onChange={handleCategoryChange}
            className="filter-dropdown"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select 
            value={sortOption} 
            onChange={handleSortChange}
            className="sort-dropdown"
          >
            <option value="">Sort By</option>
            <option value="nameAsc">Name (A-Z)</option>
            <option value="nameDesc">Name (Z-A)</option>
            <option value="priceDesc">Price (Highest to Lowest)</option>
            <option value="priceAsc">Price (Lowest to Highest)</option>
            <option value="idAsc">ID (Lowest to Highest)</option>
            <option value="idDesc">ID (Highest to Highest)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;