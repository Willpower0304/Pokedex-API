const apiUrl = import.meta.env.VITE_POKEAPI_URL;

// Obtener lista de pokemones
export const getPokemons = async (limit = 9) => {
  try {
    const res = await fetch(`${apiUrl}/pokemon?limit=${limit}`);
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

// Obtener tipos de Pokémon
export const getTypes = async () => {
  try {
    const res = await fetch(`${apiUrl}/type`);
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error("Error al cargar tipos:", err);
    return [];
  }
};
