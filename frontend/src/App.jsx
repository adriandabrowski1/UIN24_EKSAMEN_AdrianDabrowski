import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Teams from './components/Teams';
import Type from './components/Type';
import SearchResult from './components/SearchResult';
import Pokemon from './components/Pokemon';
import 'A'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/type/:typeName" element={<Type />} />
        <Route path="/searchresults/:pokemonName" element={<SearchResult />} />
        <Route path="/pokemons/:pokemonName" element={<Pokemon />} />
      </Routes>
    </Router>
  );
}

export default App;
