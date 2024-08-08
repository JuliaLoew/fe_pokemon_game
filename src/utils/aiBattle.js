const aiBattle = async (pokemonsArray) => {
  const url = 'https://api.openai.com/v1/chat/completions';
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const requestBody = {
    model: 'gpt-4',
    messages: [
      {
        role: 'user',
        content: `take thes pokemons array ${JSON.stringify(pokemonsArray)}`
      },
      {
        role: 'user',
        content: `give me only the winner id in your opinion from this array, response with only id`
      }
    ],
    temperature: 0.7
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    const data = await res.json();
    return (data);
  } catch (err) {
    return (err.message);
  }
};
export default aiBattle;

