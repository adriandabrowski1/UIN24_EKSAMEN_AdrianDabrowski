import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Type() {
  const { typeName } = useParams();
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemonsByType = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${typeName}`);
      setPokemons(response.data.pokemon.map(p => p.pokemon));
    };

    fetchPokemonsByType();
  }, [typeName]);

  return (
    <main>
      <h1>{typeName} Type Pokemons</h1>
      <ul>
        {pokemons.map(pokemon => (
          <li key={pokemon.name}>
            <Link to={`/pokemons/${pokemon.name}`}>{pokemon.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}


