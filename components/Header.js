import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { IoClose } from "react-icons/io5";
import { BiSearch } from "react-icons/bi";
import { FaHome, FaSearch, FaTv, FaPlay, FaFilm, FaBars, FaStar } from "react-icons/fa";
import useFetchData from "@/hooks/useFetchData";

export default function Header() {
    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector('nav');
            header.classList.toggle("sticky", window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const router = useRouter();
    const [clicked, setClicked] = useState(false);
    const [navbar, setNavbar] = useState(false);
    const [searchbar, setSearchbar] = useState(false);

    const [activeLink, setActiveLink] = useState('/');

    const [movieshortname, setMovieshortname] = useState('');
    const [searchResult, setSearchResult] = useState(null);

    const { alldata, loading } = useFetchData(`/api/getmovies`);
    const publishedData = (alldata || []).filter((ab) => ab.status === "publish");

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

    const handleMovieClick = () => setMovieshortname('');

    const searchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setMovieshortname('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleSearchbar = () => setSearchbar(!searchbar);

    const handleLinkClick = (link) => {
        setActiveLink(link);
        setClicked(false);
    };

    useEffect(() => {
        setActiveLink(router.pathname);
    }, [router.pathname]);

    return (
        <>
            <nav className="header">
                <h1 className="logo1" data-text="&nbsp;Anime in Telugu&nbsp;">
                    <a>Anime in Telugu&nbsp;</a>
                </h1>

                <div className="bottom-navigation">
                    <ul>
                        <li>
                            <Link href="/" onClick={() => setSearchbar(false)}>
                                <FaHome />
                                <span>Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/search">
                                <FaSearch />
                                <span>Search</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/series" onClick={() => setSearchbar(false)}>
                                <FaTv />
                                <span>Series</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/Anime" onClick={() => setSearchbar(false)}>
                                <FaPlay />
                                <span>Anime</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/films" onClick={() => setSearchbar(false)}>
                                <FaFilm />
                                <span>Movies</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}
