import React from 'react';
import './styles/main.scss'; 
import { Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Home from './components/Home';
import Teams from './components/Teams';
import Type from './components/Type';
import SearchResult from './components/SearchResult';
import Pokemon from './components/Pokemon';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = React.useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchInput = form.elements.search.value.trim();
    if (searchInput) {
      navigate(`/searchresults/${searchInput}`);
    }
  };

  React.useEffect(() => {
    if (location.pathname === '/') {
      if (searchRef.current) {
        searchRef.current.value = '';
      }
    }
  }, [location]);

  return (
    <>
      <header>
        <Link to="/" className="logo">UIN POKEDEX</Link>
        <nav>
          <Link to="/teams">Teams</Link>
        </nav>
        <form className="search" onSubmit={handleSearch}>
          <input type="text" name="search" placeholder="Søk etter pokemon" ref={searchRef} />
          <button type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/type/:typeName" element={<Type />} />
        <Route path="/searchresults/:pokemonName" element={<SearchResult />} />
        <Route path="/pokemons/:pokemonName" element={<Pokemon />} />
      </Routes>
    </>
  );
}

export default App;
