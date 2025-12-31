
// Script de conexión entre la interfaz y la clase GhibliAPI
const api = new GhibliAPI();
const salida = document.getElementById("salida");

// Función para sanitizar texto y evitar inyección de código
function sanitize(str) {
    return String(str)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}


// Permite mostrar HTML seguro en el área de salida
function mostrarEnSalidaHTML(html) {
    salida.innerHTML = html;
}

function mostrarEnSalida(datos, opciones = {}) {
    if (!datos || datos.length === 0) {
        salida.textContent = "No hay resultados para mostrar.";
        return;
    }
    // Si se solicita modo cartas (coleccionables)
    if (opciones.modoCartas && Array.isArray(datos)) {
        let html = '<div class="ghibli-cards">';
        datos.forEach(p => {
            html += `<div class="ghibli-card">
                <img src="${sanitize(p.imagen || p.poster || p.image || '')}" alt="Poster de ${sanitize(p.Título || p.title)}" class="ghibli-card-img" onerror="this.style.display='none'">
                <div class="ghibli-card-body">
                    <div class="ghibli-card-title">${sanitize(p.Título || p.title)}</div>
                    <div class="ghibli-card-year">${sanitize(p.Año || p.release_date)}</div>
                </div>
            </div>`;
        });
        html += '</div>';
        mostrarEnSalidaHTML(html);
        return;
    }
    // Si se solicita modo descripción con imagen
    if (opciones.modoDescripcion && Array.isArray(datos)) {
        let html = '';
        datos.forEach(p => {
            html += `<div class="ghibli-desc-block">
                <div class="ghibli-desc-header">
                    <img src="${sanitize(p.imagen || p.poster || p.image || '')}" alt="Imagen de ${sanitize(p.Título || p.title)}" class="ghibli-desc-img" onerror="this.style.display='none'">
                    <span class="ghibli-desc-title">${sanitize(p.Título || p.title)}</span>
                </div>
                <div class="ghibli-desc-text">${sanitize(p.Descripción || p.description)}</div>
            </div>`;
        });
        mostrarEnSalidaHTML(html);
        return;
    }
    // Formato tabular simple con títulos/años resaltados
    const claves = Object.keys(datos[0]);
    let html = '<div class="ghibli-table">';
    html += '<div class="ghibli-table-header">' + claves.map(k => `<span>${sanitize(k)}</span>`).join('') + '</div>';
    datos.forEach(obj => {
        html += '<div class="ghibli-table-row">';
        claves.forEach(k => {
            if (k === 'Título' || k === 'Año' || k === 'title' || k === 'release_date') {
                html += `<span class="ghibli-bold ghibli-large">${sanitize(obj[k])}</span>`;
            } else {
                html += `<span>${sanitize(obj[k])}</span>`;
            }
        });
        html += '</div>';
    });
    html += '</div>';
    mostrarEnSalidaHTML(html);
}

document.getElementById("btn-titulos-directores").onclick = async () => {
    try {
        const lista = await api.listarTitulosYDirectores();
        mostrarEnSalida(lista);
    } catch (e) {
        salida.textContent = e.message;
    }
};

document.getElementById("btn-titulos-anio").onclick = async () => {
    try {
        let lista = await api.listarTitulosYAnio();
        // Obtener imágenes de la API para cada película
        const peliculas = await api.obtenerPeliculas();
        lista = lista.map(item => {
            const peli = peliculas.find(p => p.title === item.Título);
            return { ...item, imagen: peli ? peli.image : '' };
        });
        mostrarEnSalida(lista, { modoCartas: true });
    } catch (e) {
        salida.textContent = e.message;
    }
};

document.getElementById("btn-filtrar-anio").onclick = async () => {
    const entrada = prompt("Ingrese un año (YYYY):");
    if (!/^\d{4}$/.test(entrada)) {
        salida.textContent = "Año inválido";
        return;
    }
    const anio = Number.parseInt(entrada, 10);
    try {
        let lista = await api.filtrarPorAnio(anio);
        // Obtener imágenes de la API para cada película filtrada
        const peliculas = await api.obtenerPeliculas();
        lista = lista.map(item => {
            const peli = peliculas.find(p => p.title === item.Título);
            return { ...item, imagen: peli ? peli.image : '' };
        });
        mostrarEnSalida(lista, { modoCartas: true });
    } catch (e) {
        salida.textContent = e.message;
    }
};

document.getElementById("btn-titulos-descripcion").onclick = async () => {
    try {
        let lista = await api.listarTitulosYDescripcion();
        // Obtener imágenes de la API para cada película
        const peliculas = await api.obtenerPeliculas();
        lista = lista.map(item => {
            const peli = peliculas.find(p => p.title === item.Título);
            return { ...item, imagen: peli ? peli.image : '' };
        });
        mostrarEnSalida(lista, { modoDescripcion: true });
    } catch (e) {
        salida.textContent = e.message;
    }
};

document.getElementById("btn-ids").onclick = async () => {
    try {
        const lista = await api.listarIds();
        mostrarEnSalida(lista);
    } catch (e) {
        salida.textContent = e.message;
    }
};
