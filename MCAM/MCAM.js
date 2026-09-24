// ==========================================
// SUPABASE
// ==========================================

const SUPABASE_URL =
    "https://mbvgjjfzcegqeoikuzzl.supabase.co";

const SUPABASE_KEY =
    "sb_publishable__x2FSVFaYNEq2jNPsrilBg_6tLlx6aT";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// ==========================================
// USUARIO ACTUAL
// ==========================================

let usuarioActual =
    localStorage.getItem("usuarioActual") || null;


const ADMIN_USUARIO = "MaxiKings24";
const ADMIN_CONTRASENA = "2410";

let cantidadCamisetas = 1;


// ==========================================
// OBTENER USUARIOS
// ==========================================

function obtenerUsuarios() {

    let usuarios =
        JSON.parse(
            localStorage.getItem("usuarios")
        );

    if (Array.isArray(usuarios)) {
        return usuarios;
    }


    usuarios = [];


    let usuarioAntiguo =
        localStorage.getItem("usuario");

    let contraseñaAntigua =
        localStorage.getItem("contraseña");


    if (
        usuarioAntiguo &&
        contraseñaAntigua &&
        usuarioAntiguo.toLowerCase() !==
        ADMIN_USUARIO.toLowerCase()
    ) {

        usuarios.push({

            usuario: usuarioAntiguo,

            contraseña: contraseñaAntigua

        });


        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );
    }


    return usuarios;
}


// ==========================================
// FECHA DE HOY
// ==========================================

function obtenerFechaHoy() {

    let fecha = new Date();


    let año =
        fecha.getFullYear();


    let mes =
        String(
            fecha.getMonth() + 1
        ).padStart(2, "0");


    let dia =
        String(
            fecha.getDate()
        ).padStart(2, "0");


    return (
        año +
        "-" +
        mes +
        "-" +
        dia
    );
}


// ==========================================
// OBTENER PEDIDOS DE SUPABASE
// ==========================================

async function obtenerPedidos() {

    const { data, error } =
        await supabaseClient
            .from("pedidos")
            .select("*")
            .order("id", {
                ascending: true
            });


    if (error) {

        console.error(
            "Error obteniendo pedidos:",
            error
        );

        return [];
    }


    return data || [];
}


// ==========================================
// REGISTRO
// ==========================================

function mostrarRegistro() {

    document
        .getElementById("registro")
        .classList
        .remove("oculto");


    document
        .getElementById("login")
        .classList
        .add("oculto");
}


// ==========================================
// LOGIN
// ==========================================

function mostrarLogin() {

    document
        .getElementById("registro")
        .classList
        .add("oculto");


    document
        .getElementById("login")
        .classList
        .remove("oculto");
}


// ==========================================
// REGISTRARSE
// ==========================================

function registrarse() {

    let usuario =
        document
            .getElementById("nuevoUsuario")
            .value
            .trim();


    let contraseña =
        document
            .getElementById("nuevaContraseña")
            .value;


    let mensaje =
        document.getElementById(
            "mensajeRegistro"
        );


    if (
        usuario === "" ||
        contraseña === ""
    ) {

        mensaje.textContent =
            "Completa todos los campos.";

        return;
    }


    if (
        usuario.toLowerCase() ===
        ADMIN_USUARIO.toLowerCase()
    ) {

        mensaje.textContent =
            "Ese nombre de usuario está reservado.";

        return;
    }


    let usuarios =
        obtenerUsuarios();


    let existe =
        usuarios.some(function(persona) {

            return (
                persona.usuario.toLowerCase() ===
                usuario.toLowerCase()
            );

        });


    if (existe) {

        mensaje.textContent =
            "Ese nombre de usuario ya está ocupado.";

        return;
    }


    usuarios.push({

        usuario: usuario,

        contraseña: contraseña

    });


    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );


    mensaje.textContent =
        "Cuenta creada correctamente.";


    document.getElementById(
        "nuevoUsuario"
    ).value = "";


    document.getElementById(
        "nuevaContraseña"
    ).value = "";


    setTimeout(function() {

        mostrarLogin();

    }, 800);
}


// ==========================================
// INICIAR SESIÓN
// ==========================================

