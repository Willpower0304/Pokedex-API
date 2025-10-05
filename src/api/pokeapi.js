const apiUrl = import.meta.env.VITE_POKEAPI_URL;

// Obtener lista de pokemones con paginación
export const getPokemons = async (limit = 9, offset = 0) => {
  try {
    const res = await fetch(
      `${apiUrl}/pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await res.json();

    const details = await Promise.all(
      data.results.map(async (poke) => {
        const res = await fetch(poke.url);
        return res.json();
      })
    );

    return details;
  } catch (err) {
    console.error("Error al cargar pokemones:", err);
    return [];
  }
};
