import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=9');
      setPokemons(response.data.results);
    };

    const fetchTypes = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/type');
      setTypes(response.data.results);
    };

    fetchPokemons();
    fetchTypes();
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <main>
      <section className="home-section">
        <h2>Main Pokemons</h2>
        <ul>
          {pokemons.map(pokemon => (
            <li key={pokemon.name}>
              <Link to={`/pokemons/${pokemon.name}`}>{capitalizeFirstLetter(pokemon.name)}</Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="home-section">
        <h2>Types</h2>
        <ul>
          {types.map(type => (
            <li key={type.name}>
              <Link to={`/type/${type.name}`}>{capitalizeFirstLetter(type.name)}</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