function iniciarSesion() {

    let usuario =
        document
            .getElementById("usuarioLogin")
            .value
            .trim();


    let contraseña =
        document
            .getElementById("contraseñaLogin")
            .value;


    let mensaje =
        document.getElementById(
            "mensajeLogin"
        );


    // ADMIN

    if (
        usuario.toLowerCase() ===
        ADMIN_USUARIO.toLowerCase() &&
        contraseña === ADMIN_CONTRASENA
    ) {

        usuarioActual =
            ADMIN_USUARIO;


        localStorage.setItem(
            "usuarioActual",
            usuarioActual
        );


        entrarAlPanel();

        return;
    }


    // USUARIO NORMAL

    let usuarios =
        obtenerUsuarios();


    let encontrado =
        usuarios.find(function(persona) {

            return (
                persona.usuario.toLowerCase() ===
                usuario.toLowerCase() &&
                persona.contraseña ===
                contraseña
            );

        });


    if (!encontrado) {

        mensaje.textContent =
            "Usuario o contraseña incorrectos.";

        return;
    }


    usuarioActual =
        encontrado.usuario;


    localStorage.setItem(
        "usuarioActual",
        usuarioActual
    );


    entrarAlPanel();
}


// ==========================================
// ENTRAR AL PANEL
// ==========================================

async function entrarAlPanel() {

    document
        .getElementById("registro")
        .classList
        .add("oculto");


    document
        .getElementById("login")
        .classList
        .add("oculto");


    document
        .getElementById("panel")
        .classList
        .remove("oculto");


    document
        .getElementById("bienvenida")
        .textContent =
        "Bienvenido, " +
        usuarioActual;


    if (
        usuarioActual.toLowerCase() ===
        ADMIN_USUARIO.toLowerCase()
    ) {

        document
            .getElementById("zonaAdmin")
            .classList
            .remove("oculto");


        document
            .getElementById("zonaPedido")
            .classList
            .add("oculto");


        await cargarPanelAdmin();

    } else {

        document
            .getElementById("zonaAdmin")
            .classList
            .add("oculto");


        document
            .getElementById("zonaPedido")
            .classList
            .remove("oculto");


        await verPedidos();
    }
}


// ==========================================
// AGREGAR CAMISETA 2
// ==========================================

function agregarCamiseta2() {

    document
        .getElementById("camiseta2")
        .classList
        .remove("oculto");


    document
        .getElementById("botonAgregar2")
        .classList
        .add("oculto");


    document
        .getElementById("botonAgregar3")
        .classList
        .remove("oculto");


    cantidadCamisetas = 2;
}


// ==========================================
// AGREGAR CAMISETA 3
// ==========================================

function agregarCamiseta3() {

    document
        .getElementById("camiseta3")
        .classList
        .remove("oculto");


    document
        .getElementById("botonAgregar3")
        .classList
        .add("oculto");


    cantidadCamisetas = 3;
}


// ==========================================
// HACER PEDIDO
// ==========================================

