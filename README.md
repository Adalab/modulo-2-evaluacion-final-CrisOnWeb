# SERIESFERA - Buscador de series

## Descripción

Aplicación web que permite buscar series a través de una API y gestionar una lista de favoritos con persistencia en LocalStorage. El proyecto se centra en la manipulación del DOM, consumo de APIs y gestión de estado en JavaScript.

## Demo

Puedes acceder a la demo del proyecto [aquí](#).

## Tecnologías

- HTML5 (estructura semántica)
- SCSS (arquitectura modular con partials)
- JavaScript (ES6+)
- Vite (entorno de desarrollo y build)
- Consumo de API REST ([TVMaze API](https://www.tvmaze.com/api))
- LocalStorage (persistencia de favoritos)

## Funcionalidades

- Búsqueda de series mediante API
- Renderizado dinámico de resultados
- Añadir y eliminar favoritos
- Persistencia de datos con LocalStorage
- Interfaz responsive
- Feedback visual con estados (hover, focus, transiciones)

## Estructura del proyecto

- `/src` → código fuente
- `/scss` → SCSS modular
- `/js` → lógica de la aplicación (manipulación del DOM y gestión de estado)
- `/partials` → fragmentos HTML reutilizables
- `/public` → assets estáticos

## Base del proyecto

Este proyecto está basado en el [starter kit de Adalab](https://github.com/Adalab/adalab-web-starter-kit), que incluye configuración inicial con Vite para facilitar el desarrollo moderno en frontend.

## Instalación

1. Clona el [repositorio](https://github.com/Adalab/modulo-2-evaluacion-final-CrisOnWeb):
   `git clone https://github.com/Adalab/modulo-2-evaluacion-final-CrisOnWeb.git`
2. Instala las dependencias:
   `npm install`
3. Arranca el proyecto en desarrollo:
   `npm run dev`

## Scripts disponibles

- `npm run dev` → inicia el entorno de desarrollo.
- `npm run build` → genera la versión optimizada para producción.
- `npm run preview` → permite previsualizar la versión final.

## Uso

- Introduce el nombre de una serie en el buscador.
- Presiona enter o haz clic en "Buscar".
- Para añadir una serie a favoritos haz click en la que te interese.
- Para eliminar una serie individualmente existen dos opciones:
  - Haz click en la tarjeta de la serie.
  - Haz click en el botón del corazón.
- Para eliminar todas las series añadidas, haz click en el botón "Borrar todo".

## Próximas mejoras

- Mejorar accesibilidad.
- Implementar tests.
- Migrar a React.

## Autora

- [Cris](https://github.com/CrisOnWeb) – Desarrollo Web Full-Stack en formación en [Adalab](https://adalab.es/).
