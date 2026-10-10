import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './MovieDetailsPage.css';

function MovieDetailsPage() {
  const { imdbID } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imdbID) return;

    async function fetchMovie() {
      setIsLoading(true);
      setError(null);

      try {
        const apiKey = import.meta.env.VITE_OMDB_API_KEY;
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`
        );
        const data = await response.json();

        if (data.Response === "False") {
          setError(data.Error);
          setMovie(null);
        } else {
          setMovie(data);
        }
      } catch (err) {
        setError("Не удалось связаться с сервером");
        setMovie(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovie();
  }, [imdbID]);

  return (
    <main className="movie-details-page">
      <div className="container">
        <button className="movie-details__back" onClick={() => navigate(-1)}>
          ← Назад
        </button>

        {isLoading && <Loader label="Загружаем фильм..." />}
        {!isLoading && error && <ErrorMessage message={error} />}
        {!isLoading && !error && movie && <MovieDetails movie={movie} />}
      </div>
    </main>
  );
}

export default MovieDetailsPage;