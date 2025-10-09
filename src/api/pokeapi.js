const apiUrl = import.meta.env.VITE_POKEAPI_URL;

const safeFetch = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error al cargar: ${url}`);
    return await res.json();
  } catch (err) {
    console.error("❌ Fetch error:", err.message);
    return null;
  }
};

const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

const fetchWithCache = async (url) => {
  const now = Date.now();

  if (cache.has(url)) {
    const { data, timestamp } = cache.get(url);
    if (now - timestamp < CACHE_TTL) {
      return data;
    } else {
      cache.delete(url);
    }
  }

  const data = await safeFetch(url);
  if (data) {
    cache.set(url, { data, timestamp: now });
  }

  return data;
};

export const getPokemons = async (limit = 9, offset = 0) => {
  const data = await fetchWithCache(
    `${apiUrl}/pokemon?limit=${limit}&offset=${offset}`
  );
  if (!data?.results) return [];

  const details = await Promise.all(
    data.results.map((poke) => fetchWithCache(poke.url))
  );

  return details.filter(Boolean);
};

export const searchPokemonsByName = async (query) => {
  const cachedList = await fetchWithCache(
    `${apiUrl}/pokemon?limit=1000&offset=0`
  );
  if (!cachedList?.results) return [];

  const filtered = cachedList.results.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const details = await Promise.all(
    filtered.slice(0, 10).map((poke) => fetchWithCache(poke.url))
  );

  return details.filter(Boolean);
};

export const getPokemonByName = async (name) => {
  const [data, speciesData] = await Promise.all([
    fetchWithCache(`${apiUrl}/pokemon/${name}`),
    fetchWithCache(`${apiUrl}/pokemon-species/${name}`),
  ]);

  if (!data || !speciesData) return null;

  const flavorTextEntry = speciesData.flavor_text_entries.find(
    (entry) => entry.language.name === "es"
  );

  const abilities = await Promise.all(
    data.abilities.map(async (a) => {
      const abilityData = await fetchWithCache(a.ability.url);
      return (
        abilityData?.names.find((n) => n.language.name === "es")?.name ||
        a.ability.name
      );
    })
  );

  return {
    id: data.id,
    name: data.name,
    types: data.types.map((t) => t.type.name),
    height: data.height,
    weight: data.weight,
    hp: data.stats.find((s) => s.stat.name === "hp")?.base_stat || 0,
    abilities,
    sprite: data.sprites.front_default,
    description: flavorTextEntry
      ? flavorTextEntry.flavor_text.replace(/\n|\f/g, " ")
      : "Sin descripción disponible.",
  };
};
