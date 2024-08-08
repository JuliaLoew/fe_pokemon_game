import React, { useState } from 'react';
import aiBattle from '../utils/aiBattle.js';

const OpenAIRequest = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const fetchOpenAIResponse = () => {
        let pokemonsArray = [
            { id: 1, name: "Charmeleon" },
            { id: 2, name: "Charmander" },
        ]
        const data = aiBattle(pokemonsArray)
            .then((data) => { setResponse(data.choices[0].message.content) }
            );
    }

    return (
        <div>
            <button onClick={fetchOpenAIResponse}>Send Request</button>
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default OpenAIRequest;