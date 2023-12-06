'use-strict'

// Comprobación de la carga de JQuery
$(document).ready(function() {
        console.log("JQuery cargado");
    }
);

// ------------------- VARIABLES GLOBALES -------------------------
// 

// ------------------- CLASES -------------------------------------
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
        
        // Guarda la informacion en el local storage del nav
        localStorage.setItem('usuario'+i, JSON.stringify(user));
    }      
}

// Funcion que comprueba el usuario y contraseña introducidos
function comprobarLog() {
    let nombre_usu = document.getElementById("usuario").value;
    let pass_usu = document.getElementById("contra").value;
    let acceso_permitido = false; 

    for(let i = 0; i < localStorage.length; i++) {
        let cla = localStorage.key(i);
        let val = localStorage.getItem(cla);
        
        // Se debe convertir de formato JSON a objeto JS
        let datos = JSON.parse(val);
        
        let usu = datos.usu; 
        let pas = datos.pwd;

        if(usu == nombre_usu && pas == pass_usu) {
            acceso_permitido = true;
            // no sigue el bucle si usu/pwd correctos
            break;
        }
    }
    if (acceso_permitido && comprobarExp(pass_usu)) {
        return true;
    } else {
        //alert("que");
        comprobarCaracter(pass_usu);
        return false;
    }
}

// 
function comprobarExp(contrasenia) {
    let regexp = /^[a-zA-Z0-9]+$/;
    if(regexp.test(contrasenia)) {
        return true;
    } else {
        return false;
    }
}

// 
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
        // Si hay caracteres: dice cuales son
        alert("Caracteres no permitido(s): " + caract);
    } else {
        // Si no: usu/pwd no encontrados 
        document.getElementById("hide").style.display = "block";
    }
}


// ------------------- MAIN ---------------------------------------
// Se carga el array de usuarios
cargarUsuariosJSON();


