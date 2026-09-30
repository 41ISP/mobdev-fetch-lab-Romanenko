import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import './HomePage.css';
import { useState } from 'react';

const [query, setQuery] = useState("")
function HomePage() {
  return (
    <main className="home-page">
      <div className="container home-page__inner">
        <SearchBar />

        <section className="home-page__section">
          <h2 className="home-page__section-title">Результат поиска</h2>
          <MovieList />
        </section>
      </div>
    </main>
  );
}

export default HomePage;