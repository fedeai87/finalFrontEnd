import { obtenerCarrito } from "./storage.js";
import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";

const renderizarCarrito = () => {
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  const contenedor = document.getElementById("contenedor-carrito");
  const acciones = document.getElementById("acciones-carrito");

  contenedor.innerHTML = "";
  acciones.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.textContent = "No hay productos en el carrito.";
    return;
  }

  carrito.forEach((producto, indice) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("card");

    const img = document.createElement("img");
    img.src = "../" + producto.img; // RUTA CORRECTA PARA /pages
    img.alt = producto.nombre;

    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;

    const precio = document.createElement("p");
    precio.textContent = "$" + producto.precio;

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.onclick = () => {
      eliminarProducto(indice);
      renderizarCarrito();
    };

    tarjeta.appendChild(img);
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(btnEliminar);

    contenedor.appendChild(tarjeta);
  });

  const btnVaciar = document.createElement("button");
  btnVaciar.classList.add("btn");
  btnVaciar.textContent = "Vaciar carrito";
  btnVaciar.onclick = () => {
    vaciarCarrito();
    renderizarCarrito();
  };

  acciones.appendChild(btnVaciar);
};

document.addEventListener("DOMContentLoaded", renderizarCarrito);
