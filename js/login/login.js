import config from '../supabase/keys.js';


//Modelo que recibe los datos y los envia a la base de datos
const Modelo = {
    async iniciar_seion(correo, password) {

        const datos_insertar_bd = {
            correo: correo,
            password: password
        }

        //se almacena la respuesta en "res" para obtener el resultado de la petición y retornarla para mostrar en la vista
        const res = axios({
            method: "POST",
            url: "http://127.0.0.1:5000/login",
            headers: config.headers,
            data: datos_insertar_bd,
        });
        return res
    },

    async traer_datos_agente() {
        const datos_insertar_bd = {
            cedula: cedula,
        }

        //se almacena la respuesta en "res" para obtener el resultado de la petición y retornarla para mostrar en la vista
        const res = axios({
            method: "POST",
            url: "http://127.0.0.1:5000/login",
            headers: config.headers,
            data: datos_insertar_bd,
        });
        return res

    }
}

const Vista = {
    //Método de la vista que recibe los valores que hay en el DOM y los retorna
    getDatosInicioSesion() {
        const correo = document.getElementById('correo').value;
        const password = document.getElementById('contrasena').value;
        return { correo, password };
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

    vaciarCampos() {
        nombre.value = "";
        apellido.value = "";
        correo.value = "";
        titulo.value = "";
        descripcion.value = "";
    },

    redirigirAIndex() {
        location.href = ("../index.html");
    }
}

const Controlador = {

    async iniciarSesion() {
        const { correo, password } = Vista.getDatosInicioSesion();
        try {
            const res = await Modelo.iniciar_seion(correo, password);
            console.log(res)
            if (res.data.acceso == "AUTORIZADO") {
                const access_token = res.data.access_token;
                const cedula = res.data.cedula;

                localStorage.setItem("access_token", access_token);
                localStorage.setItem("cedula", cedula);


                Vista.mostrarAlertaSatisfactorio("Inicio de sesión exitoso");
                Vista.redirigirAIndex();
            } else {
                Vista.mostrarMensajeError("Usuario no encontrado")
                //Vista.limpiarCampos();
            }

        } catch (err) {
            Vista.mostrarMensajeError('Error al iniciar sesión');
            console.log(err);
        }
    },

    async cargar_datos_agente() {
        const datos_insertar_bd = {
            cedula: cedula,
        }

        //se almacena la respuesta en "res" para obtener el resultado de la petición y retornarla para mostrar en la vista
        const res = axios({
            method: "POST",
            url: "http://127.0.0.1:5000/login",
            headers: config.headers,
            data: datos_insertar_bd,
        });
        return res

    }


}

const botonEnviar = document.getElementById('btnIngresar');
const botonEnter = document
botonEnter.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        Controlador.iniciarSesion();
    }
});

botonEnviar.onclick = function () {
    Controlador.iniciarSesion()
}