// ~~~~~~~~~ variables ~~~~~~~~~~

let carritoDeCompras = document.querySelector('.productosCarrito')

let productos_disponibles = document.querySelector('#articulos')

let boton_oscuro = document.querySelector('.modo_oscuro')

let vaciarCarrito = document.querySelector('.botonEliminar')

let vaCarritoDos = document.querySelector('.remove')


let carritoVacio = 0;


// ~~~~~~~~~~~ Eventos para filtrar ~~~~~~~~~~~~


document.addEventListener("keyup", e =>{

    if(e.target.matches("#buscador")){

        document.querySelectorAll(".divCard").forEach(buscar =>{

            buscar.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                ?buscar.classList.remove("filtro")
                :buscar.classList.add("filtro")
        })

    }
    

})


document.addEventListener("click", e =>{

    if(e.target.matches(".filtrar")){

        document.querySelectorAll(".divCard").forEach(buscar =>{

            buscar.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                ?buscar.classList.remove("filtro")
                :buscar.classList.add("filtro")
        })

    }
    

})


// ~~~~~~~~~~~ Fetch de productos ~~~~~~~~~~~~

fetch(`./js/data.json`)
    .then((res) => res.json())
    .then((data) => {
        render_ropa(data)
    })
    .catch((error) => console.log(error))

// ~~~~~~~~~ For each para renderizar en el html los productos ~~~~~~~~~~


function render_ropa(data) {

    data.forEach((productos) => {

        let clon = document.querySelector('.clon_uno').content.cloneNode(true)
 
        clon.querySelector('h5').innerText = `${productos.prenda}`
        clon.querySelector('.card-text').innerText = `${'$' + productos.precio}`
        clon.querySelector('.talle').innerText = `${'Talle: ' + productos.talle}`
        clon.querySelector('.color').innerText = `${'Color: ' + productos.color}`
        clon.querySelector('.imagen').src = `${productos.imagen}`
        clon.querySelector('.filtros').innerText = `${productos.tipo}`
        
        //~~~~~~~~~~~~~~  evento agregar producto carrito ~~~~~~~~~~~~~~

        clon.querySelector('.delete').addEventListener('click', () => {


            let li = document.createElement('p');

            li.textContent = `${productos.prenda}`;

            carritoDeCompras.appendChild(li);

            let p = document.createElement('p');

            p.textContent = `${'$' + productos.precio}`;

            carritoDeCompras.appendChild(p);

            let botonCarrito = document.createElement('button');

            botonCarrito.textContent = `Comprar`

            carritoDeCompras.appendChild(botonCarrito);

            //~~~~~~~~~~~~~ eventos para vaciar carrito ~~~~~~~~~~~~

            carritoVacio = 1;

            vaciarCarrito.querySelector('.remove').addEventListener('click', () => {
                carritoVacio = 0;

                li.remove();
                p.remove();
                botonCarrito.remove();

            })

            vaciarCarrito.querySelector('.botonComprar').addEventListener('click', () => {
                if (carritoVacio >= 1) {

                    carritoVacio = 0;

                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Su compra se realizo con exito",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                li.remove();
                p.remove();
                botonCarrito.remove();
            })



            Toastify({
                text: `item agregado al carrito`,
                duration: 2000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "left",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #0a0908, #0a0908)",
                },
                onClick: function () { } // Callback after click
            }).showToast();

        })

        productos_disponibles.appendChild(clon)
    });

}



// ~~~~~~~~ Local Storage modo oscuro ~~~~~~~~~~

if (localStorage.getItem('mode')) {
    document.body.classList.value = localStorage.getItem('mode')
}


// ~~~~~~~~~~~~ modo oscuro ~~~~~~~~~~~~~~

boton_oscuro.addEventListener('click', () => {


    let mode = document.body.classList.value

    if (mode == 'bg-oscuro') {
        document.body.classList.value = 'bg-claro'
        localStorage.setItem('mode', 'bg-claro')
        boton_oscuro.innerText = 'Modo oscuro'
    } else {
        document.body.classList.value = 'bg-oscuro'
        localStorage.setItem('mode', 'bg-oscuro')
        boton_oscuro.innerText = 'Modo claro'
    }


})

// ~~~~~~~~~~~~~~ reconocedor de carrito vacio ~~~~~~~~~~~~~~~~

vaciarCarrito.querySelector('.botonComprar').addEventListener('click', () => {
    if (carritoVacio == 0) {

        carritoVacio = 0;

        Swal.fire({
            position: "center",
            icon: "error",
            title: "No hay productos en el carrito",
            showConfirmButton: false,
            timer: 1500
        });
    }
})