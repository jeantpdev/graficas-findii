
//Modelo que recibe los datos y los envia a la base de datos
const Modelo = {

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
                        <button><a href= "./perfil.html">Mi perfil</a></button>
                    </div>
                </div>
    
            <div class="enlace">
              <div class="icono">
                <i class="fa-solid fa-chart-line"></i>
              </div>
    
                <div class="texto">
                <button><a href="../index.html">Ventas</a></button>
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
    Vista.opcionesMenu();
})