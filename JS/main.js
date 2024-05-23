const productos = [
    { id: 1, nombre: 'Vino Tinto Reserva', precio: 97174, imagen: 'ASSETS/IMG/thumb_63409_default_big.jpeg', stock: true, descripcion: 'Un vino tinto robusto con notas de frutos rojos y un final aterciopelado.' },
    { id: 2, nombre: 'Vino DV Catena Chardonnay', precio: 36319, imagen: 'ASSETS/IMG/thumb_53000_default_big.jpeg', stock: true, descripcion: 'Un vino blanco fresco y afrutado con un toque de vainilla.' },
    { id: 3, nombre: 'Vino Chañarmuyo Rosado', precio: 6175, imagen: 'ASSETS/IMG/thumb_66857_default_big.jpeg', stock: true, descripcion: 'Un vino rosado delicado con notas florales y de frutas del bosque.' },
    { id: 4, nombre: 'Vino RD Sauvignon Blanc', precio: 3000, imagen: 'ASSETS/IMG/thumb_53690_default_big.jpeg', stock: true, descripcion: 'Un vino espumoso seco con una burbuja fina y persistente.' },
    { id: 5, nombre: 'Vino DV Catena Malbec Magnum', precio: 27700, imagen: 'ASSETS/IMG/thumb_65539_default_big.jpeg', stock: true, descripcion: 'Un vino tinto con cuerpo, perfecto para acompañar carnes rojas.' },
    { id: 6, nombre: 'Vino Casa Boher Sauvignon Blanc', precio: 8520, imagen: 'ASSETS/IMG/thumb_55355_default_big.jpeg', stock: true, descripcion: 'Un vino blanco ligero y refrescante, ideal para mariscos.' },
    { id: 7, nombre: 'Vino Trumpeter Cabernet Sauvignon', precio: 6240, imagen: 'ASSETS/IMG/thumb_61972_default_big.jpeg', stock: true, descripcion: 'Un vino tinto intenso y complejo con notas de roble.' },
    { id: 8, nombre: 'Vino DV Catena Pinot Noir', precio: 21100, imagen: 'ASSETS/IMG/thumb_53001_default_big.jpeg', stock: true, descripcion: 'Un vino tinto elegante y suave con notas de cereza.' },
    { id: 9, nombre: 'Vino Adentro Merlot', precio: 13650, imagen: 'ASSETS/IMG/thumb_68719_default_big.jpeg', stock: true, descripcion: 'Un vino tinto afrutado con taninos suaves.' },
    { id: 10, nombre: 'Vino Fin Edición Limitada Syrah', precio: 21450, imagen: 'ASSETS/IMG/thumb_65304_default_big.jpeg', stock: true, descripcion: 'Un vino tinto equilibrado con aromas frutado, floral y especiado, con notas a vainilla y chocolate.' },
    { id: 11, nombre: 'Vino Zuccardi Q Tempranillo', precio: 12188, imagen: 'ASSETS/IMG/thumb_63442_default_big.jpeg', stock: true, descripcion: 'Un vino tinto equilibrado con notas de frutas negras y especias.' },
    { id: 12, nombre: 'Vino Jovem Miras Semillón', precio: 6341, imagen: 'ASSETS/IMG/thumb_57366_default_big.jpeg', stock: true, descripcion: 'Un vino mineral con un toque de frutas blancas como la manzana, la piña, el albaricoque y el melón.' }
];

const container = document.getElementById("container");
const btnCarrito = document.getElementById("btn-carrito");
const divCarrito = document.getElementById("carrito");
const carritoContainer = document.getElementById("carrito-container");
const totalDiv = document.getElementById("total");

let mostrar = false;

btnCarrito.addEventListener("click", () => mostrarOcultar(mostrar));

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(id) {
    const vinoAAgregar = productos.find(el => el.id === id);
    const index = carrito.findIndex(el => el.id === id);
    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        vinoAAgregar.cantidad = 1;
        carrito.push(vinoAAgregar);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

function quitarDelCarrito(id) {
    const index = carrito.findIndex(el => el.id === id);
    if (index !== -1) {
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad -= 1;
        } else {
            carrito.splice(index, 1);
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
    }
}

function actualizarCarrito() {
    divCarrito.innerHTML = "";
    let total = 0;
    carrito.forEach(el => {
        const carritoItem = document.createElement("div");
        carritoItem.className = "carrito-item m-3";

        const imagen = document.createElement("img");
        imagen.src = el.imagen;
        imagen.alt = el.nombre;

        const nombre = document.createElement("span");
        nombre.innerText = el.nombre;

        const cantidad = document.createElement("span");
        cantidad.innerText = `Cantidad: ${el.cantidad}`;

        const precio = document.createElement("span");
        precio.innerText = `Precio: $${el.precio * el.cantidad}`;

        const botonQuitar = document.createElement("button");
        botonQuitar.innerText = "Quitar";
        botonQuitar.className = "btn btn-danger btn-sm";
        botonQuitar.onclick = () => quitarDelCarrito(el.id);

        carritoItem.appendChild(imagen);
        carritoItem.appendChild(nombre);
        carritoItem.appendChild(cantidad);
        carritoItem.appendChild(precio);
        carritoItem.appendChild(botonQuitar);

        divCarrito.appendChild(carritoItem);

        total += el.precio * el.cantidad;
    });
    totalDiv.innerText = `Total: $${total}`;
}

function crearCard(vino, contenedor) {
    const card = document.createElement("div");
    card.className = vino.stock ? "col-md-4 mb-4 card" : "col-md-4 mb-4 no-card";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body m-3";

    const titulo = document.createElement("h5");
    titulo.innerText = vino.nombre;
    titulo.className = "card-title titulo";

    const imagen = document.createElement("img");
    imagen.src = vino.imagen;
    imagen.alt = vino.nombre;
    imagen.className = "img card-img-top";

    const descripcion = document.createElement("p");
    descripcion.innerText = vino.descripcion;
    descripcion.className = "card-text mx-3";

    const precio = document.createElement("p");
    precio.innerText = `$${vino.precio}`;
    precio.className = "card-text mt-2";

    const botonAgregar = document.createElement("button");
    botonAgregar.innerText = contenedor === "container" ? "Agregar al Carrito" : "Quitar del Carrito";
    botonAgregar.className = "button m-3";
    botonAgregar.onclick = contenedor === "container" ? () => agregarAlCarrito(vino.id) : () => quitarDelCarrito(vino.id);

    cardBody.appendChild(titulo);
    cardBody.appendChild(imagen);
    cardBody.appendChild(descripcion);
    cardBody.appendChild(precio);
    cardBody.appendChild(botonAgregar);

    card.appendChild(cardBody);

    const nuevoContenedor = contenedor === "container" ? container : divCarrito;
    nuevoContenedor.appendChild(card);
}

function mostrarOcultar(estadoActual) {
    if (estadoActual) {
        mostrar = false;
        carritoContainer.classList.remove("show");
    } else {
        mostrar = true;
        carritoContainer.classList.add("show");
    }
}

productos.forEach(el => crearCard(el, "container"));
carrito.forEach(el => crearCard(el, "carrito"));
actualizarCarrito();