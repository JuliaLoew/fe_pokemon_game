const pokemonDetails = async (pokemonId) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();

      return {
        id: data.id,
        name: data.name,
        picture: data.sprites.front_default,
        type: data.types.map((element) => element.type.name),
        height: data.height,
        weight: data.weight,
        abilities: data.abilities.map((element) => element.ability.name),
        baseStats: data.stats.map((element) => ({ name: element.stat.name, value: element.base_stat })),
        moves: data.moves.map((element) => element.move.name),
        url: url
      };
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

export default pokemonDetails;
