export async function fetchOnePokemon(url) {
  try {
    const response = await fetch(url);
    const pokemon = await response.json();
    return {
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

export function savePokemonToRoster(pokemon) {
  const savedRoster = JSON.parse(localStorage.getItem("pkmRoster")) || [];
  const isAlreadyRoster = savedRoster.find((p) => p.id === pokemon.id);

  if (!isAlreadyRoster && savedRoster.length < 5) {
    savedRoster.push(pokemon);
    localStorage.setItem("pkmRoster", JSON.stringify(savedRoster));
  }
}