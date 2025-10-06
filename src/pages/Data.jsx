import { useEffect, useState } from "react";
import PixelNavbar from "../components/PixelNavbar";
import { getPokemons, searchPokemonsByName } from "../api/pokeapi";

export const Data = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

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
    <div className="min-h-screen  flex flex-col items-center">
      <PixelNavbar />

      <div className="mt-8 flex items-center gap-3 bg-white border-4 border-black shadow-[4px_4px_0_#666666] px-3 py-2 w-100">
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
          className="w-10 h-10 cursor-pointer"
        />
      </div>

      <div className="flex w-3/4 mt-10 ">
        <div className="w-1/2 flex flex-col items-center justify-start   space-y-6">
          <div className="w-3/4 bg-white border-4 border-[#d1d1d1] shadow-[4px_4px_0_#000] py-2 h-[50px] flex items-center justify-center">
            {selected ? (
              <h2 className="text-center text-xl font-bold text-gray-800">
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

            <div className="relative w-[200px] h-[200px] flex items-center justify-center">
              {!selected ? (
                // Skeleton mientras no hay pokemon seleccionado
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
            className="w-3/4 bg-white border-4 border-[#d1d1d1] shadow-[4px_4px_0_#000] py-2 text-center text-xl font-bold text-gray-800 hover:bg-gray-200"
            href=""
          >
            Ver Más
          </button>
        </div>

        <div className="w-1/3 h-105 flex flex-col bg-white border-5 border-black overflow-y-auto shadow-[4px_4px_0_#858585]">
          {pokemons.map((poke, index) => (
            <button
              key={poke.id}
              onClick={() => setSelected(poke)}
              className={`flex items-center justify-between px-4 py-2 border-b border-gray-300 text-left  ${
                selected?.id === poke.id
                  ? "bg-red-500 text-white"
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
      <div className="flex justify-center items-center gap-6 mt-4">
        <button
          onClick={handlePrevPage}
          className="bg-[#c0c0c0] border-4 border-black text-black font-bold px-4 py-1 shadow-[2px_2px_0_#666666] active:translate-y-[1px]"
        >
          {"<"}
        </button>

        <button
          onClick={handleNextPage}
          className="bg-[#c0c0c0] border-4 border-black text-black font-bold px-4 py-1 shadow-[2px_2px_0_#666666] active:translate-y-[1px]"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};
