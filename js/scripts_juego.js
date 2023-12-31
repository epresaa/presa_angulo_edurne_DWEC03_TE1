// Edurne Presa Angulo - DWEC03 TE2 

'use-strict'

// ------------------- JQUERY - EVENTOS ---------------------------
// Comprobación de la carga de JQuery
$(document).ready(function() {
    console.log("JQuery cargado");

    // -------------------------- VARIABLES --------------------------
    var fallos = 0;
    var aciertos = 0;
    var intentos = 0; 
    var palabraSeleccionada = elegida;
    var color_transparente = "rgba(0, 0, 0, 0)";

    // -------------------------- FUNCIONES --------------------------
    // Función que realiza todo el manejo de eventos
    //  Con la letra pulsada/presionada va contando aciertos/fallos e intentos 
    function pulsarLetras(letraSeleccionada, elemento) {
        
        // Primero: se comprueba si la letra ya ha sido pulsada anteriormente
        if (comprobarLetrasAnteriores(letraSeleccionada)) {
            return;
        }

        // Se vuelve transparente la letra elegida
        $(elemento).css("color", color_transparente);

         // Si la letra está en la palabra
        if (palabraSeleccionada.includes(letraSeleccionada)) {
            for(let i = 0; i < elegida.length; i++) {
                if(palabraSeleccionada[i] == letraSeleccionada) {
                    var indice = i + 1;
                    
                    // Pone la letra en su lugar en la palabra oculta
                    $("#l" + indice).text(letraSeleccionada);
                    
                    // Recorre los elementos <p> ocultos
                    $(".pal p").each(function(index, elemento) {
                        // Si el elemento oculto coincide con la letra: lo muesta (quita la clase oculta)
                        if($(elemento).text() == letraSeleccionada) {
                            $(elemento).removeClass("oculta");
                        }
                    });

                    // Contabiliza aciertos/intentos
                    aciertos = aciertos + 1;
                    intentos = intentos + 1; 
                    
                    // Si el usuario ha acertado
                    if(aciertos == 7) {
                        alert("¡HAS GANADO! :D")
                        if (fallos == 0) {
                            $("#dibujo").attr("src", "../images/gana-1.png");
                        } else {
                            $("#dibujo").attr("src", "../images/gana-" + (fallos) + ".png");
                        }
                    }
                }
            } 
        
        //Si la letra no está en la palabra
        } else {
            // Contabiliza fallos e intentos
            fallos = fallos + 1;
            intentos = intentos + 1;

            // Va pintando el dibujo
            if(fallos >= 1 && fallos <= 6) {
                $("#dibujo").attr("src", "../images/juego-" + fallos + ".png");

                // Avisa cuando queda 1 intento
                if(fallos == 6) {
                    alert("¡CUIDADO! Solo queda un intento");
                }
            
            // Cuando el usuario pierde 
            } else if (fallos == 7) {
                $("#dibujo").attr("src", "../images/muerto.png");
                
                // Se pinta la palabra no adivinada
                $(".pal p").each(function(index, elemento) {
                    for(let i = 1; i <= 7; i++) {
                        $("#l" + i).text(palabraSeleccionada[i - 1]);
                        $(elemento).removeClass("oculta");
                    }
                });
                alert("¡HAS PERDIDO! :(");
            }
        }
    }
      
    // Función usada para comprobar si una letra ya se ha seleccionado antes
    function comprobarLetrasAnteriores(letraSeleccionada) {
        var encontrada = false;
        $(".letra").each(function(index, elemento) {
            if($(elemento).text() == letraSeleccionada && $(elemento).css("color") == color_transparente) {
                encontrada = true;
                return;
            }
        });
        return encontrada; 
    }

    // -------------------------- EVENTOS ----------------------------
    // Evento de RATÓN
    $(".letra").click(function() {
        var letraSeleccionada = $(this).text();
        pulsarLetras(letraSeleccionada, this);
    });

    // Evento de TECLADO
    $(document).keydown(function(event) {
        var letraPress = event.key;
        
        // Se comprueba que sea A-Z o a-z o Ñ/ñ
        if((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || (event.key == 'ñ') || (event.key == 'Ñ')) {
            letraPress = letraPress.toUpperCase();
            pulsarLetras(letraPress, $('.letra:contains(' + letraPress + ')').first());
        }
    });
    
    // Eventos de BOTONES
    //  Boton REINICIAR
    $("#btn1").click(function() {
        location.reload();
    });

    //  Boton LOG OUT
    $("#btn2").click(function() {
        window.location.href = "../index.html";
    });

});


// -------------------------- VARIABLES GLOBALES ----------------------------
const stringPalabras = "AGRURAS,AGRUPAR,AGRESOR,AGRESTE,ACUERDO,ABRUMAR,ABDUCIR,AFIRMAR,ADUSTEZ,ACCESOS,BIBLICO,BALSAMO,BRUMOSO,BRUJULA,BINARIO,BROCOLI,BRASERO,BLANCOR,BULEVAR,BEBEDOR,CRONICA,CREDULO,CREDITO,CUSPIDE,CERROJO,CALZADO,CALCULO,CESAREA,CORTADO,COLOFON,CENITAL,CLINICO,CLASICO,DIVISOR,DESNUDO,DESMAYO,DIOXIDO,DISPARO,DISFRAZ,DRENAJE,DRACULA,DOBLAJE,DAMASCO,DUREZAS,DURANTE,ESCANER,ESCOCES,ERRATAS,ENTRENA,ESCANER,EJEMPLO,ECLIPSE,ELECTRA,ESCAPAR,EROSIVO,FOSFORO,FORMULA,FUNERAL,FURIOSO,FESTIVO,FEALDAD,FARMACO,FAVORES,FRIGIDO,FRACASO,FRANCIA,FRUTERO,FLUIDEZ,FLEXION,FLAGELO,GANSTER,GRABADO,GRIMOSO,GLACIAL,GELIDEZ,GEMELOS,GAITERO,GEOLOGO,GERMINA,GENERAL,GUSANOS,HUNGARO,HORRIDO,HIBRIDO,HUESPED,HABITAT,HABITOS,HUESUDO,HONESTO,HOMBRIA,HERMOSO,HOLANDA,ISOGONO,ISOTOPO,IONIZAR,INVERSO,INTRIGA,IMPACTO,IMANTAR,IGUALAR,IDEALES,IBERICO,JOVENES,JERARCA,JALONEO,KETCHUP,KIOSCOS,KENIANO,KILOBIT,LOBREGO,LIQUIDO,LIMITES,LEVITAR,LADRIDO,LABORAL,LOGISTA,MIMICAS,MANDALA,MINERAL,MATERIA,MEDIANO,MASILLA,MASACRE,MALSANO,NORDICO,NITRICO,NAUTICO,NOTORIO,NIRVANA,NEOFITO,NITIDEZ,NINGUNO,NEPTUNO,NEGOCIO,NEFASTO,NAVIDAD,NORUEGA,OVIPARO,OVEJUNO,ORILLAR,ONDULAR,PORTICO,POLVORA,PELVICO,PROFUGO,PROJIMO,QUERIDO,QUEJIDO,RAPIDOS,RENACER,RECORTE,SUPLICA,SUDESTE,SUJETOS,TORTOLO,TITERES,TRACTOR,TITULAR,UTOPICO,VORTICE,VOLUBLE,VOLTIOS,VENECIA,XILOFON,YUNTERO,YESERIA,ZUMBADO,ZUMBIDO,ZOZOBRA,ZOCALOS";
const arrayPalabras = stringPalabras.split(",");
let elegida = "";


// -------------------------- FUNCIONES -------------------------------------
// Funcion que elige una palabra al hazar del arrayPalabras
function elegirPalabra() {
    // Obtiene un índice aleatorio del array de palabras
    let n = Math.floor(Math.random() * 170);
    elegida = arrayPalabras[n];
    
    // Muestra la palabra elegida por consola para hacer trampas/debug
    //console.log(elegida);                                 
}

// ------------------- MAIN ---------------------------------------
// Llamada al método que elige una palabra al azar
elegirPalabra();