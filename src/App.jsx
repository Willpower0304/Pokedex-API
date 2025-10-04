import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_POKEAPI_URL;

    fetch(`${apiUrl}/pokemon?limit=9`)
      .then((res) => res.json())
      .then(async (data) => {
        const details = await Promise.all(
          data.results.map(async (poke) => {
            const res = await fetch(poke.url);
            return res.json();
          })
        );
        setPokemons(details);
      })
      .catch((err) => console.error("Error al cargar pokemones:", err));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 gap-5">
      <h1 className="text-5xl font-bold mb-4">Pokédex</h1>
      <p className="mb-6">Descubre tus Pokédex favoritos</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 m-4">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden w-48 flex flex-col"
          >
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-full h-30 object-contain bg-gray-300"
            />

            <div className="flex justify-between items-center">
              <h2 className="capitalize font-bold">{pokemon.name}</h2>

              <div className="text-sm text-gray-500">
                {pokemon.types.map((t) => t.type.name).join(", ")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
