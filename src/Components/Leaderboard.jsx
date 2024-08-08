import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


const Leaderboard = () => {
    return <div className='text-2xl'>"Leaderboard Page:
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pokémon Battle Leaderboard</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
  </head>
  <body class="font-sans bg-gray-100 p-5">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div class="bg-blue-600 text-white text-center text-2xl py-4">
        Pokémon Battle Leaderboard
      </div>
      <table class="w-full border-collapse mt-4">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-3 text-left border-b border-gray-300">Username</th>
            <th class="p-3 text-left border-b border-gray-300">ID</th>
            <th class="p-3 text-left border-b border-gray-300">Date</th>
          </tr>
        </thead>
        <tbody>
          <!-- Rows of the table will go here -->
        </tbody>
      </table>
    </div>
  </body>
</html>
</div>;
  };
  
  export default Leaderboard;
  