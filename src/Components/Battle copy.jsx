import React, { useEffect, useState } from "react";

const randomint = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
};

const fetchPoke = async () => {
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

  /*   const storedPokemons = localStorage.getItem("syspokemons");

  if (storedPokemons) {
    return pokemix;
  } else {
    localStorage.setItem("syspokemons", JSON.stringify(pokemix));
  } */
  console.log(systemPokemons);
  return systemPokemons;
};

const SysPokeTeam = () => {
  const [systemPokemons, setsystemPokemons] = useState([]);

  useEffect(async () => {
    /*     const fetchData = async () => {
      const storedPokemons = localStorage.getItem("syspokemons");
      if (storedPokemons) {
        setPokemons(JSON.parse(storedPokemons));
      } else { */
    const result = await fetchPoke().then(() => {
      setsystemPokemons(result);
      console.log(systemPokemons);
    });

    //localStorage.setItem("syspokemons", JSON.stringify(result));
    //}
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center rounded-lg border-4 border-blue-400 bg-black p-6 text-center shadow-lg">
      <p className="font-extrabold text-yellow-500">COMPUTER</p>

      {systemPokemons.map((pokemon, index) => (
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
        <p className="items-center justify-center text-center">
          Bitte zuerst 5 Pokemons wählen :)
        </p>{" "}
      </div>
    );
  }
  const Pokeobj = JSON.parse(localPoke);
  if (Pokeobj.length < 5) {
    let anz = 5 - Pokeobj.length;
    return (
      <div className="flex w-full max-w-4xl items-center justify-center rounded-lg border-4 border-blue-400 bg-black p-6 shadow-lg">
        <p className="items-center justify-center text-center">
          Bitte zuerst {anz} weitere Pokemons wählen :)
        </p>
      </div>
    );
  }

  /*   const sysPoke = localStorage.getItem("syspokemons");

  const Sysobj = JSON.parse(sysPoke); */

  /*   const delfirst = (localStorageKey) => {
    const getStorage = localStorage.getItem(localStorageKey);
    const storage = JSON.parse(localStorage);

    console.log(storage);
  }; */

  let winner = "NAME";
  /*   if (Math.random() > 0.5) {
    winner = Pokeobj[0].name; // -- Original ohne delete
    //delfirst("syspokemons");
  } else {
    winner = Sysobj[0].name;
    //delfirst("pkmRoster");
  } */

  return (
    <div className="">
      <div className="flex h-max w-max flex-col items-center justify-center bg-black">
        <div className="flex h-max flex-1 items-center justify-center">
          <div className="w-1/4 p-4">
            <HumanPokeTeam />
          </div>
          <div className="flex w-max flex-col place-content-stretch items-center justify-center p-4">
            <h1 className="mb-8 text-4xl font-extrabold text-rose-700">
              BATTLE
            </h1>
            <div className="flex w-min items-center justify-around rounded-lg border-4 border-blue-400 bg-black p-10 shadow-lg">
              <div className="flex flex-col place-content-stretch items-center justify-center">
                <div className="flex h-[300px] w-[300px] flex-col items-center justify-center">
                  <img
                    src={Pokeobj[0].picture}
                    alt={Pokeobj[0].name}
                    className="h-[300px] w-[300px] object-cover"
                  />
                  <p>{Pokeobj[0].name}</p>
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
                    /*     src={Sysobj[0].pic}
                    alt={Sysobj[0].name} */
                    className="h-[300px] w-[300px] object-cover"
                  />
                  <p>{/* {Sysobj[0].name} */}</p>
                </div>
              </div>
            </div>
            <p className="underlined py-8 text-6xl font-extrabold text-green-500 decoration-red-900 decoration-double">
              {winner} won!
            </p>
          </div>
          <div className="w-1/4 p-4">
            <SysPokeTeam />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Battle;