async function hacerPedido() {

    let mensaje =
        document.getElementById("mensaje");


    mensaje.textContent =
        "Comprobando pedido...";


    // ======================================
    // COMPROBAR LÍMITE DE 3 PEDIDOS HOY
    // ======================================

    const { data: pedidosHoyData, error: errorHoy } =
        await supabaseClient
            .from("pedidos")
            .select("id")
            .eq("usuario", usuarioActual)
            .eq("fecha", obtenerFechaHoy());


    if (errorHoy) {

        console.error(errorHoy);

        mensaje.textContent =
            "No se pudo comprobar tus pedidos.";

        return;
    }


    if (
        pedidosHoyData &&
        pedidosHoyData.length >= 3
    ) {

        mensaje.textContent =
            "Ya hiciste 3 pedidos hoy. Podrás hacer más mañana.";

        return;
    }


    let camisetas = [];


    // ======================================
    // CAMISETA 1
    // ======================================

    let equipo1 =
        document
            .getElementById("equipo1")
            .value
            .trim();


    let jugador1 =
        document
            .getElementById("jugador1")
            .value
            .trim();


    let numero1 =
        document
            .getElementById("numero1")
            .value
            .trim();


    if (
        equipo1 === "" ||
        jugador1 === "" ||
        numero1 === ""
    ) {

        mensaje.textContent =
            "Completa los datos de la camiseta 1.";

        return;
    }


    camisetas.push({

        equipo: equipo1,

        jugador: jugador1,

        numero: numero1

    });


    // ======================================
    // CAMISETA 2
    // ======================================

    if (cantidadCamisetas >= 2) {

        let equipo2 =
            document
                .getElementById("equipo2")
                .value
                .trim();


        let jugador2 =
            document
                .getElementById("jugador2")
                .value
                .trim();


        let numero2 =
            document
                .getElementById("numero2")
                .value
                .trim();


        if (
            equipo2 === "" ||
            jugador2 === "" ||
            numero2 === ""
        ) {

            mensaje.textContent =
                "Completa los datos de la camiseta 2.";

            return;
        }


        camisetas.push({

            equipo: equipo2,

            jugador: jugador2,

            numero: numero2

        });
    }


    // ======================================
    // CAMISETA 3
    // ======================================

    if (cantidadCamisetas >= 3) {

        let equipo3 =
            document
                .getElementById("equipo3")
                .value
                .trim();


        let jugador3 =
            document
                .getElementById("jugador3")
                .value
                .trim();


        let numero3 =
            document
                .getElementById("numero3")
                .value
                .trim();


        if (
            equipo3 === "" ||
            jugador3 === "" ||
            numero3 === ""
        ) {

            mensaje.textContent =
                "Completa los datos de la camiseta 3.";

            return;
        }


        camisetas.push({

            equipo: equipo3,

            jugador: jugador3,

            numero: numero3

        });
    }


    // ======================================
    // GUARDAR EN SUPABASE
    // ======================================

    const nuevoPedido = {

        usuario: usuarioActual,

        fecha: obtenerFechaHoy(),

        estado: "Pendiente",

        camisetas: camisetas,

        "fechaListo": null

    };


    const { error } =
        await supabaseClient
            .from("pedidos")
            .insert([nuevoPedido]);


    if (error) {

        console.error(
            "Error guardando pedido:",
            error
        );


        mensaje.textContent =
            "No se pudo guardar el pedido.";

        return;
    }


    mensaje.textContent =
        "Pedido realizado correctamente.";


    limpiarFormulario();


    await verPedidos();
}


// ==========================================
// LIMPIAR FORMULARIO
// ==========================================

function limpiarFormulario() {

    document.getElementById(
        "equipo1"
    ).value = "";


    document.getElementById(
        "jugador1"
    ).value = "";


    document.getElementById(
        "numero1"
    ).value = "";


    document.getElementById(
        "equipo2"
    ).value = "";


    document.getElementById(
        "jugador2"
    ).value = "";


    document.getElementById(
        "numero2"
    ).value = "";


    document.getElementById(
        "equipo3"
    ).value = "";


    document.getElementById(
        "jugador3"
    ).value = "";


    document.getElementById(
        "numero3"
    ).value = "";


    document
        .getElementById("camiseta2")
        .classList
        .add("oculto");


    document
        .getElementById("camiseta3")
        .classList
        .add("oculto");


    document
        .getElementById("botonAgregar2")
        .classList
        .remove("oculto");


    document
        .getElementById("botonAgregar3")
        .classList
        .add("oculto");


    cantidadCamisetas = 1;
}


// ==========================================
// VER MIS PEDIDOS
// ==========================================

async function verPedidos() {

    let pedidos =
        await obtenerPedidos();


    let misPedidos =
        pedidos.filter(function(pedido) {

            return (
                pedido.usuario ===
                usuarioActual
            );

        });


    let contenedor =
        document.getElementById(
            "pedidos"
        );


    contenedor.innerHTML = "";


    if (misPedidos.length === 0) {

        contenedor.innerHTML =
            "<p>No tienes pedidos todavía.</p>";


        actualizarContador(
            pedidos
        );


        return;
    }


    misPedidos
        .slice()
        .reverse()
        .forEach(function(pedido) {

            contenedor.innerHTML +=
                crearHTMLPedido(
                    pedido,
                    false
                );

        });


    actualizarContador(
        pedidos
    );
}


// ==========================================
// CREAR HTML DEL PEDIDO
// ==========================================

