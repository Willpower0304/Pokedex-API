import { useEffect, useState } from "react";
import PixelNavbar from "../components/PixelNavbar";
import { getPokemons } from "../api/pokeapi";

export const Data = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(0);

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
      setSelected(data[0]); // selecciona el primero de la nueva página
    };
    fetchData();
  }, [page]);

  return (
    <div className="min-h-screen  flex flex-col items-center">
      <PixelNavbar />
      <div className="flex w-3/4 mt-10 ">
        <div className="w-1/2 flex flex-col items-center justify-start   space-y-6">
          <div className="w-3/4 bg-white border-4 border-[#d1d1d1] shadow-[4px_4px_0_#000] py-2">
            {selected && (
              <h2 className="text-center text-xl font-bold text-gray-800">
                {selected.name.charAt(0).toUpperCase() + selected.name.slice(1)}
              </h2>
            )}
          </div>

          <div className="w-3/4 flex items-center justify-center py-6 relative">
            <div
              className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-70 "
              style={{
                backgroundImage: `url('src/assets/pokebola.png')`,
              }}
            ></div>

            {selected && (
              <img
                src={selected.sprites.front_default}
                alt={selected.name}
                className="w-1/2 h-auto relative z-10"
              />
            )}
          </div>
          <a
            className="w-3/4 bg-white border-4 border-[#d1d1d1] shadow-[4px_4px_0_#000] py-2 text-center text-xl font-bold text-gray-800 hover:bg-gray-200"
            href=""
          >
            View More
          </a>
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
