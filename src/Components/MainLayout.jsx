import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-gray-800 p-4 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Pokemon Game</h1>
          <nav>
            <ul className="flex space-x-4 font-semibold">
              <li>
                <Link
                  to="/"
                  className="hover:underline hover:underline-offset-4"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="Details/:id"
                  className="hover:underline hover:underline-offset-4"
                >
                  Details
                </Link>
              </li>
              <li>
                <Link
                  to="/Roster"
                  className="hover:underline hover:underline-offset-4"
                >
                  Roster
                </Link>
              </li>
              <li>
                <Link
                  to="/Battle"
                  className="hover:underline hover:underline-offset-4"
                >
                  Battle
                </Link>
              </li>
              <li>
                <Link
                  to="/Leaderboard"
                  className="hover:underline hover:underline-offset-4"
                >
                  Leaderboard
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container mx-auto py-4">
        <Outlet />
      </div>

      <footer className="bg-gray-800 p-4 text-white">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} My App. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
