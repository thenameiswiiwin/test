import { useState } from 'react'
import PokemonForum from './PokemonForum'
import PokemonInfo from './PokemonInfo'

function App() {
  const [pokemonName, setPokemonName] = useState('')

  return (
    <div className="flex flex-col justify-center items-center mt-14 font-semibold">
      <PokemonForum pokemonName={pokemonName} setPokemonName={setPokemonName} />
      <hr className="my-7" />
      <div className="h-96 w-72 bg-zinc-100 rounded overflow-auto p-5">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
