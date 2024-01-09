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

}

const Controlador = {

  async ventasPorLiderEquipo() {
    const ventas_miguel = await Modelo.ventasPorLiderEquipo('miguel')
    const ventas_ray = await Modelo.ventasPorLiderEquipo('ray')
    const ventas_davina = await Modelo.ventasPorLiderEquipo('davina')
    const ventas_laureano = await Modelo.ventasPorLiderEquipo('laureano')

    Vista.mostrarGraficas(ventas_miguel, ventas_ray, ventas_davina, ventas_laureano)

  },

}

const Vista = {

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

    mostrarGraficas(ventas_miguel, ventas_ray, ventas_davina, ventas_laureano){

      const myChart = document.getElementById('myChart')
  
      const ventasMiguel = [ventas_miguel.data['cant_ventas_octubre'], ventas_miguel.data['cant_ventas_noviembre'], ventas_miguel.data['cant_ventas_diciembre'], ventas_miguel.data['cant_ventas_enero']] 
      const ventasRay = [ventas_ray.data['cant_ventas_octubre'], ventas_ray.data['cant_ventas_noviembre'], ventas_ray.data['cant_ventas_diciembre'], ventas_ray.data['cant_ventas_enero']] 
      const ventasDavina = [ventas_davina.data['cant_ventas_octubre'], ventas_davina.data['cant_ventas_noviembre'], ventas_davina.data['cant_ventas_diciembre'], ventas_davina.data['cant_ventas_enero']] 
      const ventasLaureano = [ventas_laureano.data['cant_ventas_octubre'], ventas_laureano.data['cant_ventas_noviembre'], ventas_laureano.data['cant_ventas_diciembre'], ventas_laureano.data['cant_ventas_enero']] 
  
      this.crearGrafico(myChart, ['Ventas', 'Realizadsa', 'Prueba'], ventasMiguel, 'bar')
  
    }
}

document.addEventListener('DOMContentLoaded', function () {
    Vista.opcionesMenu();
    Controlador.ventasPorLiderEquipo();
})




const abrirMenuOpciones = document.getElementById('abrirMenuOpciones');
const opcionesPerfil = document.getElementById('opcionesPerfil');

abrirMenuOpciones.onclick = function () {
  if (opcionesPerfil.style.display === "none" || opcionesPerfil.style.display === "") {
    opcionesPerfil.style.display = "block";
  } else {
    opcionesPerfil.style.display = "none";
  }
};