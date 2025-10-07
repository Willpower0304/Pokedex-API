import PixelNavbar from "../components/PixelNavbar";
import pikachuGif from "../assets/gif.webp";

export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center relative z-0">
      <PixelNavbar />
      <div className="mt-16 sm:mt-20 bg-[#eb0000] border-4 border-black shadow-[inset_0_-2px_0_#c90000] w-4/5 sm:w-1/2 md:w-1/3 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-wide py-2 [text-shadow:2px_2px_0_Black]">
          Pokédex
        </h1>
      </div>

      <div className="flex flex-col items-center px-4 sm:px-0 mt-8 sm:mt-10">
        <div className="bg-[#fff] border-4 border-[#d1d1d1] shadow-[4px_4px_0_#000] px-4 py-4 my-6 sm:my-8 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] flex items-center justify-center">
          <img
            src={pikachuGif}
            alt="Pikachu corriendo"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="mt-4 sm:mt-5 bg-[#ffffff] border-4 border-black shadow-[4px_4px_0_#a0a0a0] px-4 sm:px-8 py-3 sm:py-4 w-full sm:w-3/4 md:w-1/2">
          <p className="text-gray-800 text-sm sm:text-base leading-relaxed text-center [text-shadow:2px_1px_0_#D6D6D6]">
            Esta Pokédex digital fue creada para explorar y descubrir Pokémon de
            todo tipo. Entrena, aprende y disfruta de cada especie desde tu
            navegador.
          </p>
        </div>
      </div>
    </div>
  );
};
