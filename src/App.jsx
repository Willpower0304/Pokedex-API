import "./App.css";
import { Home } from "./pages/Home";
import { Data } from "./pages/Data";
import { Info } from "./pages/Info";
import { PokemonDetail } from "./pages/PokemonDetail";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data" element={<Data />} />
        <Route path="/info" element={<Info />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </div>
  );
}

export default App;
