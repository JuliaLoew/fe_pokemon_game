import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const RosterPage = () => {
  const [roster, setRoster] = useState([]);                                             

  useEffect(() => {
    // Load roster from localStorage on component mount
    const savedRoster = JSON.parse(localStorage.getItem("pkmRoster")) || [];          // Get the roster from localStorage 
    setRoster(savedRoster);                                                          // Set the roster state with the saved roster    
  }, []);                                                                                             

  const removeFromRoster = (id) => {
    // Remove Pokémon from roster
    const updatedRoster = roster.filter(pokemon => pokemon.id !== id);        // Filter out the selected pokemon from the roster
    setRoster(updatedRoster);                                                // Update the roster state          
    localStorage.setItem("pkmRoster", JSON.stringify(updatedRoster));       // Save updated roster to localStorage  
  };

  return (
    <div>
      <h1>My selected Pokemons:</h1>
      <ul className="flex flex-wrap justify-center">
        {roster.map(pokemon => (                                            
          <li key={pokemon.id} className="flex flex-col items-center border-2 p-4 rounded-lg m-4 border-blue-400">
            <img src={pokemon.picture} alt={pokemon.name} className="w-40 h-auto" />
            <div className="description flex flex-col items-center">
              <p className="id text-center">ID: {pokemon.id}</p>
              <p className="name text-center">{pokemon.name}</p>
              <p className="height text-center">Height: {pokemon.height} ft</p>
              <p className="weight text-center">Weight: {pokemon.weight} lbs</p>
            </div>
            <button
              onClick={() => removeFromRoster(pokemon.id)}        
              className="inline-flex items-center justify-center mx-4 p-2 border-2 rounded-lg font-bold border-red-500">
              Remove Me
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RosterPage;



