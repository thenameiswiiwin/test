function PokemonForum({ pokemonName, setPokemonName }) {
  const handleChange = (e) => setPokemonName(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    setPokemonName(pokemonName)
  }

  const handleSelect = (pokemonName) => setPokemonName(pokemonName)

  return (
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
  )
}

export default PokemonForum
