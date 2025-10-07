import { useEffect, useState } from "react";
import PixelNavbar from "../components/PixelNavbar";
import { getPokemons, searchPokemonsByName } from "../api/pokeapi";
import { useNavigate } from "react-router-dom";

export const Data = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setPage((prev) => (prev > 0 ? prev - 1 : 0));
  };

  useEffect(() => {
    getPokemons(10, page * 10).then(setPokemons);
  }, [page]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemons(10, page * 10);
      setPokemons(data);
      setSelected(data[0]);
    };
    fetchData();
  }, [page]);

  useEffect(() => {
    const saved = localStorage.getItem("selectedPokemon");
    if (saved) setSelected(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (selected)
      localStorage.setItem("selectedPokemon", JSON.stringify(selected));
  }, [selected]);

  useEffect(() => {
    const fetchSearch = async () => {
      if (searchTerm.trim() === "") {
        getPokemons(10, page * 10).then(setPokemons);
        return;
      }

      const results = await searchPokemonsByName(searchTerm);
      setPokemons(results);
    };

    fetchSearch();
  }, [searchTerm]);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <PixelNavbar />
      <div className="mt-6 sm:mt-8 flex items-center gap-3 bg-white border-4 border-black shadow-[4px_4px_0_#666666] px-3 py-2 w-[90%] sm:w-[70%] md:w-[50%]">
        <input
          type="text"
          placeholder="Buscar un Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent outline-none text-gray-800 text-sm placeholder-gray-400"
        />
        <img
          src="src/assets/pixel.png"
          alt="Pokebola pixel"
          className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer"
        />
      </div>

      <div className="flex flex-col lg:flex-row w-[90%] sm:w-3/4 mt-8 sm:mt-10 gap-6 lg:gap-0">
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-start space-y-6">
          <div className="w-3/4 bg-white border-4 border-[#d1d1d1] shadow-[4px_4px_0_#000] py-2 h-[50px] flex items-center justify-center">
            {selected ? (
              <h2 className="text-center text-lg sm:text-xl font-bold text-gray-800 [text-shadow:2px_1px_0_#D6D6D6]">
                {selected.name.charAt(0).toUpperCase() + selected.name.slice(1)}
              </h2>
            ) : (
              <div className="w-2/3 h-4 bg-gray-300 animate-pulse rounded"></div>
            )}
          </div>

          <div className="w-3/4 flex items-center justify-center py-6 relative">
            <div
              className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-70"
              style={{ backgroundImage: `url('src/assets/pokebola.png')` }}
            ></div>

            <div className="relative w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] flex items-center justify-center">
              {!selected ? (
                <div className="w-full h-full bg-gray-200 animate-pulse border-2 border-gray-300 rounded-lg shadow-inner"></div>
              ) : (
                <img
                  src={selected.sprites.front_default}
                  alt={selected.name}
                  className="w-full h-full object-contain relative z-10 image-rendering-pixelated"
                />
              )}
            </div>
          </div>

          <button
            onClick={() => selected && navigate(`/pokemon/${selected.name}`)}
            className="w-3/4 bg-white border-4 border-[#d1d1d1] shadow-[4px_4px_0_#000] py-2 text-center text-lg sm:text-xl font-bold text-gray-800 hover:bg-gray-200 [text-shadow:2px_1px_0_#D6D6D6]"
          >
            Ver Más
          </button>
        </div>

        <div className="w-full lg:w-1/3 h-[300px] sm:h-[400px] lg:h-[420px] flex flex-col bg-white border-5 border-black overflow-y-auto shadow-[4px_4px_0_#858585]">
          {pokemons.map((poke) => (
            <button
              key={poke.id}
              onClick={() => setSelected(poke)}
              className={`flex items-center justify-between px-4 py-2 border-b border-gray-300 text-left [text-shadow:2px_1px_0_#D6D6D6] ${
                selected?.id === poke.id
                  ? "bg-red-500 text-white [text-shadow:2px_2px_0_Black]"
                  : "hover:bg-gray-100"
              }`}
            >
              <span className="font-bold">
                {String(poke.id).padStart(3, "0")}
              </span>
              <span className="font-bold">{poke.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 sm:gap-6 mt-6 sm:mt-8 mb-8">
        <button
          onClick={handlePrevPage}
          className="bg-[#c0c0c0] border-4 border-black text-black font-bold px-3 sm:px-4 py-1 shadow-[2px_2px_0_#666666] active:translate-y-[1px]"
        >
          {"<"}
        </button>

        <button
          onClick={handleNextPage}
          className="bg-[#c0c0c0] border-4 border-black text-black font-bold px-3 sm:px-4 py-1 shadow-[2px_2px_0_#666666] active:translate-y-[1px]"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};
