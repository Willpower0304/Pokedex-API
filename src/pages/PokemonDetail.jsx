import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PixelNavbar from "../components/PixelNavbar";
import { getPokemonByName } from "../api/pokeapi";
import typeColors from "../utils/typeColors";

export const PokemonDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemonByName(name);
      if (!data || data.detail === "Not found.") {
        navigate("/data");
      } else {
        setPokemon(data);
      }
    };
    fetchData();
  }, [name, navigate]);

  if (!pokemon) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-bold text-gray-700">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center ">
      <PixelNavbar />

      <div className="w-2/3 mt-20 flex flex-col md:flex-row gap-10 justify-between">
        <div className="flex-1 flex flex-col items-center justify-start">
          <img
            src={pokemon.sprite}
            alt={pokemon.name}
            className="w-48 h-48 object-contain"
          />

          <p className="mt-4 text-lg font-bold [text-shadow:2px_1px_0_#D6D6D6]">
            ❤️ HP: <span className="text-red-600">{pokemon.hp}</span>
          </p>

          <div className="mt-3 flex flex-wrap justify-center gap-2 [text-shadow:2px_1px_0_#D6D6D6]">
            {pokemon.abilities.map((ability) => (
              <span
                key={ability}
                className="px-3 py-1 border-2 border-black font-semibold text-sm bg-[#ffffff]"
              >
                {ability}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-1 space-y-5">
          <div className="flex items-center justify-start text-white bg-[#eb0000] [text-shadow:2px_2px_0_#000] border-4 border-[#000] shadow-[4px_4px_0_#000] px-4 py-2">
            <p className="text-lg font-bold text-gray-800 mr-5 text-white">
              #{pokemon.id.toString().padStart(3, "0")}
            </p>
            <p className="text-2xl font-bold capitalize [text-shadow:2px_2px_0_#000]">
              {pokemon.name}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={`px-3 py-1 border-2 border-black font-semibold text-sm uppercase [text-shadow:2px_2px_0_#000]  ${
                  typeColors[type] || "bg-gray-200 text-black"
                }`}
              >
                {type}
              </span>
            ))}
          </div>

          <div className="flex flex-col bg-white border-4 border-[#000] shadow-[4px_4px_0_#000] p-2 font-bold [text-shadow:2px_1px_0_#D6D6D6]">
            <p>
              <b>Altura:</b> {pokemon.height / 10} m
            </p>
            <hr className="my-2 border-dotted border-2 border-gray-300 w-fill" />
            <p>
              <b>Peso:</b> {pokemon.weight / 10} kg
            </p>
          </div>
        </div>
      </div>

      <div className="w-2/3 mt-10 bg-white border-4 border-[#000] shadow-[5px_5px_0_#000] p-4 text-center">
        <p className="font-bold leading-relaxed  text-gray-700 [text-shadow:2px_1px_0_#D6D6D6]">
          {pokemon.description}
        </p>
      </div>

      <button
        onClick={() => navigate("/data")}
        className="mt-6 mb-10 bg-[#c0c0c0] border-4 border-black text-black font-bold px-6 py-2 shadow-[2px_2px_0_#666666] hover:bg-gray-300"
      >
        Volver
      </button>
    </div>
  );
};
