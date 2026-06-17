<div align="center">

<img src="src/assets/logo-flowlist.svg" width="280" alt="Flowlist Logo" />

**Genera playlists según tu estado de ánimo, género y época.**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Last.fm](https://img.shields.io/badge/Last.fm-API-D51007?style=flat&logo=lastdotfm&logoColor=white)](https://last.fm)

</div>

---

## ¿Qué es Flowlist?

Aplicación web que genera playlists personalizadas combinando estado de ánimo, género musical y época. Construida con React y la API de Last.fm para explorar gestión de estado más compleja, persistencia con localStorage y consumo de múltiples endpoints de una API real.

---

## Funcionalidades

- 🎭 Selección de estado de ánimo, género musical y época
- 🎲 Modo "Sorpréndeme" — combinación aleatoria con un clic
- 🎵 Playlist generada con portadas, evitando que un mismo artista se repita demasiado
- 💾 Guardar playlists favoritas en el navegador (localStorage)
- 📋 Compartir playlist copiando la lista al portapapeles
- ▶️ Enlace directo a YouTube para escuchar cada canción
- ✨ Animaciones de entrada al generar resultados

---

## Stack

| Tecnología | Uso |
|---|---|
| React 18 | Framework de UI |
| Vite | Bundler y entorno de desarrollo |
| Axios | Llamadas a la API |
| Last.fm API | Datos musicales (tags, canciones, artistas) |
| lucide-react | Iconografía |
| localStorage | Persistencia de playlists guardadas |

---

## Instalación local

```bash
# 1. Clona el repositorio
git clone https://github.com/mariamv13/flowlist.git
cd flowlist

# 2. Instala las dependencias
npm install

# 3. Crea el archivo .env con tu API key de Last.fm
cp .env.example .env
# Edita .env y añade tu clave

# 4. Arranca el servidor de desarrollo
npm run dev
```

Accede a `http://localhost:5173`

---

## Autora

**María Martín Vélez** · [GitHub](https://github.com/mariamv13) · [LinkedIn](https://www.linkedin.com/in/maría-martín-vélez-50001b40a/)