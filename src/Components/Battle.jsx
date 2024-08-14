import React, { useState, useEffect } from 'react';

const fetchRandomPokemons = async () => {
  const promises = [];
  for (let i = 0; i < 5; i++) {
    const id = Math.floor(Math.random() * 898) + 1; // PokéAPI has Pokémon with ids from 1 to 898
    promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json()));
  }

  const pokemons = await Promise.all(promises);
  return pokemons.map(pokemon => ({
    ...pokemon,
    name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
    hp: pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat,
    attack: pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat,
    picture: pokemon.sprites.front_default,
  }));
};


const getUserPokemons = async () => {
  const savedUserPokemons = JSON.parse(localStorage.getItem('pkmRoster')) || [];
  if (savedUserPokemons.length === 0) {
    alert('No user Pokémon found in localStorage!');
  }
  return savedUserPokemons.map(pokemon => ({
    ...pokemon,
    name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
    hp: pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat,
    attack: pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat,
  }));
};



const Battle = () => {
  const [systemPokemons, setSystemPokemons] = useState([]);
  const [userPokemons, setUserPokemons] = useState([]);
  const [currentSystemPokemonIndex, setCurrentSystemPokemonIndex] = useState(0);
  const [currentUserPokemonIndex, setCurrentUserPokemonIndex] = useState(0);
  const [winner, setWinner] = useState('');

  const [turn, setTurn] = useState('user');

  useEffect(() => {
    // Fetch system Pokémon and get user Pokémon from localStorage
    const fetchPokemons = async () => {
      const fetchedSystemPokemons = await fetchRandomPokemons();
      setSystemPokemons(fetchedSystemPokemons);
      const savedUserPokemons = await getUserPokemons();
      console.log('savedUserPokemons', savedUserPokemons)
      setUserPokemons(savedUserPokemons);
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    if (systemPokemons.length === 0 || userPokemons.length === 0) return;

    const battleInterval = setInterval(() => {
      if (turn === 'user') {
        // User attacks system
        const newSystemPokemons = [...systemPokemons];
        newSystemPokemons[currentSystemPokemonIndex].hp -= userPokemons[currentUserPokemonIndex].attack;
        if (newSystemPokemons[currentSystemPokemonIndex].hp <= 0) {
          if (currentSystemPokemonIndex < systemPokemons.length - 1) {
            setCurrentSystemPokemonIndex(currentSystemPokemonIndex + 1);
          } else {
            setWinner('User');
            clearInterval(battleInterval);
            return;
          }
        }
        setSystemPokemons(newSystemPokemons);
        setTurn('system');
      } else {
        // System attacks user
        const newUserPokemons = [...userPokemons];
        newUserPokemons[currentUserPokemonIndex].hp -= systemPokemons[currentSystemPokemonIndex].attack;
        if (newUserPokemons[currentUserPokemonIndex].hp <= 0) {
          if (currentUserPokemonIndex < userPokemons.length - 1) {
            setCurrentUserPokemonIndex(currentUserPokemonIndex + 1);
          } else {
            setWinner('System')
            clearInterval(battleInterval);
            return;
          }
        }
        setUserPokemons(newUserPokemons);
        setTurn('user');
      }
    }, 1000);

    return () => clearInterval(battleInterval);
  }, [turn, currentSystemPokemonIndex, currentUserPokemonIndex, systemPokemons, userPokemons]);


  const hpSlider = (hp) => {
    const percentage = Math.max(0, (hp / 100) * 100);
    return (
      <div className="relative w-full bg-gray-300 rounded-full h-6">
        <div
          className="bg-red-500 h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%`, maxWidth: '100%' }}
        ></div>
        <div className=" top-0 left-0 w-full text-center text-xs font-medium text-white">
          {hp} / {100}
        </div>
      </div >
    );
  };

  return (

    <div className="">
      <div className="flex h-max w-max flex-col items-center justify-center bg-black">
        <div className="flex h-max flex-1 items-center justify-center">
          <div className="w-1/4 p-4">
            <div className="flex h-full flex-col items-center justify-center rounded-lg border-4 border-blue-400 bg-black p-6 text-center shadow-lg">
              <p className="font-extrabold text-yellow-500">User Pokemon</p>

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
                {userPokemons[currentUserPokemonIndex] &&
                  <div className="flex h-[300px] w-[300px] flex-col items-center justify-center">
                    <img
                      src={userPokemons[currentUserPokemonIndex].picture}
                      alt={userPokemons[currentUserPokemonIndex].name}
                      className="h-[300px] w-[300px] object-cover"
                    />
                    <p> {userPokemons[currentUserPokemonIndex].name} </p>
                    {hpSlider(userPokemons[currentUserPokemonIndex].hp)}
                  </div>
                }

              </div>
              <div className="flex flex-col place-content-stretch items-center justify-center">
                <div className="mb-4 flex place-content-stretch items-center justify-center">
                  <div className="mx-4 place-content-stretch p-4 text-2xl text-rose-600">
                    VS
                  </div>
                </div>
              </div>
              <div className="flex flex-col place-content-stretch items-center justify-center">
                {systemPokemons[currentSystemPokemonIndex] &&

                  <div className="flex h-[300px] w-[300px] flex-col items-center justify-center">
                    <img
                      src={systemPokemons[currentSystemPokemonIndex].picture}
                      alt={systemPokemons[currentSystemPokemonIndex].name}
                      className="h-[300px] w-[300px] object-cover"
                    />
                    <p>{systemPokemons[currentSystemPokemonIndex].name}</p>
                    {hpSlider(systemPokemons[currentSystemPokemonIndex].hp)}
                  </div>
                }
              </div>
            </div>
            {winner == 'System' &&
              < p className="underlined py-8 text-6xl font-extrabold text-red-500 decoration-red-900 decoration-double">
                {winner} won :(
              </p>
            }
            {winner == 'User' &&
              < p className="underlined py-8 text-6xl font-extrabold text-green-500 decoration-red-900 decoration-double">
                {winner} won :)
              </p>
            }
          </div>
          <div className="w-1/4 p-4">
            {" "}
            <div className="flex h-full flex-col items-center justify-center rounded-lg border-4 border-blue-400 bg-black p-6 text-center shadow-lg">
              <p className="font-extrabold text-yellow-500">System Pokemon</p>

              {systemPokemons.map((pokemon, index) => (
                <div key={index}>
                  <img src={pokemon.picture} alt={pokemon.name} className="mb-2" />
                  <p>{pokemon.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Battle;