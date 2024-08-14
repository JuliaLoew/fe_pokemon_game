import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [roster, setRoster] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllPokemons();
    const savedRoster = JSON.parse(localStorage.getItem("pkmRoster")) || []; // korrigiert von PokemonRoster zu pkmRoster
    setRoster(savedRoster);
  }, []);

  async function fetchAllPokemons(limit = 100) {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
      );
      const data = await response.json();
      const allPokemons = await Promise.all(
        data.results.map(async (pokemon) => {
          const pokemonData = await fetchOnePokemon(pokemon.url);
          return pokemonData;
        })
      );
      setPokemons(allPokemons);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  async function fetchOnePokemon(url) {
    try {
      const response = await fetch(url);
      const pokemon = await response.json();
      return {
        ...pokemon,
        id: pokemon.id,
        name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        weight: pokemon.weight,
        height: pokemon.height,
        picture: pokemon.sprites.front_default
      };
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  function saveToRoster(pokemon) {
    const updatedRoster = [...roster];
    const isAlreadyRoster = updatedRoster.some((p) => p.id === pokemon.id);

    if (isAlreadyRoster) {
      //alert(`${pokemon.name} you have already selected to play.`);
    } else {
      updatedRoster.push(pokemon);
      localStorage.setItem("pkmRoster", JSON.stringify(updatedRoster));
      setRoster(updatedRoster);
      //alert(`${pokemon.name} added to to your game list.`);
    }
  }

  function filterPokemons(e) {
    const filter = e.target.value.toUpperCase();
    const filteredPokemons = pokemons.filter((pokemon) =>
      pokemon.name.toUpperCase().startsWith(filter)
    );
    if (filteredPokemons.length === 0) {
      alert("No Pokémon found");
    } else {
      setPokemons(filteredPokemons);
    }
  }

  function handleDetailsClick(pokemonId) {
    navigate(`/Details/${pokemonId}`);
  }

  return (
    <div>
      <div className="text-2xl font-bold">
        Liste of available Pokémon: Choose 5 Pokemon you want to play with.
      </div>
      <input
        id="search"
        type="text"
        placeholder="Search Pokémon"
        onChange={filterPokemons}
        className="rounded-lg border-2 p-2"
      />
      <ul id="pokemonList" className="flex flex-wrap justify-center">
        {pokemons.map((pokemon) => (
          <li
            key={pokemon.id}
            className="m-4 flex flex-col items-center rounded-lg border-2 border-blue-400 p-4"
          >
            <img
              className="h-auto w-40"
              src={pokemon.picture}
              alt={pokemon.name}
            />
            <div className="description flex flex-col items-center">
              <p className="id text-center">ID: {pokemon.id}</p>
              <p className="name text-center">{pokemon.name}</p>
              <p className="height text-center">Height: {pokemon.height} ft</p>
              <p className="weight text-center">Weight: {pokemon.weight} lbs</p>
            </div>
            <button
              onClick={() => saveToRoster(pokemon)}
              className={`mx-4 inline-flex items-center justify-center rounded-lg border-2 p-2 font-bold ${roster.find((p) => p.id === pokemon.id)
                ? "bg-gray-300 text-red-500"
                : "border-blue-400"
                }`}
            >
              {roster.find((p) => p.id === pokemon.id)
                ? "I play with you"
                : "Play with me"}
            </button>
            <button
              onClick={() => handleDetailsClick(pokemon.id)}
              className="mx-4 inline-flex items-center justify-center rounded-lg border-2 border-blue-400 p-2 font-bold"
            >
              More Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
