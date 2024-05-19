import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function SearchResult() {
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        setPokemon(response.data);
        setNotFound(false);
      } catch (error) {
        setNotFound(true);
      }
    };

    fetchPokemon();
  }, [pokemonName]);

  if (notFound) {
    return <div>Pokemon not found</div>;
  }

  return (
    <div>
      {pokemon && (
        <div>
          <h1>{pokemon.name}</h1>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          {/* Additional details */}
        </div>
      )}
    </div>
  );
}


