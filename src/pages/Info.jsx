import { useState, useEffect } from "react";
import PixelNavbar from "../components/PixelNavbar";

export const Info = () => {
  const [canSend, setCanSend] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 4000);
  };

  useEffect(() => {
    const lastSend = localStorage.getItem("lastEmailSend");
    if (lastSend) {
      const elapsed = Date.now() - parseInt(lastSend);
      const fiveMinutes = 5 * 60 * 1000;

      if (elapsed < fiveMinutes) {
        setCanSend(false);
        const remaining = fiveMinutes - elapsed;
        setTimeout(() => setCanSend(true), remaining);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSend) {
      showToast(
        "Debes esperar 5 minutos antes de enviar otro mensaje.",
        "error"
      );
      return;
    }

    const formData = new FormData(e.target);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        showToast("¡Mensaje enviado correctamente!", "success");
        e.target.reset();

        setCanSend(false);
        localStorage.setItem("lastEmailSend", Date.now().toString());

        setTimeout(() => setCanSend(true), 5 * 60 * 1000);
      } else {
        showToast("Hubo un error al enviar el mensaje.", "error");
      }
    } catch (error) {
      showToast("No se pudo conectar con el servidor.", "error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <PixelNavbar />

      <div className="w-11/12 md:w-2/3 mt-16 bg-white border-5 border-black shadow-[6px_6px_0_#858585] p-6 text-center">
        <h1 className="text-3xl font-extrabold mb-10 text-[#000000] [text-shadow:2px_2px_0_#D6D6D6] uppercase">
          Información sobre esta Pokédex
        </h1>

        <p className=" text-gray-700 leading-relaxed [text-shadow:1px_1px_0_#D6D6D6] text-start text">
          Esta página web es una <b>Pokédex interactiva</b> diseñada con un
          estilo retro pixel-art, inspirada en los clásicos videojuegos de
          Pokémon. Permite explorar diferentes Pokémon, ver sus estadísticas,
          tipos, habilidades y descripciones en español, con un diseño
          optimizado tanto para escritorio como para dispositivos móviles.
        </p>

        <p className="mt-6 text-gray-700 leading-relaxed [text-shadow:1px_1px_0_#D6D6D6] text-start">
          Los datos se obtienen directamente de la{" "}
          <a
            href="https://pokeapi.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 underline hover:text-blue-800 font-bold"
          >
            PokéAPI
          </a>
          , una API pública que provee información oficial de cada Pokémon.
          Además, la aplicación utiliza un sistema de caché inteligente para
          mejorar el rendimiento y reducir el tiempo de carga.
        </p>

        <p className="mt-6  text-gray-700 leading-relaxed [text-shadow:1px_1px_0_#D6D6D6]">
          Desarrollado por{" "}
          <span className="text-[#a32a34] font-bold">William Espinoza</span>{" "}
          como parte de un proyecto personal.
        </p>
      </div>

      <div className="w-11/12 md:w-2/3 mt-10 bg-white border-5 border-black shadow-[6px_6px_0_#858585] p-6 ">
        <h2 className="text-2xl font-bold mb-6 text-[#000000] [text-shadow:2px_2px_0_#D6D6D6] uppercase">
          Contactame por Correo
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-left "
        >
          <input
            type="hidden"
            name="access_key"
            required
            value={import.meta.env.VITE_WEB3FORMS_API_KEY}
          />

          <input
            type="text"
            name="name"
            placeholder="Tu nombre"
            required
            className="border-4 border-black p-2 focus:outline-none placeholder-gray-400 font-bold shadow-[4px_4px_0_#858585]"
          />
          <input
            type="email"
            name="email"
            placeholder="Tu correo"
            required
            className="border-4 border-black p-2 focus:outline-none placeholder-gray-400 font-bold shadow-[4px_4px_0_#858585]"
          />
          <textarea
            name="message"
            placeholder="Tu mensaje..."
            required
            className="border-4 border-black p-2 focus:outline-none h-24 placeholder-gray-400 font-bold shadow-[4px_4px_0_#858585]"
          ></textarea>

          <button
            type="submit"
            disabled={!canSend}
            className={`${
              canSend
                ? "bg-[#eb0000] hover:bg-[#8c242c]"
                : "bg-gray-400 cursor-not-allowed"
            } text-white font-bold py-2 border-4 border-black transition-all shadow-[4px_4px_0_#858585] [text-shadow:2px_2px_0_#000000]`}
          >
            {canSend ? "Enviar" : "Espera 5 minutos..."}
          </button>
        </form>
      </div>

      {toast.show && (
        <div
          className={`fixed bottom-5 right-5 px-4 py-3 rounded-lg shadow-lg text-white border-3 border-black transition-all duration-300 ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="mb-10" />
    </div>
  );
};
