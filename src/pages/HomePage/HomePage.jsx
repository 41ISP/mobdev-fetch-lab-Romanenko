import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import './HomePage.css';
import { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';

function HomePage() {
  const [query, setQuery] = useState("")
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  async function handleSearch(event) {
    event.preventDefault();
    setError(null)
    setIsLoading(true)
    try{
    const apiKey = import.meta.env.VITE_OMDB_API_KEY;
    const response = await fetch(`https://www.omdapi.com/?apikey=${apikey}&s=${query}`)
    const data = await response.json();
    if (data.Response === "False") {
    setError(data.Error);
    setMovies([])
    }else {
      setMovies(data.Search);
    }
  } catch(err) {
    setError("Не удалось связаться с сервером");
    setMovies([])
  }finally {
  setIsLoading(false);
  }
    
  }
  
  return (
    <main className="home-page">
      <div className="container home-page__inner">
        <SearchBar query = {query} setQuery = {setQuery} onSearch={handleSearch}/>

        <section className="home-page__section">
          <h2 className="home-page__section-title">Результат поиска</h2>
          {isLoading && <Loader label="Ищем фильмы..."/>}
          {isLoading && error && <ErrorMessage message ={error}/>}
          {isLoading && !error && movies.length > 0 && (
          <MovieList movies={movies}/>
          )}
          {!isLoading && !error && movies.length === 0 && query && (
            <p className="home-page__empty">По вашему запросу ничего не найдено</p>
          )}
          <MovieList />
        </section>
      </div>
    </main>
  );
}

export default HomePage;