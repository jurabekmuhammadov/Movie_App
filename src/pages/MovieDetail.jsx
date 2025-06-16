import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { formatDate, formatNumberWithScale, formatRuntime } from '../functions';
import { IoArrowForward, IoChevronBack } from 'react-icons/io5';
import Spinner from '../components/SpinnerMovieDetails';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
            setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await fetch(`${API_BASE_URL}/movie/${id}`, API_OPTIONS);

        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }

        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error(error);
        setErrorMessage("Error fetching movie details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

   if (isLoading) return <Spinner />;

  if (errorMessage) return <p className="text-red-500">{errorMessage}</p>;

  if (!movie) return null;

  return (
    <div className="wrapper py-12 text-white">
      <div className='flex flex-col gap-2 sm:gap-4'>
        <div className='flex'>
          <Link to="/" className='flex items-center gap-1 px-2.5 py-1 sm:px-4 sm:py-2 bg-[#221F3D] rounded-lg text-base sm:text-lg'>
            <IoChevronBack/>
            <span>Home</span>
          </Link>
        </div>
        <div className='flex justify-between'>
          <h3 className="text-3xl sm:text-4xl font-bold">{movie.title}</h3>
            <div className='flex items-center gap-2'>
              <div className='hidden sm:flex items-center gap-1 px-2.5 py-1 sm:px-4 sm:py-2 bg-[#221F3D] rounded-lg'>
                <img src="/star.svg" alt="star icon" className='w-4 h-4 sm:w-5 sm:h-5' />
                  <p className='text-[#a8b5db] text-base sm:text-lg'>
                    <span className='text-white'>
                      {movie.vote_average.toFixed(1)}
                    </span>
                    /10 ({movie.vote_count})
                  </p>
              </div>
              <a href={movie.homepage} className='hidden md:flex items-center gap-1 text-[#121212] px-2.5 py-1 sm:px-4 sm:py-2 rounded-lg font-medium text-base sm:text-lg bg-linear-to-r from-[#D6C7FF] to-[#AB8BFF]'>
                <span>
                  Visit Homepage
                </span>
                <IoArrowForward className='w-5 h-5'/>
              </a>
            </div>

        </div>
        
        <div className='flex items-center gap-3'>
        <p className='flex items-center gap-2 text-lg sm:text-xl text-[#a8b5db]'>
          <span>{movie.release_date.split("-")[0]}</span>
          <span>
          •
          </span>
          <span>{formatRuntime(movie.runtime)}</span>
        </p>
                <div className='flex sm:hidden items-center gap-1 px-2.5 py-1 sm:px-4 sm:py-2 bg-[#221F3D] rounded-lg'>
                <img src="/star.svg" alt="star icon" className='w-4 h-4 sm:w-5 sm:h-5' />
                  <p className='text-[#a8b5db] text-[14px] xs:text-base'>
                    <span className='text-white'>
                      {movie.vote_average.toFixed(1)}
                    </span>
                    /10 ({movie.vote_count})
                  </p>
              </div>
        </div>
      </div>
      <div className='flex gap-3 md:gap-6 mt-6'>
        <div className='w-1/4 lg:h-[440px]'>
          <img
            className="w-full h-full object-cover rounded-xl"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            />
        </div>
        <div className='w-3/4 lg:h-[440px]'>
          <img
            className="w-full h-full object-cover rounded-xl"
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title}
            />
        </div>
      </div>
          <a href={movie.homepage} className='mt-5 flex md:hidden items-center justify-center gap-1 text-[#121212] px-2.5 py-1 sm:px-4 sm:py-2 rounded-lg font-medium text-base sm:text-lg bg-linear-to-r from-[#cfbdff] to-[#966dff]'>
            <span>
              Visit Homepage
            </span>
            <IoArrowForward className='w-5 h-5'/>
          </a>
      <table className="mt-5 sm:mt-10 text-left w-full text-sm xs:text-base md:text-lg">
        <tbody>
          <tr className=''>
            <td className="pr-6 py-2 md:pr-10 md:py-4 text-[#a8b5db] font-medium flex">
              <span className='text-nowrap'>
                  Genres :
              </span>
            </td>
            <td className='py-2 md:py-4'>
              {movie.genres.map((genre, i) => (
                <button className='mr-2 mb-2 px-3 md:px-4 py-1 font-semibold bg-[#221F3D] rounded-lg' key={i}>{genre.name}</button>
              ))}
            </td> 
          </tr>
          <tr className=''>
            <td className="pr-6 py-2 md:pr-10 md:py-4 text-[#a8b5db] font-medium flex">
              <span className='text-nowrap'>
                  Overview :
              </span>
            </td>
            <td className='py-2 md:py-4'>
              <p className='line-clamp-3 xs:line-clamp-none'>
              {movie.overview}
              </p>
              </td>  
          </tr>
          <tr className=''>
            <td className="pr-6 py-2 md:pr-10 md:py-4 text-[#a8b5db] font-medium flex">
              <span className='text-nowrap'>
                  Release date :
              </span>
            </td>
            <td className='py-4 font-semibold text-[#D6C7FF]'>{formatDate(movie.release_date)}</td>
          </tr>
          <tr className=''>
            <td className="pr-6 py-2 md:pr-10 md:py-4 text-[#a8b5db] font-medium flex">
              <span className='text-nowrap'>
                  Countries :
              </span>
            </td>
            <td className='py-2 md:py-4'>
              {movie.production_countries.map((country, i) => (
                <span className='text-[#D6C7FF] font-semibold' key={i}>{country.name}, </span>
              ))}
            </td>
          </tr>
          <tr className=''>
            <td className="pr-6 py-2 md:pr-10 md:py-4 text-[#a8b5db] font-medium flex">
              <span className='text-nowrap'>
                  Status :
              </span>
            </td>
            <td className='py-2 md:py-4'>
              <span className='text-[#D6C7FF] font-semibold'>
                {movie.status}
              </span>
            </td>
          </tr>
          <tr className=''>
            <td className="pr-6 py-2 md:pr-10 md:py-4 text-[#a8b5db] font-medium flex">
              <span className='text-nowrap'>
                  Language :
              </span>
            </td>
            <td className='py-2 md:py-4'>
              {movie.spoken_languages.map((lang, i) => (
                <span className='text-[#D6C7FF] font-semibold' key={i}>{lang.english_name} ({lang.name}), </span>
              ))}
            </td>
          </tr>
          <tr className=''>
            <td className="pr-6 py-2 md:pr-10 md:py-4 text-[#a8b5db] font-medium flex">
              <span className='text-nowrap'>
                  Budget :
              </span>
            </td>
            <td className='py-2 md:py-4'>
              <span className='text-[#D6C7FF] font-semibold'>
                {movie.budget > 0 ? formatNumberWithScale(movie.budget) : "N/A"}
              </span>
            </td>
          </tr>
          <tr className=''>
            <td className="pr-6 py-2 md:pr-10 md:py-4 text-[#a8b5db] font-medium flex">
              <span className='text-nowrap'>
                  Revenue :
              </span>
            </td>
            <td className='py-2 md:py-4'>
              <span className='text-[#D6C7FF] font-semibold'>
                {movie.revenue ? formatNumberWithScale(movie.revenue) : "N/A"}
              </span>
            </td>
          </tr>
          <tr className=''>
            <td className="pr-6 py-2 md:pr-10 md:py-4 text-[#a8b5db] font-medium flex">
              <span className='text-nowrap'>
                  Tagline :
              </span>
            </td>
            <td className='py-2 md:py-4'>
              <span className='text-[#D6C7FF] font-semibold'>
                {movie.tagline ? movie.tagline : "N/A"}
              </span>
            </td>
          </tr>
          <tr className=''>
            <td className="pr-6 py-2 md:pr-10 md:py-4 text-[#a8b5db] font-medium flex">
              <span className='text-nowrap'>
                  Studios :
              </span>
            </td>
            <td className='py-2 md:py-4'>
              {movie.production_companies.map((company) => (
                <span className='text-[#D6C7FF] font-semibold' key={company.id}>{company.name}, </span>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MovieDetail;
