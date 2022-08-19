import { useState, useEffect } from 'react'
import fetchPokemon from '../utils/index'

function PokemonInfo({ pokemonName }) {
  const [pokemon, setPokemon] = useState(null)

  useEffect(() => {
    if (!pokemonName) return
    setPokemon(null)
    fetchPokemon(pokemonName).then((pokemon) => setPokemon(pokemon))
  }, [pokemonName])

  if (!pokemonName) {
    return 'Submit a pokemon'
  } else if (pokemon) {
    return (
      <div className="h-full flex flex-col items-center">
        <section className="mb-4 flex flex-col justify-center">
          <small className="mb-1 self-end">{pokemon.fetchedAt}</small>
          <img
            className="max-w-full max-h-52"
            src={pokemon.image}
            alt={pokemon.name}
          />
          <h2 className="mt-2 text-center text-2xl font-extrabold">
            {pokemon.name}
            <sup>{pokemon.number}</sup>
          </h2>
        </section>
        <section>
          <ul className="leading-none list-disc">
            {pokemon.attacks.special.map((attack) => (
              <li key={attack.name}>
                <label>{attack.name}</label>:{' '}
                <span>
                  {attack.damage} <small>({attack.type})</small>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    )
  }
}

export default PokemonInfo
