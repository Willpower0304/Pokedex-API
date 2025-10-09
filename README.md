# Pokedex-API (Pokemon App)

## Descripción

Esta es una aplicación front-end construida con React y Vite que consume la PokeAPI para mostrar una lista de Pokémon, sus detalles y filtros por tipos. Está pensada como un proyecto personal y de demostración para consultar y navegar información básica de Pokémon.

Características principales

- Listado paginado de Pokémon.
- Búsqueda por nombre.
- Página de detalle con estadísticas, tipos y sprites.
- Interfaz responsive (básica) con navegación entre páginas.

Tecnologías

- React 19
- Vite
- React Router DOM
- Axios (para llamadas HTTP)
- TailwindCSS (integrado vía plugin)

Requisitos

- Node.js (>=16 recomendado)
- pnpm como gestor de paquetes

## Instalación

1. Clona el repositorio:

   git clone https://github.com/Willpower0304/Pokedex-API.git

2. Entra en el directorio del proyecto:

   cd pokemonApp

3. Instala dependencias usando pnpm:

```powershell
pnpm install
```

## Scripts disponibles

Los scripts definidos en `package.json` son:

- `pnpm dev` — Inicia el servidor de desarrollo con Vite.
- `pnpm build` — Genera la versión de producción.
- `pnpm preview` — Sirve la build de producción de forma local.
- `pnpm lint` — Ejecuta ESLint sobre el proyecto.

## Uso

Para arrancar en modo desarrollo:

```powershell
pnpm run dev
```

Abre http://localhost:5173 (o la URL que Vite muestre) en tu navegador.

## Estructura del proyecto

Raíz del proyecto (solo archivos y carpetas relevantes):

- `index.html` — Entrada HTML.
- `src/` — Código fuente.
  - `main.jsx` — Punto de entrada de React.
  - `App.jsx` — Componente principal.
  - `api/` — Módulos para llamadas a la PokeAPI (`pokeapi.js`).
  - `components/` — Componentes reutilizables (ej. `PixelNavbar.jsx`).
  - `pages/` — Páginas/Views (Home, Data, Info, PokemonDetail).
  - `assets/` — Imágenes y recursos estáticos usados por la app.
  - `utils/` — Utilidades (ej. `typeColors.js` para colores por tipo).
- `public/` — Archivos estáticos que se sirven tal cual.
- `package.json` — Metadatos y scripts.
- `pnpm-lock.yaml` — Lockfile para pnpm.

## API y cómo se consumen los datos

La aplicación usa axios para consumir la PokeAPI (https://pokeapi.co/). El archivo `src/api/pokeapi.js` centraliza las llamadas (obtener lista de Pokémon, detalles por id/nombre, y recursos por tipo). Revisa este archivo si quieres extender o cambiar el comportamiento de las peticiones (p. ej. añadir caching o manejo de errores más robusto).

## Notas de diseño y extensiones sugeridas

- Paginación: actualmente la app consume la lista de Pokémon de PokeAPI con límites/offset.
- Manejo de errores: añadir componentes para estados de carga, errores y vacío.

## Contribuir

Si quieres contribuir:

1. Haz un fork del repositorio.
2. Crea una rama con tu feature/bugfix: `git checkout -b feat/tu-cambio`.
3. Haz commits claros y descriptivos.
4. Abre un pull request contra `main` en el repositorio original.
   Contacto

---

Para preguntas o comentarios, puedes abrir un issue en el repositorio o contactar al autor directamente (si hay información de contacto en el perfil del repo).

---

Cambios aplicados

- README actualizado automáticamente por asistente.
