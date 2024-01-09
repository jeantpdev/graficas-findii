import config from '../supabase/keys.js';

//Modelo que recibe los datos y los envia a la base de datos
const Modelo = {

  async ventasPorLiderEquipo(nombre_lider_equipo){
    const res = axios({
      method: "GET",
      url:'http://127.0.0.1:5000/info-equipo/'+nombre_lider_equipo,
      headers: config.headers,
    });
    return res
  },

  async traerVentasRealizadasAgente(cedula) {
    //se almacena la respuesta en "res" para obtener el resultado de la petición y retornarla para mostrar en la vista
    const res = axios({
      method: "GET",
      url: "http://127.0.0.1:5000/mostrar-ventas-realizadas/"+cedula,
      headers: config.headers,
    });
    return res
  },

  async traerDatosPersonalesAgente(cedula) {

    //se almacena la respuesta en "res" para obtener el resultado de la petición y retornarla para mostrar en la vista
    const res = axios({
      method: "GET",
      url: "http://127.0.0.1:5000/mostrar-datos-personales/"+cedula,
      headers: config.headers,
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

  datosEstadisticos(ventas_miguel, ventas_ray, ventas_davina, ventas_laureano) {
    console.log(ventas_miguel.data)
    const cant_ventas_miguel = ventas_miguel.data['cant_ventas_realizadas']

    console.log(cant_ventas_miguel)

  },

  datosAgente(res) {

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
            <button><a href= "./pages/perfil.html">Mi perfil</a></button>
          </div>
        </div>

        <div class="enlace">
          <div class="icono">
            <i class="fa-solid fa-people-group"></i>
          </div>

          <div class="texto">
              <button><a href= "./equipo.html">Equipos</a></button>
          </div>
        </div>

        <div class="enlace">
          <div class="icono">
            <i class="fa-solid fa-headset"></i>
          </div>

          <div class="texto">
              <button><a href= "./pages/formulario_ventas.html">Ventas</a></button>
          </div>
        </div>

        <div class="enlace">
          <div class="icono">
              <i class="fa-solid fa-file-pen"></i>
          </div>

          <div class="texto">
              <button><a href="https://docs.google.com/forms/d/1zmWZxi-XVMlfp2KE7dv9EEhqIPYGcDDSZY75K1s4lDU/viewform?pli=1&pli=1&edit_requested=true" target="_blank" >Reporte diario</a></button>
          </div>
        </div>

        </div>
    </div>

    <div class="pie-menu">

        <div class="enlace">
            <div class="icono">
                <i class="fa-solid fa-gear"></i>
            </div>

            <div class="texto">
                <button>Configurar</button>
            </div>
        </div>

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
        location.href = ("./pages/login.html");
    }
  },

  crearGrafico(myChart, labels_barra, datos_barra, tipo){

    new Chart(myChart, {
      type: tipo,
      data: {
        labels: labels_barra,
        datasets: [{
          label: '# de ventas',
          data: datos_barra,
          borderWidth: 1
        }]
      },
    });
  },

  crearGraficoLineas(myChart, ventasMiguel, ventasRay, ventasDavina, ventasLaureano){

    new Chart(myChart, {
      type: 'line',
      data: {
        labels: ['Octubre', 'Noviembre', 'Diciembre', 'Enero'],
        datasets: [
          {
            label: 'Ventas Miguel',
            data: ventasMiguel,
            borderWidth: 1
          },
          {
            label: 'Ventas Ray',
            data: ventasRay,
            borderWidth: 1
          },
          {
            label: 'Ventas Davina',
            data: ventasDavina,
            borderWidth: 1
          },
          {
            label: 'Ventas Laureano',
            data: ventasLaureano,
            borderWidth: 1
          },        
      ],
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart'
          }
        }
      },
      },
    });
  },

  mostrarGraficas(ventas_miguel, ventas_ray, ventas_davina, ventas_laureano){

    const myChart = document.getElementById('myChart')

    const ventasMiguel = [ventas_miguel.data['cant_ventas_octubre'], ventas_miguel.data['cant_ventas_noviembre'], ventas_miguel.data['cant_ventas_diciembre'], ventas_miguel.data['cant_ventas_enero']] 
    const ventasRay = [ventas_ray.data['cant_ventas_octubre'], ventas_ray.data['cant_ventas_noviembre'], ventas_ray.data['cant_ventas_diciembre'], ventas_ray.data['cant_ventas_enero']] 
    const ventasDavina = [ventas_davina.data['cant_ventas_octubre'], ventas_davina.data['cant_ventas_noviembre'], ventas_davina.data['cant_ventas_diciembre'], ventas_davina.data['cant_ventas_enero']] 
    const ventasLaureano = [ventas_laureano.data['cant_ventas_octubre'], ventas_laureano.data['cant_ventas_noviembre'], ventas_laureano.data['cant_ventas_diciembre'], ventas_laureano.data['cant_ventas_enero']] 

    this.crearGraficoLineas(myChart, ventasMiguel, ventasRay, ventasDavina, ventasLaureano)

  }

}

const Controlador = {

  async ventasPorLiderEquipo() {
    const ventas_miguel = await Modelo.ventasPorLiderEquipo('miguel')
    const ventas_ray = await Modelo.ventasPorLiderEquipo('ray')
    const ventas_davina = await Modelo.ventasPorLiderEquipo('davina')
    const ventas_laureano = await Modelo.ventasPorLiderEquipo('laureano')

    Vista.mostrarGraficas(ventas_miguel, ventas_ray, ventas_davina, ventas_laureano)
    Vista.datosEstadisticos(ventas_miguel, ventas_ray, ventas_davina, ventas_laureano)

  },
}

document.addEventListener('DOMContentLoaded', function () {
  Vista.opcionesMenu();
  Controlador.ventasPorLiderEquipo();
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

const abrirMenuOpciones = document.getElementById('abrirMenuOpciones');
const opcionesPerfil = document.getElementById('opcionesPerfil');

abrirMenuOpciones.onclick = function () {
  if (opcionesPerfil.style.display === "none" || opcionesPerfil.style.display === "") {
    opcionesPerfil.style.display = "block";
  } else {
    opcionesPerfil.style.display = "none";
  }
};







