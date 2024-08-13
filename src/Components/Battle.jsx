import React, { useEffect, useState } from "react";

const randomint = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
};

const fetchSystemPoke = async () => {
  const systemPokemons = [];
  let anz = 5;
  while (anz > 0) {
    try {
      let zahl = randomint(1, 900);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${zahl}`);
      if (!response.ok) {
        throw new Error(`HTTP-Fehler! Status: ${response.status}`);
      }
      const data = await response.json();
      const pokemon = {
        name: data.forms[0].name,
        id: data.id,
        pic: data.sprites.front_default,
      };
      systemPokemons.push(pokemon);
    } catch (error) {
      console.error("Fehler beim Abrufen der Daten: ", error);
    }
    anz--;
  }

  return systemPokemons;
};

let winner = "NAME";

const Battle = () => {
  const [systemPokemons, setSystemPokemons] = useState([]);
  const [userPokemons, setUserPokemons] = useState([]);
  const [fightUserPokemon, setFightUserPokemon] = useState([]);
  const [fightSystemPokemon, setFightSystemPokemon] = useState([]);

  function deletePokemon(userPokemons, systemPokemons) {
    if (Math.random() > 0.5) {
      //console.log("sysPokemons", pokemons);
      let pokemons = userPokemons;
      pokemons.splice(0, 1);

      if (pokemons[0].name != null) winner = pokemons[0].name;
      setUserPokemons(pokemons);
      setFightSystemPokemon(pokemons[0]);
      //setTimeout(200000);
    } else {
      let pokemons = systemPokemons;
      pokemons.splice(0, 1);

      winner = pokemons[0].name;

      setSystemPokemons(pokemons);
      setFightUserPokemon(pokemons[0]);
    }
    return;
  }

  function fightProcess(userPokemons, systemPokemons) {
    while (systemPokemons.length > 0 || userPokemons.length > 0) {
      console.log("TEST while");
      setTimeout(deletePokemon(userPokemons, systemPokemons), 3000);
    }

    return;
  }

  useEffect(() => {
    try {
      fetchSystemPoke().then((result) => {
        setSystemPokemons(result);
        setFightSystemPokemon(result[0]);
        fightProcess(userPokemons, systemPokemons);
      });
      const localPoke = localStorage.getItem("pkmRoster");
      const storedUserPoke = JSON.parse(localPoke);

      setUserPokemons(storedUserPoke);
      setFightUserPokemon(storedUserPoke[0]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="">
      <div className="flex h-max w-max flex-col items-center justify-center bg-black">
        <div className="flex h-max flex-1 items-center justify-center">
          <div className="w-1/4 p-4">
            <div className="flex h-full flex-col items-center justify-center rounded-lg border-4 border-blue-400 bg-black p-6 text-center shadow-lg">
              <p className="font-extrabold text-yellow-500">HUMAN</p>

              {userPokemons.map((pokemon, index) => (
                <div key={index}>
                  <img
                    src={pokemon.picture}
                    alt={pokemon.name}
                    className="mb-2"
                  />
                  <p>{pokemon.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-max flex-col place-content-stretch items-center justify-center p-4">
            <h1 className="mb-8 text-4xl font-extrabold text-rose-700">
              BATTLE
            </h1>
            <div className="flex w-min items-center justify-around rounded-lg border-4 border-blue-400 bg-black p-10 shadow-lg">
              <div className="flex flex-col place-content-stretch items-center justify-center">
                <div className="flex h-[300px] w-[300px] flex-col items-center justify-center">
                  <img
                    src={fightUserPokemon.picture}
                    alt={fightUserPokemon.name}
                    className="h-[300px] w-[300px] object-cover"
                  />
                  <p> {fightUserPokemon.name} </p>
                </div>
              </div>
              <div className="flex flex-col place-content-stretch items-center justify-center">
                <div className="mb-4 flex place-content-stretch items-center justify-center">
                  <div className="mx-4 place-content-stretch p-4 text-2xl text-rose-600">
                    VS
                  </div>
                </div>
              </div>
              <div className="flex flex-col place-content-stretch items-center justify-center">
                <div className="flex h-[300px] w-[300px] flex-col items-center justify-center">
                  <img
                    src={fightSystemPokemon.pic}
                    alt={fightSystemPokemon.name}
                    className="h-[300px] w-[300px] object-cover"
                  />
                  <p>{fightSystemPokemon.name}</p>
                </div>
              </div>
            </div>
            <p className="underlined py-8 text-6xl font-extrabold text-green-500 decoration-red-900 decoration-double">
              {winner} won!
            </p>
          </div>
          <div className="w-1/4 p-4">
            {" "}
            <div className="flex h-full flex-col items-center justify-center rounded-lg border-4 border-blue-400 bg-black p-6 text-center shadow-lg">
              <p className="font-extrabold text-yellow-500">COMPUTER</p>

              {systemPokemons.map((pokemon, index) => (
                <div key={index}>
                  <img src={pokemon.pic} alt={pokemon.name} className="mb-2" />
                  <p>{pokemon.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Battle;
