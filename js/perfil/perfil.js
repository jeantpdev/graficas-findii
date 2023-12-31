import config from '../supabase/keys.js';

//Modelo que recibe los datos y los envia a la base de datos
const Modelo = {
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

const Vista = {

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
                                <button><a href= "../home.html">Mis estadisticas</a></button>
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
                                <button><a href= "./team_leader/inicio_team_leader.html">Mi equipo</a></button>
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

    mostrarDatosUsuario(res) {

        const datos = res.data

        const apodo = datos['apodo']
        const campana = datos['campana']
        const cedula = datos['cedula']
        const celular = datos['celular']
        const correo = datos['correo']
        const estado = datos['estado']
        const grupo = datos['grupo']
        const lider_equipo = datos['lider_equipo']
        const lider_responsable = datos['lider_responsable']
        const nombre = datos['nombre']
        const rol = datos['rol']


        const informacionPerfil = document.getElementById('informacionPerfil')
        informacionPerfil.innerHTML =
            `
            <div class="campo">
                <div class="titulo">
                    <p>Cédula:</p>
                </div>
                <div class="texto nombre">
                    <p>${cedula}</p>
                </div>
            </div>

            <div class="campo">
                <div class="titulo">
                    <p>Apodo:</p>
                </div>
                <div class="texto direccion">
                    <p>${apodo}</p>
                </div>
            </div>

            <div class="campo">
                <div class="titulo">
                    <p>Nombre:</p>
                </div>
                <div class="texto nombre">
                    <p>${nombre}</p>
                </div>
            </div>

            <div class="campo">
                <div class="titulo">
                    <p>Correo:</p>
                </div>
                <div class="texto correo">
                    <p>${correo}</p>
                </div>
            </div>

            <div class="campo">
                <div class="titulo">
                    <p>Celular:</p>
                </div>
                <div class="texto celular">
                    <p>${celular}</p>
                </div>
            </div>

            <div class="campo">
                <div class="titulo">
                    <p>Campaña:</p>
                </div>
                <div class="texto nombre">
                    <p>${campana}</p>
                </div>
            </div>

            <div class="campo">
                <div class="titulo">
                    <p>Estado:</p>
                </div>
                <div class="texto sexo">
                    <p>${estado}</p>
                </div>
            </div>

            <div class="campo">
                <div class="titulo">
                    <p>Grupo:</p>
                </div>
                <div class="texto fecha">
                    <p>${grupo}</p>
                </div>
            </div>

            <div class="campo">
                <div class="titulo">
                    <p>Lider Equipo:</p>
                </div>
                <div class="texto direccion">
                    <p>${lider_equipo}</p>
                </div>
            </div>

            <div class="campo">
                <div class="titulo">
                    <p>Lider responsable:</p>
                </div>
                <div class="texto direccion">
                    <p>${lider_responsable}</p>
                </div>
            </div>

            <div class="campo">
                <div class="titulo">
                    <p>Rol:</p>
                </div>
                <div class="texto direccion">
                    <p>${rol}</p>
                </div>
            </div>


            `
    },

}

const Controlador = {
    async datosAgente() {
        const res = await Modelo.traerDatosPersonalesAgente(localStorage.getItem('cedula'))
        Vista.datosAgente(res)
        Vista.mostrarDatosUsuario(res)
    },
}

const abrirMenuOpciones = document.getElementById('abrirMenuOpciones');
const opcionesPerfil = document.getElementById('opcionesPerfil');

abrirMenuOpciones.onclick = function () {
    if (opcionesPerfil.style.display === "none" || opcionesPerfil.style.display === "") {
        opcionesPerfil.style.display = "block";
    } else {
        opcionesPerfil.style.display = "none";
    }
};


document.addEventListener('DOMContentLoaded', function () {
    Controlador.datosAgente();
    Vista.opcionesMenu();
})