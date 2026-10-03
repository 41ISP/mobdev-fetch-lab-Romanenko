import { useNavigate, useParams, Link } from 'react-router-dom';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import './MovieDetailsPage.css';

function MovieDetailsPage() {
  const { imdbID } = useParams()
  const navigate = useNavigate()
  return (
    <main className="movie-details-page">
      <div className="container">
      <button onClick={()=> navigate(-1)}> Назад</button>
        <MovieDetails />
      </div>
    </main>
  );
}

export default MovieDetailsPage;
