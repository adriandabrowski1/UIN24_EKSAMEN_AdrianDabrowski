import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Jeg brukte denne kilden for å få til userParams: https://reactrouter.com/en/main/hooks/use-params
import axios from 'axios';

export default function Pokemon() {
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      setPokemon(response.data);

      const abilitiesDetails = await Promise.all(
        response.data.abilities.map(async ({ ability }) => {
          const abilityResponse = await axios.get(ability.url);
          return {
            name: ability.name,
            effect: abilityResponse.data.effect_entries.find(entry => entry.language.name === 'en')?.effect,
            shortEffect: abilityResponse.data.effect_entries.find(entry => entry.language.name === 'en')?.short_effect,
          };
        })
      );
      setAbilities(abilitiesDetails);
    };

    fetchPokemon();
  }, [pokemonName]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <main className="pokemon-page">
      {pokemon && (
        <article>
          <header className="pokemon-header"> 
            <section className="pokemon-image-box">
              <img className="pokemon-image" src={pokemon.sprites.front_default} alt={pokemon.name} />
            </section>
            <div className="pokemon-title">
              <h1>{capitalizeFirstLetter(pokemon.name)}</h1>
              <p>#{pokemon.id.toString().padStart(3, '0')}</p>
            </div>
          </header>
          <section className="pokemon-details">
            <div className="pokemon-types">
              <h2>Type(s)</h2>
              <ul>
                {pokemon.types.map(type => (
                  <li key={type.type.name}>{capitalizeFirstLetter(type.type.name)}</li>
                ))}
              </ul>
            </div>
            <div className="pokemon-stats">
              <h2>Stats</h2>
              <ul>
                {pokemon.stats.map(stat => (
                  <li key={stat.stat.name}>
                    {capitalizeFirstLetter(stat.stat.name)}: {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className="pokemon-abilities">
            <h2>Abilities</h2>
            <ul>
              {abilities.map(ability => (
                <li key={ability.name}>
                  <strong>{capitalizeFirstLetter(ability.name)}</strong>
                  <p>{ability.effect || 'No effect description available.'}</p>
                  <p>{ability.shortEffect || 'No short effect description available.'}</p>
                </li>
              ))}
            </ul>
          </section>
        </article>
      )}
    </main>
  );
}