function crearHTMLPedido(
    pedido,
    esAdmin
) {

    let claseEstado = "";


    if (
        pedido.estado === "Pendiente"
    ) {

        claseEstado = "pendiente";
    }


    if (
        pedido.estado === "Aceptado"
    ) {

        claseEstado = "aceptado";
    }


    if (
        pedido.estado === "Listo"
    ) {

        claseEstado = "listo";
    }


    if (
        pedido.estado === "Denegado"
    ) {

        claseEstado = "denegado";
    }


    let camisetas =
        Array.isArray(pedido.camisetas)
            ? pedido.camisetas
            : [];


    let html = "";


    html +=
        '<div class="pedido ' +
        claseEstado +
        '">';


    html +=
        "<h3>Pedido #" +
        escaparHTML(pedido.id) +
        "</h3>";


    html +=
        "<p><b>Usuario:</b> " +
        escaparHTML(pedido.usuario) +
        "</p>";


    html +=
        "<p><b>Fecha:</b> " +
        escaparHTML(pedido.fecha || "") +
        "</p>";


    html +=
        "<p><b>Estado:</b> " +
        escaparHTML(pedido.estado || "") +
        "</p>";


    if (
        pedido.fechaListo
    ) {

        html +=
            "<p><b>Pedido listo el:</b> " +
            escaparHTML(
                pedido.fechaListo
            ) +
            "</p>";
    }


    camisetas.forEach(function(
        camiseta,
        indice
    ) {

        html += "<div>";


        html +=
            "<b>Camiseta " +
            (indice + 1) +
            "</b>";


        html +=
            "<p>Equipo: " +
            escaparHTML(
                camiseta.equipo
            ) +
            "</p>";


        html +=
            "<p>Jugador: " +
            escaparHTML(
                camiseta.jugador
            ) +
            "</p>";


        html +=
            "<p>Número: " +
            escaparHTML(
                camiseta.numero
            ) +
            "</p>";


        html += "</div>";
    });


    // ======================================
    // USUARIO
    // ======================================

    if (!esAdmin) {

        html +=
            '<button class="rojo" ' +
            'onclick="eliminarPedido(' +
            pedido.id +
            ')">' +
            "Eliminar pedido" +
            "</button>";
    }


    // ======================================
    // ADMIN - PENDIENTE
    // ======================================

    if (
        esAdmin &&
        pedido.estado === "Pendiente"
    ) {

        html +=
            '<button class="verde" ' +
            'onclick="aceptarPedido(' +
            pedido.id +
            ')">' +
            "Aceptar pedido" +
            "</button>";


        html +=
            '<button class="rojo" ' +
            'onclick="denegarPedido(' +
            pedido.id +
            ')">' +
            "Denegar pedido" +
            "</button>";
    }


    // ======================================
    // ADMIN - ACEPTADO
    // ======================================

    if (
        esAdmin &&
        pedido.estado === "Aceptado"
    ) {

        html +=
            '<button class="verde" ' +
            'onclick="marcarPedidoListo(' +
            pedido.id +
            ')">' +
            "✅ Pedido listo" +
            "</button>";
    }


    html += "</div>";


    return html;
}


// ==========================================
// ESCAPAR HTML
// ==========================================

function escaparHTML(texto) {

    if (
        texto === null ||
        texto === undefined
    ) {

        return "";
    }


    return String(texto)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );
}


// ==========================================
// CONTADOR
// ==========================================

function actualizarContador(
    pedidos
) {

    let fechaHoy =
        obtenerFechaHoy();


    let cantidad =
        pedidos.filter(function(pedido) {

            return (
                pedido.usuario ===
                usuarioActual &&

                pedido.fecha ===
                fechaHoy
            );

        }).length;


    document
        .getElementById(
            "contadorPedidos"
        )
        .textContent =
        "Pedidos realizados hoy: " +
        cantidad +
        " / 3";
}


// ==========================================
// ELIMINAR PEDIDO
// ==========================================

async function eliminarPedido(id) {

    const { error } =
        await supabaseClient
            .from("pedidos")
            .delete()
            .eq("id", id)
            .eq(
                "usuario",
                usuarioActual
            );


    if (error) {

        console.error(error);

        alert(
            "No se pudo eliminar el pedido."
        );

        return;
    }


    await verPedidos();
}


// ==========================================
// CARGAR PANEL ADMIN
// ==========================================

async function cargarPanelAdmin() {

    await mostrarPendientes();

    await mostrarAceptados();

    await mostrarListosDeHoy();

    await mostrarDenegados();
}


// ==========================================
// MOSTRAR PENDIENTES
// ==========================================

async function mostrarPendientes() {

    let pedidos =
        await obtenerPedidos();


    let pendientes =
        pedidos.filter(function(pedido) {

            return (
                pedido.estado ===
                "Pendiente"
            );

        });


    let contenedor =
        document.getElementById(
            "listaPendientes"
        );


    contenedor.innerHTML = "";


    if (
        pendientes.length === 0
    ) {

        contenedor.innerHTML =
            "<p>No hay pedidos pendientes.</p>";

        return;
    }


    pendientes
        .slice()
        .reverse()
        .forEach(function(pedido) {

            contenedor.innerHTML +=
                crearHTMLPedido(
                    pedido,
                    true
                );

        });
}


