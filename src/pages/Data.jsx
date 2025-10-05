import { useEffect, useState } from "react";
import { getPokemons } from "../api/pokeapi";
import typeColors from "../utils/typeColors";
import PixelNavbar from "../components/PixelNavbar";

export const Data = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemons(9);
      setPokemons(data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-startmin-h-screen bg-gray text-gray-800 gap-10">
      <PixelNavbar />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 m-4">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="bg-gray-100 shadow-lg rounded-xl overflow-hidden w-60 flex flex-col border-black border-3"
          >
            <div className="w-full h-30 flex items-center justify-center bg-[repeating-linear-gradient(135deg,#ffffff_1px,#ffffff_20px,#f0f0f0_1px,_20px,#f0f0f0_40px)]">
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-30 h-30 object-contain"
              />
            </div>

            <div className="flex justify-between items-center p-3 min-h-[35px] border-t-3 border-black">
              <p className="capitalize text-black font-bold font-sm ">
                {pokemon.name}
              </p>

              <div className="flex gap-2">
                {pokemon.types.map((t, i) => (
                  <span
                    key={i}
                    className={`px-1 py-1 rounded-lg text-xs font-bold uppercase border-black border-2 ${
                      typeColors[t.type.name] || "bg-gray-300"
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
};
