import React, { useEffect, useState } from "react";

const randomint = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
};

const fetchPoke = async () => {
  const pokemix = [];
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
      pokemix.push(pokemon);
    } catch (error) {
      console.error("Fehler beim Abrufen der Daten: ", error);
    }
    anz--;
  }

  const storedPokemons = localStorage.getItem("syspokemons");

  if (storedPokemons) {
    return pokemix;
  } else {
    localStorage.setItem("syspokemons", JSON.stringify(pokemix));
  }

  return pokemix;
};

const SysPokeTeam = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const storedPokemons = localStorage.getItem("syspokemons");
      if (storedPokemons) {
        setPokemons(JSON.parse(storedPokemons));
      } else {
        const result = await fetchPoke();
        setPokemons(result);
        localStorage.setItem("syspokemons", JSON.stringify(result));
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center rounded-lg border-4 border-blue-400 bg-black p-6 text-center shadow-lg">
      <p className="font-extrabold text-yellow-500">COMPUTER</p>

      {pokemons.map((pokemon, index) => (
        <div key={index}>
          <img src={pokemon.pic} alt={pokemon.name} className="mb-2" />
          <p>{pokemon.name}</p>
        </div>
      ))}
    </div>
  );
};

const HumanPokeTeam = () => {
  const localPoke = localStorage.getItem("pkmRoster");
  const Pokeobj = JSON.parse(localPoke);

  return (
    <div className="flex h-full flex-col items-center justify-center rounded-lg border-4 border-blue-400 bg-black p-6 text-center shadow-lg">
      <p className="font-extrabold text-yellow-500">HUMAN</p>

      {Pokeobj.map((pokemon, index) => (
        <div key={index}>
          <img src={pokemon.picture} alt={pokemon.name} className="mb-2" />
          <p>{pokemon.name}</p>
        </div>
      ))}
    </div>
  );
};

const Battle = () => {
  fetchPoke();

  const localPoke = localStorage.getItem("pkmRoster");
  if (localPoke === null) {
    return (
      <div className="flex w-full max-w-4xl items-center justify-center rounded-lg border-4 border-blue-400 bg-black p-6 shadow-lg">
        <p className="items-center text-center">
          Bitte erst deine Pokemons wählen :)
        </p>{" "}
      </div>
    );
  }
  const Pokeobj = JSON.parse(localPoke);

  const sysPoke = localStorage.getItem("syspokemons");
  const Sysobj = JSON.parse(sysPoke);

  return (
    <div className="flex min-h-screen flex-col justify-center bg-black">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-1/4 p-4">
          <HumanPokeTeam />
        </div>
        <div className="flex w-1/2 flex-col items-center justify-center p-4">
          <h1 className="mb-8 text-4xl font-extrabold text-rose-700">
            BATTLE-1
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
                    {Sysobj[0].name}
                  </p>
                </div>
              </div>
              <p className="underlined text-xl font-semibold text-green-500 decoration-red-900 decoration-double">
                {Sysobj[0].name} won!
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <img
                  src={Sysobj[0].pic}
                  alt={Sysobj[0].name}
                  className="mb-2"
                />
                <p>{Sysobj[0].name}</p>
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
