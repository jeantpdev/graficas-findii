import config from './supabase/keys.js';


//Modelo que recibe los datos y los envia a la base de datos
const Modelo = {

  async traer_datos_agente(cedula) {
    const datos_insertar_bd = {
      cedula: cedula,
    }

    //se almacena la respuesta en "res" para obtener el resultado de la petición y retornarla para mostrar en la vista
    const res = axios({
      method: "POST",
      url: "http://127.0.0.1:5000/datos-agente",
      headers: config.headers,
      data: datos_insertar_bd,
    });
    return res
  }

}

const Vista = {

  datosEstadisticos(res) {

    const ventas_totales = res.data.ventas_totales
    const valores = res.data.ventas_realizadas

    const datos = document.getElementById("contenedorDatos")
    const contenidoDatos = document.createElement('div')

    contenidoDatos.classList.add("estadistica")

    contenidoDatos.innerHTML = `
      <div class="titulo">
          <p>Ventas totales realizadas</p>
      </div>
         
      <div class="valor">
          <p>${ventas_totales}</p>
      </div>

      <div class="icono">
          <i class="fa-solid fa-money-check-dollar"></i>
      </div>
    `
    datos.append(contenidoDatos)

    // valores.forEach(element => {
    //   const datos = document.getElementById("contenedorDatos")
    //   const contenidoDatos = document.createElement('div')

    //   contenidoDatos.classList.add("estadistica")
    //   contenidoDatos.innerHTML = `
    //       <div class="titulo">
    //         <p>Ventas realizadas</p>
    //      </div>
         
    //      <div class="valor">
    //        <p>{}</p>
    //      </div>

    //      <div class="icono">
    //        <i class="fa-solid fa-money-check-dollar"></i>
    //      </div>
    // `
    //   contenidoDatos.append(datos)
    // });

  }

}

const Controlador = {

  async datos_agente() {
    const res = await Modelo.traer_datos_agente(localStorage.getItem('cedula'))
    Vista.datosEstadisticos(res)
  },

}

// const botonEnviar = document.getElementById('btnIngresar');

// botonEnviar.onclick = function () {
//     Controlador.iniciarSesion()
// }

document.addEventListener('DOMContentLoaded', function () {
  Controlador.datos_agente()
})


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







