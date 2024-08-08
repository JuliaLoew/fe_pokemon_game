import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import pokemonDetails from "../utils/pokemonDetails.jsx";


const Details = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log(id);
        const pokemonData = await pokemonDetails(id);
        setPokemon(pokemonData);
      } catch (error) {
        setError(`Error during loading pokemon-data: ${error.message}`);
      } finally {
        setLoading(false);
      }

    };
    if (id) fetchData();
  }, []);

  if (loading) {
    return <p className="text-2xl">is loading ...</p>;
  }

  if (error) {
    return <p className="text-2xl">{error}</p>;
  }

  if (!pokemon) {
    return <p className="text-2xl">No data found.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-12">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img src={pokemon.picture} alt={pokemon.name} className="w-full h-auto md:w-48" />
        </div>
        <div className="p-8 flex-1">
          <h2 className="text-2xl font-bold text-blue-800">{pokemon.name}</h2>
          <p>Type: {pokemon.type.join(", ")}</p>
          <p>Height: {pokemon.height} </p>
          <p>Weight: {pokemon.weight} </p>

          <div className="mt-4">
            <h3 className="text-lg font-medium">Base Stats</h3>
            <p>HP: {pokemon.baseStats.find(stat => stat.name === "hp")?.value}</p>
            <p>Attack: {pokemon.baseStats.find(stat => stat.name === "attack")?.value}</p>
            <p>Defense: {pokemon.baseStats.find(stat => stat.name === "defense")?.value}</p>
            <p>Sp. Atk: {pokemon.baseStats.find(stat => stat.name === "special-attack")?.value}</p>
            <p>Sp. Def: {pokemon.baseStats.find(stat => stat.name === "special-defense")?.value}</p>
            <p>Speed: {pokemon.baseStats.find(stat => stat.name === "speed")?.value}</p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-medium">Abilities</h3>
            <ul>
              {pokemon.abilities.map((ability, index) => (
                <li key={index}>{ability}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-medium">Learnable Moves</h3>
            <div className="relative max-h-32 overflow-y-auto">
              <ul>
                {pokemon.moves.map((move, index) => (
                  <li key={index}>{move}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button onClick={() => onBack()}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back
            </button>
            <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add to roster
            </button>
            <button onClick={() => onRemove()}
                    className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  function onBack() {
    navigate(`/`);
  }

  function onAdd() {

  }

  function onRemove() {
    const savedRoster = JSON.parse(localStorage.getItem("pkmRoster")) || [];
    const newRoster = savedRoster.filter((pokemon) => pokemon.id !== parseInt(id, 10));

    localStorage.setItem("pkmRoster", JSON.stringify(newRoster)); // Save updated roster to localStorage
  }


};

export default Details;
  
  