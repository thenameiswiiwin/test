import { useState, useEffect, useRef } from 'react'

const formatDate = (date) =>
  `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} ${String(
    date.getSeconds()
  ).padStart(2, '0')}.${String(date.getMilliseconds()).padStart(3, '0')}`

function fetchPokemon(name) {
  const pokemonQuery = `
    query PokemonInfo($name: String){
      pokemon(name: $name) {
        id
        number
        name
        image
        attacks {
          special {
            name
            type
            damage
          }
        }
      }
    }
  `

  return window
    .fetch('https://graphql-pokemon2.vercel.app/', {
      method: 'POST',
      headers: { 'content-type': 'application/json;charset=UTF-8' },
      body: JSON.stringify({
        query: pokemonQuery,
        variables: { name: name.toLowerCase() }
      })
    })
    .then(async (res) => {
      const { data } = await res.json()
      if (res.ok) {
        const pokemon = data?.pokemon
        if (pokemon) {
          pokemon.fetchedAt = formatDate(new Date())
          return pokemon
        } else {
          return Promise.reject(new Error(`No pokemon with the name "${name}"`))
        }
      } else {
        // handle the graphql errors
        const error = {
          message: data?.errors?.map((e) => e.message).join('\n')
        }
        return Promise.reject(error)
      }
    })
}

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
          Try{' '}
          <button type="button" onClick={() => handleSelect('pikachu')}>
            "pikachu"
          </button>
          {', '}
          <button type="button" onClick={() => handleSelect('charizard')}>
            "charizard"
          </button>
          {', or '}
          <button type="button" onClick={() => handleSelect('mew')}>
            "mew"
          </button>
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
            disabled={!pokemonName.length}
          >
            Submit
          </button>
        </div>
      </form>
      <hr className="my-7" />
      <div className="h-96 w-72 bg-zinc-100 rounded overflow-auto p-5">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
