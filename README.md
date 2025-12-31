# Ejercicio Práctico - Consumo de API REST Ghibli

## Descripción
Este proyecto consiste en el consumo de la API pública de Studio Ghibli para mostrar información de sus películas. Se utiliza JavaScript moderno, encapsulando la lógica en una clase llamada `GhibliAPI` y presentando los resultados mediante una interfaz web sencilla y amigable, inspirada en la paleta de colores de la película Tonari No Totoro.

## Funcionalidades
- Listar títulos y directores de todas las películas.
- Listar títulos y año de estreno de todas las películas.
- Filtrar películas por año ingresado por el usuario.
- Listar títulos y descripciones de todas las películas.
- Listar los IDs de todas las películas.

## Estructura
- `js/ghibli_api.js`: Clase principal para consumir la API y procesar los datos.
- `js/ghibli_app.js`: Script que conecta la interfaz con la clase y muestra los resultados.
- `assets/documentos/index.html`: Interfaz web con botones para cada funcionalidad y un contenedor para mostrar la salida.
- `assets/documentos/estilos_ghibli.css`: Estilos inspirados en Tonari No Totoro.

## Uso
1. Abrir el archivo `index.html` en un navegador web.
2. Utilizar los botones para consultar la información deseada.
3. Los resultados se muestran en pantalla y en consola.

## Tecnologías
- HTML5
- CSS3
- JavaScript (ES6+)

## Créditos
- API: [Studio Ghibli API](https://ghibliapi.herokuapp.com/films)
- Inspiración visual: Tonari No Totoro (Studio Ghibli)

---
Ejercicio realizado para el curso Fullstack Talento Digital, Módulo 4.
