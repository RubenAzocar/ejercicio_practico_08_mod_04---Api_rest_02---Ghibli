class GhibliAPI {
    constructor(urlBase = "https://ghibliapi.vercel.app/films") {
        this.urlBase = urlBase;
        this.cache = null;
    }

    async obtenerPeliculas() {
        if (this.cache) return this.cache;
        const respuesta = await fetch(this.urlBase);
        if (!respuesta.ok) throw new Error("Error al obtener películas");
        const datos = await respuesta.json();
        this.cache = datos;
        return datos;
    }

    async listarTitulosYDirectores() {
        const peliculas = await this.obtenerPeliculas();
        const lista = peliculas.map(p => ({ Título: p.title, Director: p.director }));
        console.table(lista);
        return lista;
    }

    async listarTitulosYAnio() {
        const peliculas = await this.obtenerPeliculas();
        const lista = peliculas.map(p => ({ Título: p.title, Año: p.release_date }));
        console.table(lista);
        return lista;
    }

    async filtrarPorAnio(anio) {
        const peliculas = await this.obtenerPeliculas();
        const filtradas = peliculas.filter(p => Number.parseInt(p.release_date, 10) === anio);
        const lista = filtradas.map(p => ({ Título: p.title, Año: p.release_date }));
        console.table(lista);
        return lista;
    }

    async listarTitulosYDescripcion() {
        const peliculas = await this.obtenerPeliculas();
        const lista = peliculas.map(p => ({ Título: p.title, Descripción: p.description }));
        console.table(lista);
        return lista;
    }

    async listarIds() {
        const peliculas = await this.obtenerPeliculas();
        const lista = peliculas.map(p => ({ ID: p.id }));
        console.table(lista);
        return lista;
    }
}

// Exportar para uso en otros scripts si es necesario
globalThis.GhibliAPI = GhibliAPI;
