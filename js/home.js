import config from './supabase/keys.js';

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
        Vista.mostrarTablaDatos(res)
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

        this.llenarCuadroVentasTotales(cant_ventas_totales_noviembre, "Ventas Noviembre")
        this.llenarCuadroVentasTotales(cant_ventas_totales_diciembre, "Ventas Diciembre")
        this.llenarCuadroVentasTotales(cant_ventas_totales_enero, "Ventas Enero")
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
                                <button><a href= "./home.html">Mis estadisticas</a></button>
                            </div>
                        </div>

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
                                <i class="fa-solid fa-user"></i>
                            </div>
                    
                            <div class="texto">
                                <button><a href= "./pages/team_leader/inicio_team_leader.html">Mi equipo</a></button>
                            </div>
                        </div>

                        <div class="enlace">
                        <div class="icono">
                            <i class="fa-solid fa-user"></i>
                        </div>
            
                        <div class="texto">
                            <button><a href= "./pages/formulario_ventas.html">Añadir Venta</a></button>
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
            if (localStorage.getItem('rol') == "agente"){
                contenidoPerfil.innerHTML =
                `
          <div class="enlaces">
            <div class="enlace">
                <div class="icono">
                    <i class="fa-solid fa-house"></i>
                </div>

                <div class="texto">
                    <button><a href= "./home.html">Inicio</a></button>
                </div>
            </div>

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
                <i class="fa-solid fa-user"></i>
            </div>
  
            <div class="texto">
                <button><a href= "./pages/formulario_ventas.html">Añadir Venta</a></button>
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
                location.href = ("./pages/login.html");
            }

        } else {
            location.href = ("./pages/login.html");
        }
    },

    mostrarTablaDatos(response) {
        const datos = response.data['ventas_realizadas'];
        console.log(datos);
        const tablaDatos = document.getElementById('tablaDatos');
        tablaDatos.innerHTML = '';

        // Definir las columnas que deseas mostrar
        const columnasAMostrar = ['fecha_ingreso_venta', 'compania', 'dni', 'nombre', 'observaciones_venta'];


        // Crear encabezado
        const encabezadoRow = document.createElement('tr');
        for (const columna of columnasAMostrar) {
            const th = document.createElement('th');
            th.textContent = columna;
            encabezadoRow.appendChild(th);
        }
        tablaDatos.appendChild(encabezadoRow);

        // Crear filas de datos
        datos.forEach(dato => {
            const fila = document.createElement('tr');
            for (const columna of columnasAMostrar) {
                const celda = document.createElement('td');
                if (columna === 'created_at') {
                    const fechaCompleta = dato[columna];
                    const soloFecha = fechaCompleta.split('T')[0];
                    celda.textContent = soloFecha;
                } else {
                    celda.textContent = dato[columna];
                }
                fila.appendChild(celda);
            }
            tablaDatos.appendChild(fila);
        });
    },

}

document.addEventListener('DOMContentLoaded', function () {
    Controlador.ventasRealizadasAgente();
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