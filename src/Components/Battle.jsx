import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

/* async function fetchOnePokemon(url) {
  try {
    const response = await fetch(url);
    const pokemon = await response.json();
    return {
      name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
      picture: pokemon.sprites.front_default,
    };
  } catch (error) {
    console.error(`Error: ${error}`);
  }
} */
const localPoke = localStorage.getItem("pkmRoster");

const Pokeobj = JSON.parse(localPoke);

let anzHumPoke = Pokeobj.length;

/* const HumanPokeTeam = (anzHumPoke) => {

  

while(anzHumPoke!=0)
{
 pokeTeam.push(

}



  return (
    <div className="flex h-full flex-col items-center justify-center rounded-lg border-4 border-blue-400 bg-black p-6 shadow-lg">
      <p className="font-extrabold text-yellow-500">Trainer 1</p>
      <img src={Pokeobj[0].picture} alt={Pokeobj[0].name} className="mb-2" />
      <p>{Pokeobj[0].name}</p>
      <img src={Pokeobj[0].picture} alt={Pokeobj[0].name} className="mb-2" />
      <p>{Pokeobj[0].name}</p>
      <img src={Pokeobj[0].picture} alt={Pokeobj[0].name} className="mb-2" />
      <p>{Pokeobj[0].name}</p>
      <img src={Pokeobj[0].picture} alt={Pokeobj[0].name} className="mb-2" />
      <p>{Pokeobj[0].name}</p>
      <img src={Pokeobj[0].picture} alt={Pokeobj[0].name} className="mb-2" />
      <p>{Pokeobj[0].name}</p>
    </div>
  );
}; */
const HumanPokeTeam = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-lg border-4 border-blue-400 bg-black p-6 shadow-lg">
      <p className="font-extrabold text-yellow-500">Trainer 1</p>

      {Pokeobj.map((pokemon, index) => (
        <div key={index}>
          <img src={pokemon.picture} alt={pokemon.name} className="mb-2" />
          <p>{pokemon.name}</p>
        </div>
      ))}
    </div>
  );
};

const SysPokeTeam = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-lg border-4 border-blue-400 bg-black p-6 shadow-lg">
      <p className="font-extrabold text-yellow-500">Trainer 2</p>
      <img src={Pokeobj[1].picture} alt={Pokeobj[1].name} className="mb-2" />
      <p>{Pokeobj[1].name}</p>
      <img src={Pokeobj[1].picture} alt={Pokeobj[1].name} className="mb-2" />
      <p>{Pokeobj[1].name}</p>
      <img src={Pokeobj[1].picture} alt={Pokeobj[1].name} className="mb-2" />
      <p>{Pokeobj[1].name}</p>
      <img src={Pokeobj[1].picture} alt={Pokeobj[1].name} className="mb-2" />
      <p>{Pokeobj[1].name}</p>
      <img src={Pokeobj[1].picture} alt={Pokeobj[1].name} className="mb-2" />
      <p>{Pokeobj[1].name}</p>
    </div>
  );
};

const Battle = () => {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-black">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-1/4 p-4">
          <HumanPokeTeam />
        </div>
        <div className="flex w-1/2 flex-col items-center justify-center p-4">
          <h1 className="mb-8 text-4xl font-extrabold text-rose-700">
            Battle1
          </h1>
          <div className="flex w-full max-w-4xl justify-around rounded-lg border-4 border-blue-400 bg-black p-6 shadow-lg">
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <img
                  src={Pokeobj[0].picture}
                  alt={Pokeobj[0].name}
                  className="mb-2"
                />
                <p>{Pokeobj[0].name}</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-4 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-400">
                    {Pokeobj[0].name}
                  </p>
                </div>
                <div className="mx-4 text-2xl text-rose-600">VS</div>
                <div className="text-center opacity-50">
                  <p className="text-2xl font-bold text-red-400">
                    {Pokeobj[1].name}
                  </p>
                </div>
              </div>
              <p className="underlined text-xl font-semibold text-green-500 decoration-red-900 decoration-double">
                {Pokeobj[1].name} won!
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <img
                  src={Pokeobj[1].picture}
                  alt={Pokeobj[1].name}
                  className="mb-2"
                />
                <p>{Pokeobj[1].name}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4 p-4">
          <SysPokeTeam />
        </div>
      </div>
    </div>
  );
};

export default Battle;