// ==========================================
// MOSTRAR ACEPTADOS
// ==========================================

async function mostrarAceptados() {

    let pedidos =
        await obtenerPedidos();


    let aceptados =
        pedidos.filter(function(pedido) {

            return (
                pedido.estado ===
                "Aceptado"
            );

        });


    let contenedor =
        document.getElementById(
            "listaAceptados"
        );


    contenedor.innerHTML = "";


    if (
        aceptados.length === 0
    ) {

        contenedor.innerHTML =
            "<p>No hay pedidos aceptados pendientes de preparación.</p>";

        return;
    }


    aceptados
        .slice()
        .reverse()
        .forEach(function(pedido) {

            contenedor.innerHTML +=
                crearHTMLPedido(
                    pedido,
                    true
                );

        });
}


// ==========================================
// MOSTRAR LISTOS DE HOY
// ==========================================

async function mostrarListosDeHoy() {

    let pedidos =
        await obtenerPedidos();


    let hoy =
        obtenerFechaHoy();


    let listos =
        pedidos.filter(function(pedido) {

            return (
                pedido.estado ===
                "Listo" &&

                pedido.fechaListo ===
                hoy
            );

        });


    let contenedor =
        document.getElementById(
            "listaListos"
        );


    contenedor.innerHTML = "";


    if (
        listos.length === 0
    ) {

        contenedor.innerHTML =
            "<p>No hay pedidos listos hoy.</p>";

        return;
    }


    listos
        .slice()
        .reverse()
        .forEach(function(pedido) {

            contenedor.innerHTML +=
                crearHTMLPedido(
                    pedido,
                    true
                );

        });
}


// ==========================================
// MOSTRAR DENEGADOS
// ==========================================

async function mostrarDenegados() {

    let pedidos =
        await obtenerPedidos();


    let denegados =
        pedidos.filter(function(pedido) {

            return (
                pedido.estado ===
                "Denegado"
            );

        });


    let contenedor =
        document.getElementById(
            "listaDenegados"
        );


    contenedor.innerHTML = "";


    if (
        denegados.length === 0
    ) {

        contenedor.innerHTML =
            "<p>No hay pedidos denegados.</p>";

        return;
    }


    denegados
        .slice()
        .reverse()
        .forEach(function(pedido) {

            contenedor.innerHTML +=
                crearHTMLPedido(
                    pedido,
                    true
                );

        });
}


// ==========================================
// ACEPTAR PEDIDO
// ==========================================

async function aceptarPedido(id) {

    const { error } =
        await supabaseClient
            .from("pedidos")
            .update({

                estado: "Aceptado",

                fechaListo: null

            })
            .eq("id", id);


    if (error) {

        console.error(error);

        alert(
            "No se pudo aceptar el pedido."
        );

        return;
    }


    await cargarPanelAdmin();
}


// ==========================================
// MARCAR PEDIDO COMO LISTO
// ==========================================

async function marcarPedidoListo(id) {

    const { error } =
        await supabaseClient
            .from("pedidos")
            .update({

                estado: "Listo",

                fechaListo:
                    obtenerFechaHoy()

            })
            .eq("id", id)
            .eq(
                "estado",
                "Aceptado"
            );


    if (error) {

        console.error(error);

        alert(
            "No se pudo marcar el pedido como listo."
        );

        return;
    }


    await cargarPanelAdmin();
}


// ==========================================
// DENEGAR PEDIDO
// ==========================================

async function denegarPedido(id) {

    const { error } =
        await supabaseClient
            .from("pedidos")
            .update({

                estado: "Denegado",

                fechaListo: null

            })
            .eq("id", id);


    if (error) {

        console.error(error);

        alert(
            "No se pudo denegar el pedido."
        );

        return;
    }


    await cargarPanelAdmin();
}


// ==========================================
// CERRAR SESIÓN
// ==========================================

function cerrarSesion() {

    usuarioActual = null;


    localStorage.removeItem(
        "usuarioActual"
    );


    document
        .getElementById("panel")
        .classList
        .add("oculto");


    mostrarLogin();
}


// ==========================================
// INICIAR PÁGINA
// ==========================================

window.onload = async function() {

    if (usuarioActual) {

        await entrarAlPanel();

    } else {

        mostrarRegistro();

    }
};