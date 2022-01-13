
/* Recoger el parámetro buscar de la URL */
const parametros = window.location.search;
const urlParams = new URLSearchParams(parametros);
const buscar = urlParams.get('buscar');

/* Fetch API */
const API_URL = "https://test-bsale-back.herokuapp.com";
fetch(`${API_URL}/productos/${buscar}`)
    .then((res) => res.json())
    .then((productos) => {
        if (productos.length === 0) {
            const h2 = document.getElementById("sin-resultados");
            const texto = document.createTextNode("No existen productos asociados a su búsqueda");
            h2.appendChild(texto);
        } else {
            productos.forEach((producto) => {
                setTemplate(producto);
            });
        }
    });

/* Rellenar template */
const setTemplate = (producto) => {

    const flex = document.querySelector('.flex');
    const template = document.getElementById('template-productos').content;
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();

    if (producto.url_image == '' || producto.url_image == null) {
        producto.url_image = '../assets/img/image-not-found.png'
    }

    clone.querySelector('.card-img-top').setAttribute('src', producto.url_image);
    clone.querySelector('.card-title').innerHTML = producto.name;
    clone.querySelector('.price').innerHTML = `$${producto.price}`;
    if (producto.discount > 0) {
        clone.querySelector('.discount').innerHTML = `-${producto.discount}%`;
    }

    fragment.appendChild(clone);
    flex.appendChild(fragment);
}