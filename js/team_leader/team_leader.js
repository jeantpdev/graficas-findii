import config from '../supabase/keys.js';

const Modelo = {

    async traerVentasRealizadasAgente(cedula) {
        //se almacena la respuesta en "res" para obtener el resultado de la petición y retornarla para mostrar en la vista
        const res = axios({
            method: "GET",
            url: "http://127.0.0.1:5000/mostrar-ventas-realizadas/" + cedula,
            headers: config.headers,
        });
        return res
    },

    async traerDatosPersonalesAgente(cedula) {

        //se almacena la respuesta en "res" para obtener el resultado de la petición y retornarla para mostrar en la vista
        const res = axios({
            method: "GET",
            url: "http://127.0.0.1:5000/mostrar-datos-personales/" + cedula,
            headers: config.headers,
        });
        return res
    }

}

const Controlador = {

    async ventasRealizadasAgente() {
        const res = await Modelo.traerVentasRealizadasAgente(localStorage.getItem('cedula'))
        Vista.datosEstadisticos(res)
    },

    async datosAgente() {
        const res = await Modelo.traerDatosPersonalesAgente(localStorage.getItem('cedula'))
        Vista.datosAgente(res)
    },

    async datosAgenteGraficas() {
        const res = await Modelo.traerVentasRealizadasAgente(localStorage.getItem('cedula'))
        Vista.mostrarGraficas(res)
    },
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
        const cant_ventas_totales_noviembre = res.data.cant_ventas_noviembre
        const cant_ventas_totales_diciembre = res.data.cant_ventas_diciembre
        const cant_ventas_totales_enero = res.data.cant_ventas_enero

        this.llenarCuadroVentasTotales(cant_ventas_totales_realizadas, "Ventas Totales")
        this.llenarCuadroVentasTotales(cant_ventas_totales_noviembre, "Ventas Noviembre")
        this.llenarCuadroVentasTotales(cant_ventas_totales_diciembre, "Ventas Diciembre")
        this.llenarCuadroVentasTotales(cant_ventas_totales_enero, "Ventas Enero")
        this.llenarCuadroVentasTotales(23, "Promedio equipo")
        this.llenarCuadroVentasTotales(25, 'Promedio mensual')
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
            if (localStorage.getItem('rol') == "team leader") {
                contenidoPerfil.innerHTML =
                    `
                    <div class="enlaces">
                        <div class="enlace">
                            <div class="icono">
                                <i class="fa-solid fa-house"></i>
                            </div>

                            <div class="texto">
                                <button><a href= "../../home.html">Mis estadisticas</a></button>
                            </div>
                        </div>

                        <div class="enlace">
                            <div class="icono">
                                <i class="fa-solid fa-user"></i>
                            </div>
                    
                            <div class="texto">
                                <button><a href= "../perfil.html">Mi perfil</a></button>
                            </div>
                        </div>

                        <div class="enlace">
                            <div class="icono">
                                <i class="fa-solid fa-user"></i>
                            </div>
                    
                            <div class="texto">
                                <button><a href= "./inicio_team_leader.html">Mi equipo</a></button>
                            </div>
                        </div>

                        <div class="enlace">
                        <div class="icono">
                            <i class="fa-solid fa-user"></i>
                        </div>
            
                        <div class="texto">
                            <button><a href= "../formulario_ventas.html">Añadir Venta</a></button>
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
            } else {
                contenidoPerfil.innerHTML =
                `
          <div class="enlaces">
            <div class="enlace">
                <div class="icono">
                    <i class="fa-solid fa-house"></i>
                </div>

                <div class="texto">
                    <button><a href= "../home.html">Inicio</a></button>
                </div>
            </div>

            <div class="enlace">
              <div class="icono">
                  <i class="fa-solid fa-user"></i>
              </div>
    
              <div class="texto">
                <button><a href= "./perfil.html">Mi perfil</a></button>
              </div>
            </div>

            <div class="enlace">
            <div class="icono">
                <i class="fa-solid fa-user"></i>
            </div>
  
            <div class="texto">
                <button><a href= "./formulario_ventas.html">Añadir Venta</a></button>
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
            }


            const botonCerrarSesion = document.getElementById('cerrarSesion')
            botonCerrarSesion.onclick = function () {
                localStorage.clear()
                location.href = ("./login.html");
            }

        } else {
            location.href = ("./login.html");
        }
    },

    crearGrafico(myChart, labels_barra, datos_barra, tipo) {

        new Chart(myChart, {
            type: tipo,
            data: {
                labels: labels_barra,
                datasets: [{
                    label: '# de ventas',
                    data: datos_barra,
                    borderWidth: 1,
                    backgroundColor: [
                        'rgba(93, 23, 235, 0.2)', // Morado oscuro
                        'rgba(0, 100, 0, 0.2)',   // Verde oscuro
                        'rgba(255, 80, 234, 0.2)',
                    ]
                },
                

            ]
            },

        });
    },

    mostrarGraficas(res) {

        const myChart = document.getElementById('myChart')
        const dona = document.getElementById('myDona')

        const mesActual = parseInt(res.data.cant_ventas_enero)

        const datos_barra = [res.data.cant_ventas_noviembre, res.data.cant_ventas_diciembre, mesActual]
        const labels_barra = ['Noviembre', 'Diciembre', 'Enero']
        this.crearGrafico(myChart, labels_barra, datos_barra, 'bar')

        const datos_dona = [mesActual, 23 - mesActual]
        const labels_dona = ['Ventas realizadas', 'Ventas por cumplir']
        this.crearGrafico(dona, labels_dona, datos_dona, 'doughnut')

        const tituloGrafica = document.getElementById('tituloGrafica')
        tituloGrafica.innerHTML =
            `
        <p>Ventas mes actual =  ${mesActual}/23</p>
        `;
    }

}

document.addEventListener('DOMContentLoaded', function () {
    if (!localStorage.getItem('agente')){
        location.href = ("../../home.html");
    }
    Controlador.ventasRealizadasAgente();
    Controlador.datosAgenteGraficas();
    Controlador.datosAgente();
    Vista.opcionesMenu();
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