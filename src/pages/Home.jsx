import PixelNavbar from "../components/PixelNavbar";
import pikachuGif from "../assets/gif.webp";
export const Home = () => {
  return (
    <div className="min-h-screen  flex flex-col items-center">
      <PixelNavbar />

      <div className="mt-5 bg-[#eb0000] border-5 border-black shadow-[inset_0_-2px_0_#c90000] w-1/3 text-center">
        <h1 className="text-5xl text-white font-bold tracking-wide py-2">
          Pokédex
        </h1>
      </div>

      <div className=" flex flex-col items-center">
        <div className="bg-[#fff] border-4 border-[#d1d1d1] shadow-[4px_4px_0_#000] px-6 py-4 ">
          <img
            src={pikachuGif}
            alt="Pikachu corriendo"
            className="w-50 h-auto image-rendering-pixelated"
          />
        </div>
        <div className="mt-10 bg-[#ffffff] border-4 border-black shadow-[4px_4px_0_#a0a0a0] px-8 py-4 w-3/4 md:w-1/2">
          <p
            className="text-gray-800 text-lg leading-relaxed text-center"
            style={{ fontFamily: "Lucida Console, monospace" }}
          >
            Esta Pokédex digital fue creada para explorar y descubrir Pokémon de
            todo tipo. Entrena, aprende y disfruta de cada especie desde tu
            navegador.
          </p>
        </div>
      </div>
    </div>
  );
};
