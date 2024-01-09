import config from '../supabase/keys.js';

const Modelo = {

    async insertarVenta(fecha, hora, compañia, fechaVenta, nombre, dni, telefono, correo, direccion, fechaNacimiento, cupsLuz, cupsGas, iban, nombreAgente, cedula, datos, observaciones, numeroContrato) {
        const datos_insertar_bd = {
            Fecha: fecha || 'no dado',
            Hora: hora,
            Compañia: compañia,
            Fecha_de_ingreso_de_venta: fechaVenta || 'no dado',
            Nombre: nombre || 'no dado',
            DNI: dni,
            Telefono: telefono || 'no dado',
            Correo: correo || 'no dado',
            Direccion: direccion || 'no dado',
            Fecha_de_nacimiento: fechaNacimiento || 'no dado',
            CUPS_Luz: cupsLuz || 'no tiene',
            CUPS_Gas: cupsGas || 'no tiene',
            IBAN: iban,
            Nombre_del_agente: nombreAgente,
            cedula: cedula,
            Base_de_datos: datos,
            Observaciones_venta: observaciones || 'no dado',
            Numero_del_contrato: numeroContrato
        }

        console.log(datos_insertar_bd)
        /*
                const res = await axios({
                    method: 'POST',
                    url: "https://fzsgnsghygycitueebre.supabase.co/rest/v1/VENTAS_REALIZADAS",
                    headers: config.headers,
                    data: datos_insertar_bd
                });
                return res
        */
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

    async insertarDatos() {

        const { compañia, fechaVenta, nombre, dni, telefono, correo, direccion, fechaNacimiento, cupsLuz, cupsGas, iban, datos, observaciones, numeroContrato } = Vista.registrarDatos()

        try {
            const cedula = localStorage.getItem('cedula')
            const datos_agente = await Modelo.traerDatosPersonalesAgente(cedula)
            const nombreAgente = datos_agente.data.apodo;

            await Modelo.insertarVenta(compañia, fechaVenta, nombre, dni, telefono, correo, direccion, fechaNacimiento, cupsLuz, cupsGas, iban, nombreAgente, cedula, datos, observaciones, numeroContrato)
            let mensaje = "Los datos fueron insertados correctamente"
            Vista.mostrarAlertaSatisfactorio(mensaje)

        } catch (error) {
            console.log(error)
            let mensaje = "Error al insertar los datos"
            Vista.mostrarMensajeError(mensaje)
        }
    },

    async datosAgente() {
        const res = await Modelo.traerDatosPersonalesAgente(localStorage.getItem('cedula'))
        Vista.datosAgente(res)
    },

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

            const botonCerrarSesion = document.getElementById('cerrarSesion')
            botonCerrarSesion.onclick = function () {
                localStorage.clear()
                location.href = ("./login.html");
            }

        } else {
            location.href = ("./login.html");
        }
    },

    mostrarMensajeError(mensaje) {
        Swal.fire({
            icon: 'error',
            title: 'Algo salió mal',
            text: mensaje,
        })
    },

    mostrarAlertaSatisfactorio(mensaje) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })
    },

    formatearFechaParaEnvio(fecha) {
        // Formatea la fecha en el formato deseado (dd/mm/yyyy)
        if (fecha.length == 0) {
            return fecha

        } else {
            var partes = fecha.split('-');
            var fechaFormateada = partes[2] + '/' + partes[1] + '/' + partes[0];

            return fechaFormateada
        }
    },

    enviarDatosFormulario() {

        const fechaFormatear = document.getElementById('fecha').value;
        const fechaNacimientoFormatear = document.getElementById('fechaNacimiento').value;
        const fechaVentaFormatear = document.getElementById('fechaVenta').value;

        const fecha = this.formatearFechaParaEnvio(fechaFormatear);
        const fechaVenta = this.formatearFechaParaEnvio(fechaVentaFormatear);
        const fechaNacimiento = this.formatearFechaParaEnvio(fechaNacimientoFormatear);

        const hora = document.getElementById('hora').value;
        const compañia = document.getElementById('compañia').value;
        const nombre = document.getElementById('nombre').value;
        const dni = document.getElementById('dni').value;
        const telefono = document.getElementById('telefono').value;
        const correo = document.getElementById('correo').value;
        const direccion = document.getElementById('direccion').value;
        const cupsLuz = document.getElementById('cupsLuz').value;
        const cupsGas = document.getElementById('cupsGas').value;
        const iban = document.getElementById('iban').value;
        const datos = document.getElementById('datos').value;
        const observaciones = document.getElementById('observaciones').value;
        const numeroContrato = document.getElementById('numeroContrato').value;



        if (dni === '' || iban === '' || numeroContrato === '') {
            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos',
                html: '<p>Por favor, verifica que esten llenos los siguientes campos: <br> <b>DNI, IBAN y NUMERO DE CONTRATO</b></p>',
            });
        } else {
            return { fecha, hora, compañia, fechaVenta, nombre, dni, telefono, correo, direccion, fechaNacimiento, cupsLuz, cupsGas, iban, datos, observaciones, numeroContrato }
        }

    },

    registrarDatos() {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: '¿Estás seguro?',
            text: 'Deseas ingresar los datos a la BD',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Controlador.enviarDatosFormulario();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'No se ha ingresado nada',
                    'error'
                );
            }
        });
    }


}

document.addEventListener('DOMContentLoaded', function () {
    Controlador.datosAgente();
    Vista.opcionesMenu();
});

const buttoRegistrar = document.getElementById('enviar');
buttoRegistrar.addEventListener('click', () => {
    Controlador.insertarDatos();
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