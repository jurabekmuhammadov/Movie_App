import { useEffect, useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard';
import {useDebounce} from "react-use";
import {getTrendingMovies, updateSearchCount} from "./appwrite.js";
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const [errorMessage, setErrorMessage] = useState("")
  
  const [movieList, setMovieList] = useState([]);

  const [trendingMovies, setTrendingMovies] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

const fetchMovies = async (query = "", page = 1) => {
  setIsLoading(true);
  setErrorMessage("");

  try {
    const endpoint = query
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;

    const response = await fetch(endpoint, API_OPTIONS);

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      setErrorMessage("No results found.");
      setMovieList([]);
      setTotalPages(0);
      return;
    }

    setMovieList(data.results);
    setTotalPages(data.total_pages || 1);

    if (query) {
      await updateSearchCount(query, data.results[0]);
    }

  } catch (error) {
    console.error(`Error fetching movies: ${error}`);
    setErrorMessage("Error fetching movies. Please try again later.");
  } finally {
    setIsLoading(false);
  }
};

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
      
    } catch (e) {
      console.error(`Error fetching trending movies: ${e}`);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm, currentPage)
  }, [debouncedSearchTerm, currentPage])

  useEffect(() => {
    loadTrendingMovies()
  }, [])

  useEffect(() => {
  setCurrentPage(1);
}, [debouncedSearchTerm]);

  return (
    <main>
      <div className='pattern'/>
      <div  className='wrapper'>
        <header>

          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className='text-gradient'>Movies</span> You&apos;ll Enjoy Without the Hassles</h1>
         <Search searchTerm = {searchTerm} setSearchTerm={setSearchTerm }/>
        </header>

        {trendingMovies.length > 0 && (
            <section className="trending">
                <h2>Trending Movies</h2>

              <ul>
                {trendingMovies.map((movie, index) => (
                  <Link to={`/movie/${movie.movie_id}`} key={movie.$id}>
                    <li>
                      <p>{index + 1}</p>
                        <img src={movie.poster_url} alt={movie.title} />
                    </li>
                  </Link>
                ))}
              </ul>
            </section>
        )}

        <section className='all-movies'>
          <h2>All Movies</h2>
          {isLoading ? (
            <Spinner/>
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>

            {movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
            </ul>
          )}
        </section>

          <div className='text-white flex justify-between my-9'>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className='disabled:opacity-30'
            >
              <IoArrowBack className='w-7 h-7'/>
            </button>
            <p><span>{currentPage}</span>/ {totalPages}</p>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className='disabled:opacity-30'
            >
              <IoArrowForward className='w-7 h-7'/>
            </button>
          </div>
        <span className="w-full h-[0.5px] bg-gray-400"></span>
        <div className="mt-1 flex justify-between items-center flex-wrap gap-1">
          <p className="text-gray-400 text-xs">Made by Jurabek Muhammadov</p>
          <p className="text-gray-400 text-xs">© Copyright 2024. All rights Reserved.</p>
        </div>
      </div>
    </main>
  )
}

export default App 