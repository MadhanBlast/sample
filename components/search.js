import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

import useFectchData from "@/hooks/useFetchData";

export default function Search() {
  // State management
  const [clicked, setClicked] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [searchbar, setSearchbar] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const [movieshortname, setMovieshortname] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(null);

  const { alldata, loading } = useFectchData(`/api/getmovies`);

  // Filter published movies
  const publishedData = alldata?.filter((movie) => movie.status === "publish") || [];

  // Handle search
  useEffect(() => {
    if (!movieshortname.trim()) {
      setSearchResult([]);
      return;
    }

    const filteredMovies = publishedData.filter((movie) =>
      movie.title.toLowerCase().includes(movieshortname.toLowerCase())
    );

    setSearchResult(filteredMovies);
  }, [movieshortname, publishedData]);

  // Handle outside click
  const searchRef = useRef(null);

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearchbar(false);
      setMovieshortname("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchbarOpen = () => setSearchbar(true);
  const handleSearchbarClose = () => setSearchbar(false);

  const handleMovieClick = () => setMovieshortname("");

  const router = useRouter();

  useEffect(() => {
    setActiveLink(router.pathname);
  }, [router.pathname]);

  const handleNavbarOpen = () => setNavbar(!navbar);
  const handleNavbarClose = () => setNavbar(false);

  return (
    <>
      {/* Search Bar UI */}
      <div className={searchbar ? "search_bar active" : "search_bar"} ref={searchRef}>
        <nav className="header">
          <input
            type="text"
            placeholder="Search here..."
            value={movieshortname}
            onChange={(e) => setMovieshortname(e.target.value)}
          />
          <div className="searchclose" onClick={handleSearchbarClose}>
            <IoClose />
          </div>

          {movieshortname && (
            <div className="search_results">
              {loading ? (
                <p>Loading...</p>
              ) : searchResult.length > 0 ? (
                <ul>
                  {searchResult.slice(0, 20).map((movie) => (
                    <Link
                      onClick={handleMovieClick}
                      key={movie._id}
                      href={`/movies/${movie.slug}`}
                    >
                      <div className="moviesearchlist">
                        <div>
                          <img
                            src={movie.smposter}
                            width={80}
                            height={110}
                            alt={movie.title}
                          />
                        </div>
                        <div className="searchbarinfo">
                          <h5>{movie.title}</h5>
                          <h4>
                            Rating: <FaStar />
                            <span>{movie.rating}</span>
                          </h4>
                          <h4>Release Year: {movie.year}</h4>
                        </div>
                      </div>
                    </Link>
                  ))}
                </ul>
              ) : (
                <p>No Movies Found</p>
              )}
            </div>
          )}
        </nav>
      </div>
    </>
  );
}
