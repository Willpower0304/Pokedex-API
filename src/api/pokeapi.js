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

// Buscar Pokémon por nombre parcial
export const searchPokemonsByName = async (query) => {
  try {
    const res = await fetch(`${apiUrl}/pokemon?limit=1000&offset=0`);
    const data = await res.json();

    const filtered = data.results.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );

    const details = await Promise.all(
      filtered.slice(0, 10).map(async (poke) => {
        const res = await fetch(poke.url);
        return res.json();
      })
    );

    return details;
  } catch (err) {
    console.error("Error al buscar pokemones:", err);
    return [];
  }
};

// Obtener detalles de un Pokémon por nombre
export const getPokemonByName = async (name) => {
  try {
    const res = await fetch(`${apiUrl}/pokemon/${name}`);
    const data = await res.json();

    const speciesRes = await fetch(`${apiUrl}/pokemon-species/${name}`);
    const speciesData = await speciesRes.json();

    const flavorTextEntry = speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "es"
    );

    return {
      id: data.id,
      name: data.name,
      types: data.types.map((t) => t.type.name),
      height: data.height,
      weight: data.weight,
      hp: data.stats.find((s) => s.stat.name === "hp")?.base_stat || 0,
      abilities: data.abilities.map((a) => a.ability.name),
      sprite: data.sprites.front_default,
      description: flavorTextEntry
        ? flavorTextEntry.flavor_text.replace(/\n|\f/g, " ")
        : "Sin descripción disponible.",
    };
  } catch (err) {
    console.error("Error al obtener detalles del Pokémon:", err);
    return null;
  }
};
