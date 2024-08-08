import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


const Leaderboard = () => {
    // Beispielhafte Daten für die Tabelle
  // const players = [
  //   { name: 'Ash Ketchum', wins: 10, losses: 2 },
  //   { name: 'Gary Oak', wins: 8, losses: 3 },
  //   { name: 'John Doe', wins: 6, losses: 5 },
  //   { name: 'Jane Smith', wins: 5, losses: 4 },
  // ];


  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("http://localhost:8080/leaderboard");
        setPlayers(await response.data);
      } catch (error) {
        console.error('Error fetching leaderboards', error);
      }
    };

    fetchLeaderboard();
  }, []);

  if (!players) {
    return <div>Loading...</div>;
  } 
  
  if (players.length === 0) {
    return <div>No players found</div>;
  }


  // Spieler nach Siegen sortieren
  const sortedPlayers = players.sort((a, b) => b.score - a.score);


  // gibt die Tabelle aus
    return <div>
      <h1 className="text-center text-3xl font-bold underline py-4">Leaderboard</h1>
      <div className="max-w-4xl mx-auto rounded-lg shadow-md overflow-hidden">
        
        <table className="w-full border-collapse mt-4">
          <thead>
            <tr>
              <th className="p-3 border-b border-blue-300">Rank</th>
              <th className="p-3 text-left border-b border-blue-300">Player</th>
              <th className="p-3 border-b border-blue-300">Wins</th>
              <th className="p-3 border-b border-blue-300">Losses</th>
              <th className="p-3 border-b border-blue-300">Battles</th>
            </tr>
          </thead>
          <tbody>
          {sortedPlayers.map((player, index) => (
              <tr key={index} className="">
                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b">{player.name}</td>
                <td className="py-2 px-4 border-b text-center">{player.wins}</td>
                <td className="py-2 px-4 border-b text-center">{player.losses}</td>
                <td className="py-2 px-4 border-b text-center">{player.totalBattles}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>;
  
};
  
  export default Leaderboard;
  