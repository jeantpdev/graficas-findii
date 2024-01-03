import config from './supabase/keys.js';

//Modelo que recibe los datos y los envia a la base de datos
const Modelo = {

  async traerVentasRealizadasAgente(cedula) {
    const datos_insertar_bd = {
      cedula: cedula,
    }

    //se almacena la respuesta en "res" para obtener el resultado de la petición y retornarla para mostrar en la vista
    const res = axios({
      method: "POST",
      url: "http://127.0.0.1:5000/ventas-realizadas-agente",
      headers: config.headers,
      data: datos_insertar_bd,
    });
    return res
  },

  async traerDatosPersonalesAgente(cedula) {
    const datos_insertar_bd = {
      cedula: cedula,
    }

    //se almacena la respuesta en "res" para obtener el resultado de la petición y retornarla para mostrar en la vista
    const res = axios({
      method: "POST",
      url: "http://127.0.0.1:5000/datos-personales-agente",
      headers: config.headers,
      data: datos_insertar_bd,
    });
    return res
  }

}

const Vista = {

  llenarCuadroVentasTotales(cant_venta_totales, titulo) {
    const datos = document.getElementById("contenedorDatos")
    const contenidoDatos = document.createElement('div')

    contenidoDatos.classList.add("estadistica")
    contenidoDatos.innerHTML = `
        <div class="titulo">
            <p>${titulo}</p>
        </div>
         
        <div class="valor">
           <p>${cant_venta_totales}</p>
        </div>

        <div class="icono">
           <i class="fa-solid fa-money-check-dollar"></i>
        </div>
    `
    datos.append(contenidoDatos)
  },

  datosEstadisticos(res) {

    const cant_ventas_totales_realizadas = res.data.cant_ventas_realizadas
    const cant_ventas_totales_octubre = res.data.cant_ventas_octubre
    const cant_ventas_totales_noviembre = res.data.cant_ventas_noviembre
    const cant_ventas_totales_diciembre = res.data.cant_ventas_diciembre

    this.llenarCuadroVentasTotales(cant_ventas_totales_realizadas, "Ventas totales realizadas")
    this.llenarCuadroVentasTotales(cant_ventas_totales_octubre, "Ventas Octubre")
    this.llenarCuadroVentasTotales(cant_ventas_totales_noviembre, "Ventas Noviembre")
    this.llenarCuadroVentasTotales(cant_ventas_totales_diciembre, "Ventas Diciembre")
  },

  datosAgente(res) {
    console.log(res.data)

    const menuNombreAgente = document.getElementById('menuNombreAgente')
    const menuRolUsuario = document.getElementById('menuRolUsuario')

    const parrafoNombreAgente = document.createElement('p')
    const textoNombreAgente = document.createTextNode(res.data.nombre)

    parrafoNombreAgente.appendChild(textoNombreAgente)


    const parrafoRolAgente = document.createElement('p')
    const textoRolAgente = document.createTextNode(res.data.rol)

    parrafoRolAgente.appendChild(textoRolAgente)


    menuNombreAgente.appendChild(parrafoNombreAgente)
    menuRolUsuario.appendChild(parrafoRolAgente)

  },

  opcionesMenu() {
    if (localStorage.getItem('access_token')) {
      const contenidoPerfil = document.getElementById('contenidoPerfil')
      contenidoPerfil.innerHTML =
        `
      <div class="enlaces">
        <div class="enlace">
            <div class="icono">
                <i class="fa-solid fa-user"></i>
            </div>

            <div class="texto">
                <button>Mi perfil</button>
            </div>

            <div class="enlace">
                <div class="icono">
                    <i class="fa-solid fa-gear"></i>
                </div>

                <div class="texto">
                    <button>Configurar</button>
                </div>
            </div>

        </div>
    </div>

    <div class="pie-menu">
        <div class="enlace">
            <div class="icono">
                <i class="fa-solid fa-right-from-bracket"></i>
            </div>

            <div class="texto">
                <button id = "cerrarSesion">Cerrar sesión</button>
            </div>
        </div>
    </div>      
      `;

      const botonCerrarSesion = document.getElementById('cerrarSesion')
      botonCerrarSesion.onclick = function () {
        localStorage.clear()
        location.href = ("./pages/login.html");
      }
    } else {
      const contenidoPerfil = document.getElementById('contenidoPerfil')
      contenidoPerfil.innerHTML =
        `
      <div class="enlaces">

      </div>

      <div class="pie-menu">
          <div class="enlace">
            <div class="icono">
                <i class="fa-solid fa-right-from-bracket"></i>
            </div>

            <div class="texto">
                <button id = "iniciarSesion">Iniciar Sesión</button>
            </div>
        </div>
      </div>      
      `;

      const iniciarSesion = document.getElementById('iniciarSesion');
      iniciarSesion.onclick = function () {
        location.href = ("./pages/login.html");
      }
    }
  },


}

const Controlador = {

  async ventasRealizadasAgente() {
    const res = await Modelo.traerVentasRealizadasAgente(localStorage.getItem('cedula'))
    Vista.datosEstadisticos(res)
  },

  async datosAgente() {
    const res = await Modelo.traerDatosPersonalesAgente(localStorage.getItem('cedula'))
    Vista.datosAgente(res)
  }

}


document.addEventListener('DOMContentLoaded', function () {
  Controlador.ventasRealizadasAgente()
  Controlador.datosAgente()
  Vista.opcionesMenu()

})

function horaActual() {
  // Función para obtener la hora actual y actualizar el elemento correspondiente
    const currentTimeElement = document.getElementById('horaActual');
    const now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    let ampm = 'am';

    // Convertir a formato de 12 horas
    if (hours > 12) {
      hours -= 12;
      ampm = 'pm';
    }

    // Formato: HH:MM:SS
    const currentTimeString = `${hours}:${minutes}:${seconds} ${ampm}`;

    // Actualizar el contenido del elemento
    currentTimeElement.textContent = currentTimeString;
}

horaActual();
setInterval(horaActual, 1000);


const ctx = document.getElementById('myChart');
const dona = document.getElementById('myDona');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

new Chart(dona, {
  type: 'doughnut',
  data: {
    labels: [
      '% Ventas realizadas',
      '% Por cumplir'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
      ],
      hoverOffset: 4
    }]
  }
});

const abrirMenuOpciones = document.getElementById('abrirMenuOpciones');
const opcionesPerfil = document.getElementById('opcionesPerfil');

abrirMenuOpciones.onclick = function () {
  if (opcionesPerfil.style.display === "none" || opcionesPerfil.style.display === "") {
    opcionesPerfil.style.display = "block";
  } else {
    opcionesPerfil.style.display = "none";
  }
};







