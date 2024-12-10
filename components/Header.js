import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { IoClose } from "react-icons/io5";
import { BiSearch } from "react-icons/bi";
import { FaHome, FaSearch, FaTv, FaPlay, FaFilm, FaBars, FaStar } from "react-icons/fa";
import useFectchData from "@/hooks/useFetchData";

export default function Header() {

    // navbar header component scroll sticky
    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector('nav');
            header.classList.toggle("sticky", window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    // functions for navlist item page routing active status
    const router = useRouter();
    const [clicked, setClicked] = useState(false);
    const [navbar, setNavbar] = useState(false);
    const [searchbar, setSearchbar] = useState(false);

    const [activeLink, setActiveLink] = useState('/');

    // search function by title of the movie
    const [movieshortname, setMovieshortname] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [error, setError] = useState(null);
    // fetch data from api
    const { alldata, loading } = useFectchData(`/api/getmovies`);

    // filter from published movies required
    const publishedData = alldata.filter(ab => ab.status === "publish");

    // function to handle search
    useEffect(() => {
        if (!movieshortname.trim()) {
            setSearchResult([]);
            return;
        }

        const filteredMovies = publishedData.filter(movie => movie.title.toLowerCase().includes(movieshortname.toLowerCase()));

        setSearchResult(filteredMovies);
    }, [movieshortname]);

    const handleMovieClick = () => {
        setMovieshortname('');
    }

    const searchRef = useRef(null);

    // function for when clcik outside of the search bar will be close
    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setMovieshortname('');

        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    })

    const handleClick = () => {
        setClicked(!clicked);
    }

    const handleLinkClick = (Link) => {
        setActiveLink(Link);
        setClicked(false);
    }

    useEffect(() => {
        // Update active link state when the page is reloaded
        setActiveLink(router.pathname);
    }, [router.pathname]);

    // navbar
    const handleNabarOpen = () => {
        setNavbar(!navbar);
    }

    const handleNabarClose = () => {
        setNavbar(false);
    }

    // searchbar
    

    const handleSearchbarClose = () => {
        setSearchbar(false);
    }
    const searchInputRef = useRef(null);

  const handleSearchbarOpen = () => setSearchbar(true);
    
    return <>
        <nav className="header">
  <h1 className="logo1" data-text="&nbsp;Anime in Telugu&nbsp;">
    <a>Anime in Telugu&nbsp;</a>
  </h1>

  {/* Search Bar */}
  <form className={searchbar ? "search_bar active" : "search_bar"} ref={searchRef}>
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
        <ul>
          {searchResult.length > 0 ? (
            searchResult.slice(0, 20).map((movie) => (
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
                      alt="image"
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
            ))
          ) : (
            <p>No Movie Found</p>
          )}
        </ul>
      </div>
    )}
  </form>

    <div className="bottom-navigation">
      <ul>
        <li>
          <Link href="/" onClick={handleSearchbarClose}>
            <FaHome />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <button onClick={handleSearchbarOpen}>
            <FaSearch />
            <span>Search</span>
          </button>
        </li>
        <li>
          <Link href="/series" onClick={handleSearchbarClose}>
            <FaTv />
            <span>Series</span>
          </Link>
        </li>
        <li>
          <Link href="/Anime" onClick={handleSearchbarClose}>
            <FaPlay />
            <span>Anime</span>
          </Link>
        </li>
        <li>
          <Link href="/films" onClick={handleSearchbarClose}>
            <FaFilm />
            <span>Movies</span>
          </Link>
        </li>
      </ul>

      
    </div>
</nav>
        
        

                


    </>
}
