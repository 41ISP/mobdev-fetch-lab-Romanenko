import { Link } from 'react-router-dom';
import LikeButton from '../LikeButton/LikeButton';
import RatingBadge from '../RatingBadge/RatingBadge';
import './MovieDetails.css';

function MovieDetails({ movie }) {
  if (!movie) return null;

  return (
    <article className="movie-details">
      <Link to="/" className="movie-details__back">
        ← Ко всем фильмам
      </Link>

      <div className="movie-details__layout">
        <div className="movie-details__poster-col">
          {movie.Poster !== "N/A" ? (
            <img
              className="movie-details__poster"
              src={movie.Poster}
              alt={movie.Title}
            />
          ) : (
            <div className="movie-details__poster movie-details__poster--placeholder">
              Постер отсутствует
            </div>
          )}
        </div>

        <div className="movie-details__main">
          <div className="movie-details__heading">
            <div>
              <h1 className="movie-details__title">{movie.Title}</h1>
              <p className="movie-details__meta">
                {movie.Year} · {movie.Rated} · {movie.Runtime}
              </p>
            </div>
            <LikeButton />
          </div>

          <p className="movie-details__genre">{movie.Genre}</p>
          <p className="movie-details__plot">{movie.Plot}</p>

          <div className="movie-details__ratings">
            {movie.Ratings &&
              movie.Ratings.map((rating) => (
                <RatingBadge
                  key={rating.Source}
                  source={rating.Source}
                  value={rating.Value}
                />
              ))}
          </div>

          <dl className="movie-details__facts">
            <div className="movie-details__fact"><dt>Режиссёр</dt><dd>{movie.Director}</dd></div>
            <div className="movie-details__fact"><dt>Сценарий</dt><dd>{movie.Writer}</dd></div>
            <div className="movie-details__fact"><dt>В ролях</dt><dd>{movie.Actors}</dd></div>
            <div className="movie-details__fact"><dt>Дата выхода</dt><dd>{movie.Released}</dd></div>
            <div className="movie-details__fact"><dt>Язык</dt><dd>{movie.Language}</dd></div>
            <div className="movie-details__fact"><dt>Страна</dt><dd>{movie.Country}</dd></div>
            <div className="movie-details__fact"><dt>Награды</dt><dd>{movie.Awards}</dd></div>
            <div className="movie-details__fact"><dt>Сборы</dt><dd>{movie.BoxOffice}</dd></div>
          </dl>
        </div>
      </div>
    </article>
  );
}

export default MovieDetails;