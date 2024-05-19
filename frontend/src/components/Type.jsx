import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
    <div>
      <h1>{typeName} Type Pokemons</h1>
      <ul>
        {pokemons.map(pokemon => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
}
