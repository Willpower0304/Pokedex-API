import { useEffect, useState } from "react";
import { getPokemons } from "./api/pokeapi";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState([]);

  const typeColors = {
    normal: "bg-gray-400 text-white",
    fire: "bg-red-500 text-white",
    water: "bg-blue-500 text-white",
    grass: "bg-green-500 text-white",
    electric: "bg-yellow-400 text-black",
    ice: "bg-cyan-400 text-black",
    fighting: "bg-orange-700 text-white",
    poison: "bg-purple-500 text-white",
    ground: "bg-yellow-600 text-white",
    flying: "bg-indigo-400 text-white",
    psychic: "bg-pink-500 text-white",
    bug: "bg-lime-500 text-black",
    rock: "bg-stone-500 text-white",
    ghost: "bg-violet-700 text-white",
    dragon: "bg-indigo-700 text-white",
    dark: "bg-gray-800 text-white",
    steel: "bg-slate-400 text-white",
    fairy: "bg-pink-300 text-black",
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemons(9);
      setPokemons(data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray text-gray-800 gap-5">
      <h1 className="text-5xl font-bold mb-4">Pokédex</h1>
      <p className="mb-6">Descubre tus Pokédex favoritos</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 m-4">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="bg-gray-800 shadow-lg rounded-xl overflow-hidden w-60 flex flex-col"
          >
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-full h-30 object-contain bg-indigo-200"
            />

            <div className="flex justify-between items-center p-3 min-h-[35px]">
              <h2 className="capitalize font-bold text-white">
                {pokemon.name}
              </h2>

              <div className="flex gap-2">
                {pokemon.types.map((t, i) => (
                  <span
                    key={i}
                    className={`px-1 py-1 rounded-lg text-xs font-bold uppercase ${
                      typeColors[t.type.name] || "bg-gray-100"
                    }`}
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
