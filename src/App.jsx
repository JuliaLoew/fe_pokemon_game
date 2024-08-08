import Battle from './Components/Battle';
import Roster from './Components/Roster';
import Leaderboard from './Components/Leaderboard';
import Details from './Components/Details';
import Home from './Components/Home';
import MainLayout from './Components/MainLayout';
import './index.css';

import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from "react-router-dom";


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="" element={<MainLayout />}>
    <Route index element={<Home />} />
    <Route path="Details/:id" element={<Details/>} />
    <Route path="Roster" element={<Roster/>} />
    <Route path="Battle" element={<Battle/>} />
    <Route path="Leaderboard" element={<Leaderboard/>} />

  </Route>

));
function App() {
return (

<div className="flex flex-col min-h-screen pb-8">

<RouterProvider router={router} />
</div>

);
}

export default App;
