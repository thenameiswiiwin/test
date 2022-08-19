import { useState, useEffect } from 'react'
import PokemonDataView from './PokemonDataView'
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
    return <PokemonDataView pokemon={pokemon} />
  }
}

export default PokemonInfo
