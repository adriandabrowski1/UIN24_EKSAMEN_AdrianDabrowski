import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <main className="search-results-page">
      <h1>RESULTATER</h1>
      {notFound ? (
        <div className="not-found">Finner ikke noe på "{capitalizeFirstLetter(pokemonName)}"</div>
      ) : (
        pokemon && (
          <div className="pokemon-card">
            <Link to={`/pokemons/${pokemon.name}`}>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <h2>{capitalizeFirstLetter(pokemon.name)}</h2>
              <p>#{pokemon.id.toString().padStart(3, '0')}</p>
            </Link>
          </div>
        )
      )}
    </main>
  );
}
