import { useState } from 'react'
import Charizard from '../assets/charizard.jpg'

function App() {
  const [pokemonName, setPokemonName] = useState('')

  const handleChange = (e) => setPokemonName(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    setPokemonName(pokemonName)
  }

  const handleSelect = (pokemonName) => setPokemonName(pokemonName)

  return (
    <div className="flex flex-col justify-center items-center mt-14 font-semibold">
      <form
        className="flex flex-col jutify-center items-center"
        onSubmit={handleSubmit}
      >
        <label htmlFor="pokemonName-input">Pokemon Name</label>
        <small>
          Try <button type="button" onClick={() => handleSelect('pikachu')}>"pikachu"</button>
          {', '}
          <button type="button" onClick={() => handleSelect('charizard')}>"charizard"</button>
          {', or '}
          <button type="button" onClick={() => handleSelect('mew')}>"mew"</button>
        </small>
        <div>
          <input
            className="mt-2.5 mr-2.5 px-2.5 leading-loose rounded-sm box shadow-md bg-zinc-100"
            name="pokemonName"
            placeholder="Pokemon Name..."
            value={pokemonName}
            onChange={handleChange}
          />
          <button
            className="py-1.5 px-2.5 border border-solid rounded-md bg-red-600 text-white hover:bg-red-700 disabled:bg-red-700"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>

      <hr className="my-7" />

      <div className="h-96 w-72 bg-zinc-100 rounded overflow-auto p-5">
        <div className="h-full flex flex-col items-center">
          <section className="mb-4">
            <small className="mb-1 float-right">10:08 50.405</small>
            <img src={Charizard} alt="charizard" />
            <h2 className="mt-2 text-center text-2xl font-extrabold">
              charizard
              <sup>006</sup>
            </h2>
          </section>
          <section>
            <ul className="leading-none list-disc">
              <li>
                Dragon Claw: 35 <small>(Dragon)</small>
              </li>
              <li>
                Fire Blast: 100 <small>(Fire)</small>
              </li>
              <li>
                Flamethrower: 55 <small>(Fire)</small>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default App
