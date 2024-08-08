import {
    createBrowserRouter,
    createRoutesFromElements,
    Link,
    Navigate,
    Outlet,
    Route,
    RouterProvider,
  } from 'react-router-dom';
import React from 'react';
import { useState, useEffect } from "react";

const MainLayout = () => {
    return (
      <div className='flex flex-col min-h-screen'>
        <header className='bg-blue-600 text-white p-4'>
          <div className='container mx-auto flex justify-between items-center'>
            <div className="flex items-center">
          <img className="mr-2 w-16 md:w-16 lg:w-16" src="https://s3-alpha-sig.figma.com/img/c45c/7c50/52e6e92e2b917b40e487e754eb0aadf8?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jJEyzHDPviy4VMwZa1D2krBLfWwnGFVDsk5nTCrDTtdRpCL5~aCG8yo-slwkXwtmdsaylI2kFlEHyZT37LcBgpGLoL9RIZwtsEtTBoLYXCyo3t36nSWgTNHaJpxk3slROxXQoCsJ18j6J~3QIee3ePTEOULIm~ohlS5mqhz~hgGwLqFwbWN2OcXWMLpggo0CDQ0923-SEqaVEoPQv5AOnEC4tXkr2cy5-aQYMiPe0Q1y9XtXTASskq3h78dBjQwG0uakoShBZVfGebCBPBXt6Uc~f-LwuHspnY96n1lznd0-gCOWe8FZHU5rVPMirN1N-VCk47yWtTT4S6~DNYV3aQ__" alt="" />
            <h1 className='text-4xl font-bold'>PokéBattle</h1>
            </div>
            <nav>
              <ul className='flex space-x-4 font-semibold'>
                <li>
                  <Link to="/" className='text-2xl hover:underline hover:underline-offset-4'>Home</Link>
                </li>
                <li>
                  <Link to="/Details" className='text-2xl hover:underline hover:underline-offset-4'>Details</Link>
                </li>
                <li>
                  <Link to="/Roster" className='text-2xl hover:underline hover:underline-offset-4'>My Roster</Link>
                  </li>
                  <li>
                  <Link to="/Battle" className='text-2xl hover:underline hover:underline-offset-4'>Battle</Link>
                  </li>
                  <li>
                  <Link to="/Leaderboard" className='text-2xl hover:underline hover:underline-offset-4'>Lederboard</Link>
                  </li>
                
              </ul>
            </nav>
          </div>
        </header>
        
        <div className="container mx-auto py-4">
          <Outlet />
        </div>

        <footer className='bg-gray-800 text-white p-4'>
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} My App. All rights reserved.
        </div>
        </footer>
      </div>
    );
  };
  
  export default MainLayout;