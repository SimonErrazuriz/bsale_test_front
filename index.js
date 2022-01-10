const API_URL = "http://localhost:4001";

fetch(`${API_URL}/productos`)
    .then((res) => res.json())
    .then((productos) => {
        productos.forEach((producto) => {
            setTemplate(producto);
        });
    });

const setTemplate = (producto) => {

    const flex = document.querySelector('.flex');
    const template = document.getElementById('template-productos').content;
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();

    if (producto.url_image == '' || producto.url_image == null) {
        producto.url_image = 'img/image-not-found.png'
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