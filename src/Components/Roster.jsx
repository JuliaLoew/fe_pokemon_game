import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RosterPage = () => {
  const [roster, setRoster] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    // Load roster from localStorage on component mount
    const savedRoster = JSON.parse(localStorage.getItem("pkmRoster")) || []; // Get the roster from localStorage
    setRoster(savedRoster); // Set the roster state with the saved roster
  }, []);

  const removeFromRoster = (id) => {
    // Remove Pokémon from roster
    const updatedRoster = roster.filter((pokemon) => pokemon.id !== id); // Filter out the selected pokemon from the roster
    setRoster(updatedRoster); // Update the roster state
    localStorage.setItem("pkmRoster", JSON.stringify(updatedRoster)); // Save updated roster to localStorage
  };

  const showDetails = (id) => {
    navigate(`/Details/${id}`);
  };

  return (
    <div>
      <h1>My selected Pokemons:</h1>
      <ul className="flex flex-wrap justify-center">
        {roster.map((pokemon) => (
          <li
            key={pokemon.id}
            className="m-4 flex flex-col items-center rounded-lg border-2 border-blue-400 p-4"
          >
            <img
              src={pokemon.picture}
              alt={pokemon.name}
              className="h-auto w-40"
            />
            <div className="description flex flex-col items-center">
              <p className="id text-center">ID: {pokemon.id}</p>
              <p className="name text-center">{pokemon.name}</p>
              <p className="height text-center">Height: {pokemon.height} ft</p>
              <p className="weight text-center">Weight: {pokemon.weight} lbs</p>
            </div>
            <button
              onClick={() => showDetails(pokemon.id)}
              className="mx-4 inline-flex items-center justify-center rounded-lg border-2 border-blue-500 p-2 font-bold"
            >
              Details
            </button>
            <button
              onClick={() => removeFromRoster(pokemon.id)}
              className="mx-4 inline-flex items-center justify-center rounded-lg border-2 border-red-500 p-2 font-bold"
            >
              Remove Me
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RosterPage;
