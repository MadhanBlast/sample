import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { IoClose } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

export default function SearchPage() {
  const searchInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Automatically focus on input field after the component has mounted
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search term submitted:", searchTerm);
  };

  return (
    <>
      <Head>
        <title>Search | My Website</title>
      </Head>
      <div className="search-page-container">
        <div className="search-container">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              ref={searchInputRef}
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Type to search..."
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>
          {searchTerm && (
            <div className="search-results">
              <p>Searching for: {searchTerm}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
