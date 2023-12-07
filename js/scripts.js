// Edurne Presa Angulo - DWEC03 TE2 

'use-strict'

// ------------------- JQUERY -------------------------------------
// Comprobación de la carga de JQuery
$(document).ready(function() {
        console.log("JQuery cargado");
    }
);

// ------------------- CLASES -------------------------------------
// Clase Usuario
class Usuario {
    constructor(nombre, apellido, usu, pwd) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.usu = usu;
      this.pwd = pwd;
    }
  }

// ------------------- FUNCIONES ----------------------------------
// Función que lee el JSON 
function cargarUsuariosJSON () {
    let path = 'model/usuarios.json'

    let request = new Request(path, {
    headers: new Headers({
        'Content-Type': 'text/json'
    }),
    method: 'GET'
    })

    fetch(request).then(response => {
    response.json().then(data => {
        console.log('Datos', data);  
        // Llama a la función que carga usuarios en LocalStorage
        cargarLocalStorage(data);
    })
    })
}
// Funcion que añade los usuarios permitidos al Local Storage cuando arranca la página web
function cargarLocalStorage(data) {
    for(let i = 0; i < data.length; i++) {
        let fnombre = data[i].nombre;
        let fapellido = data[i].apellido;
        let usuario = data[i].usuario;
        let password = data[i].contraseña;
        let user = new Usuario(fnombre, fapellido, usuario, password);
        
        // Guarda la informacion en el local storage del navegador
        localStorage.setItem('usuario'+i, JSON.stringify(user));
    }      
}

// Funcion que comprueba el usuario y contraseña introducidos
//  Es llamada al pulsar el botón del formulario para entrar al juego
function comprobarLog() {
    let nombre_usu = document.getElementById("usuario").value;
    let pass_usu = document.getElementById("contra").value;
    let acceso_permitido = false; 

    // Busca el usuario y contraseña introducidos entre los del localStorage
    for(let i = 0; i < localStorage.length; i++) {
        let cla = localStorage.key(i);
        let val = localStorage.getItem(cla);
        
        // Se debe convertir de formato JSON a objeto JS
        let datos = JSON.parse(val);
        
        let usu = datos.usu; 
        let pas = datos.pwd;

        if(usu == nombre_usu && pas == pass_usu) {
            acceso_permitido = true;
            // No sigue el bucle si usu/pwd correctos
            break;
        }
    }

    // Devuelve true o false para conceder o no el acceso
    if (acceso_permitido && comprobarExp(pass_usu)) {
        return true;
    } else {
        comprobarCaracter(pass_usu);
        return false;
    }
}

// Función que usa RegExp para comprobar el formato de la contraseña
//  Devuelve true si lo cumple y false si no
function comprobarExp(contrasenia) {
    let regexp = /^[a-zA-Z0-9]+$/;
    if(regexp.test(contrasenia)) {
        return true;
    } else {
        return false;
    }
}

// Función que busca caracteres no permitidos en la contraseña
function comprobarCaracter(contrasenia) {
    let caract = "";
    let no_permi = false; 

    for(let i = 0; i < contrasenia.length; i++) {
        let carac = contrasenia.charAt(i);
        // Si no es número o letra lo muestra en mensaje
        if(!/[a-zA-Z0-9]/.test(carac)) {
            no_permi = true;
            caract += carac + " ";
        }
    }
    
    if(no_permi) {
        // Si hay alguno: muestra cuales son
        alert("Caracteres no permitido(s): " + caract);
    } else {
        // Si no: muestra mensaje usu/pwd no encontrados 
        document.getElementById("hide").style.display = "block";
    }
}


// ------------------- MAIN ---------------------------------------
// Se carga el array de usuarios
cargarUsuariosJSON();