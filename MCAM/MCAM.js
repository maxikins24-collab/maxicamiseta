let usuarioActual = localStorage.getItem("usuarioActual") || null;

const ADMIN_USUARIO = "MaxiKings24";
const ADMIN_CONTRASENA = "2410";

let cantidadCamisetas = 1;


// ==========================================
// OBTENER USUARIOS
// ==========================================

function obtenerUsuarios() {

    let usuarios = JSON.parse(localStorage.getItem("usuarios"));

    if (Array.isArray(usuarios)) {
        return usuarios;
    }

    usuarios = [];

    // Compatibilidad con la versión antigua
    let usuarioAntiguo = localStorage.getItem("usuario");
    let contraseñaAntigua = localStorage.getItem("contraseña");

    if (
        usuarioAntiguo &&
        contraseñaAntigua &&
        usuarioAntiguo.toLowerCase() !== ADMIN_USUARIO.toLowerCase()
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
// OBTENER PEDIDOS
// ==========================================

function obtenerPedidos() {

    let pedidos = JSON.parse(localStorage.getItem("pedidos"));

    if (!Array.isArray(pedidos)) {
        pedidos = [];
    }

    return pedidos;
}


// ==========================================
// GUARDAR PEDIDOS
// ==========================================

function guardarPedidos(pedidos) {

    localStorage.setItem(
        "pedidos",
        JSON.stringify(pedidos)
    );
}


// ==========================================
// MOSTRAR REGISTRO
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
// MOSTRAR LOGIN
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
        document.getElementById("mensajeRegistro");


    if (
        usuario === "" ||
        contraseña === ""
    ) {

        mensaje.textContent =
            "Completa todos los campos.";

        return;
    }


    // El nombre del admin está reservado

    if (
        usuario.toLowerCase() ===
        ADMIN_USUARIO.toLowerCase()
    ) {

        mensaje.textContent =
            "Ese nombre de usuario está reservado.";

        return;
    }


    let usuarios = obtenerUsuarios();


    // No permitir usuarios repetidos

    let existe = usuarios.some(function(persona) {

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
        document.getElementById("mensajeLogin");


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

    let usuarios = obtenerUsuarios();


    let encontrado = usuarios.find(function(persona) {

        return (
            persona.usuario.toLowerCase() ===
            usuario.toLowerCase() &&
            persona.contraseña === contraseña
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

function entrarAlPanel() {

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
        "Bienvenido, " + usuarioActual;


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


        cargarPanelAdmin();

    } else {

        document
            .getElementById("zonaAdmin")
            .classList
            .add("oculto");

        document
            .getElementById("zonaPedido")
            .classList
            .remove("oculto");


        verPedidos();
    }
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

function hacerPedido() {

    let fechaHoy =
        obtenerFechaHoy();

    let pedidos =
        obtenerPedidos();


    let pedidosHoy =
        pedidos.filter(function(pedido) {

            return (
                pedido.usuario === usuarioActual &&
                pedido.fecha === fechaHoy
            );

        });


    if (pedidosHoy.length >= 3) {

        document
            .getElementById("mensaje")
            .textContent =
            "Ya hiciste 3 pedidos hoy. " +
            "Podrás hacer más mañana.";

        return;
    }


    let camisetas = [];


    // CAMISETA 1

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

        document
            .getElementById("mensaje")
            .textContent =
            "Completa los datos de la camiseta 1.";

        return;
    }


    camisetas.push({

        equipo: equipo1,

        jugador: jugador1,

        numero: numero1

    });


    // CAMISETA 2

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

            document
                .getElementById("mensaje")
                .textContent =
                "Completa los datos de la camiseta 2.";

            return;
        }


        camisetas.push({

            equipo: equipo2,

            jugador: jugador2,

            numero: numero2

        });
    }


    // CAMISETA 3

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

            document
                .getElementById("mensaje")
                .textContent =
                "Completa los datos de la camiseta 3.";

            return;
        }


        camisetas.push({

            equipo: equipo3,

            jugador: jugador3,

            numero: numero3

        });
    }


    // CREAR PEDIDO

    let nuevoPedido = {

        id: Date.now(),

        usuario: usuarioActual,

        fecha: fechaHoy,

        estado: "Pendiente",

        camisetas: camisetas,

        fechaListo: null

    };


    pedidos.push(nuevoPedido);

    guardarPedidos(pedidos);


    document
        .getElementById("mensaje")
        .textContent =
        "Pedido realizado correctamente.";


    limpiarFormulario();

    verPedidos();
}


// ==========================================
// LIMPIAR FORMULARIO
// ==========================================

function limpiarFormulario() {

    document.getElementById("equipo1").value = "";
    document.getElementById("jugador1").value = "";
    document.getElementById("numero1").value = "";

    document.getElementById("equipo2").value = "";
    document.getElementById("jugador2").value = "";
    document.getElementById("numero2").value = "";

    document.getElementById("equipo3").value = "";
    document.getElementById("jugador3").value = "";
    document.getElementById("numero3").value = "";


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

function verPedidos() {

    let pedidos =
        obtenerPedidos();


    let misPedidos =
        pedidos.filter(function(pedido) {

            return (
                pedido.usuario === usuarioActual
            );

        });


    let contenedor =
        document.getElementById("pedidos");


    contenedor.innerHTML = "";


    if (misPedidos.length === 0) {

        contenedor.innerHTML =
            "<p>No tienes pedidos todavía.</p>";

        actualizarContador();

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


    actualizarContador();
}


// ==========================================
// CREAR HTML DEL PEDIDO
// ==========================================

function crearHTMLPedido(
    pedido,
    esAdmin
) {

    let claseEstado = "";


    if (pedido.estado === "Pendiente") {
        claseEstado = "pendiente";
    }

    if (pedido.estado === "Aceptado") {
        claseEstado = "aceptado";
    }

    if (pedido.estado === "Listo") {
        claseEstado = "listo";
    }

    if (pedido.estado === "Denegado") {
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
        pedido.id +
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
            escaparHTML(pedido.fechaListo) +
            "</p>";
    }


    camisetas.forEach(function(
        camiseta,
        indice
    ) {

        html +=
            "<div>";

        html +=
            "<b>Camiseta " +
            (indice + 1) +
            "</b>";

        html +=
            "<p>Equipo: " +
            escaparHTML(camiseta.equipo) +
            "</p>";

        html +=
            "<p>Jugador: " +
            escaparHTML(camiseta.jugador) +
            "</p>";

        html +=
            "<p>Número: " +
            escaparHTML(camiseta.numero) +
            "</p>";

        html +=
            "</div>";
    });


    // USUARIO NORMAL

    if (!esAdmin) {

        html +=
            '<button class="rojo" ' +
            'onclick="eliminarPedido(' +
            pedido.id +
            ')">' +
            "Eliminar pedido" +
            "</button>";
    }


    // ADMIN - PEDIDO PENDIENTE

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


    // ADMIN - PEDIDO ACEPTADO

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


    html +=
        "</div>";


    return html;
}


// ==========================================
// ESCAPAR HTML
// ==========================================

function escaparHTML(texto) {

    if (texto === null || texto === undefined) {
        return "";
    }

    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// ==========================================
// CONTADOR
// ==========================================

function actualizarContador() {

    let pedidos =
        obtenerPedidos();

    let fechaHoy =
        obtenerFechaHoy();


    let cantidad =
        pedidos.filter(function(pedido) {

            return (
                pedido.usuario === usuarioActual &&
                pedido.fecha === fechaHoy
            );

        }).length;


    document
        .getElementById("contadorPedidos")
        .textContent =
        "Pedidos realizados hoy: " +
        cantidad +
        " / 3";
}


// ==========================================
// ELIMINAR PEDIDO
// ==========================================

function eliminarPedido(id) {

    let pedidos =
        obtenerPedidos();


    pedidos =
        pedidos.filter(function(pedido) {

            return !(
                pedido.id === id &&
                pedido.usuario === usuarioActual
            );

        });


    guardarPedidos(pedidos);

    verPedidos();
}


// ==========================================
// CARGAR PANEL DEL ADMIN
// ==========================================

function cargarPanelAdmin() {

    mostrarPendientes();

    mostrarAceptados();

    mostrarListosDeHoy();

    mostrarDenegados();
}


// ==========================================
// MOSTRAR PENDIENTES
// ==========================================

function mostrarPendientes() {

    let pedidos =
        obtenerPedidos();


    let pendientes =
        pedidos.filter(function(pedido) {

            return (
                pedido.estado === "Pendiente"
            );

        });


    let contenedor =
        document.getElementById(
            "listaPendientes"
        );


    contenedor.innerHTML = "";


    if (pendientes.length === 0) {

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

function mostrarAceptados() {

    let pedidos =
        obtenerPedidos();


    let aceptados =
        pedidos.filter(function(pedido) {

            return (
                pedido.estado === "Aceptado"
            );

        });


    let contenedor =
        document.getElementById(
            "listaAceptados"
        );


    contenedor.innerHTML = "";


    if (aceptados.length === 0) {

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

function mostrarListosDeHoy() {

    let pedidos =
        obtenerPedidos();


    let hoy =
        obtenerFechaHoy();


    let listos =
        pedidos.filter(function(pedido) {

            return (
                pedido.estado === "Listo" &&
                pedido.fechaListo === hoy
            );

        });


    let contenedor =
        document.getElementById(
            "listaListos"
        );


    contenedor.innerHTML = "";


    if (listos.length === 0) {

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

function mostrarDenegados() {

    let pedidos =
        obtenerPedidos();


    let denegados =
        pedidos.filter(function(pedido) {

            return (
                pedido.estado === "Denegado"
            );

        });


    let contenedor =
        document.getElementById(
            "listaDenegados"
        );


    contenedor.innerHTML = "";


    if (denegados.length === 0) {

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

function aceptarPedido(id) {

    let pedidos =
        obtenerPedidos();


    let pedido =
        pedidos.find(function(pedido) {

            return pedido.id === id;

        });


    if (!pedido) {
        return;
    }


    pedido.estado = "Aceptado";

    pedido.fechaListo = null;


    guardarPedidos(pedidos);


    cargarPanelAdmin();
}


// ==========================================
// MARCAR PEDIDO COMO LISTO
// ==========================================

function marcarPedidoListo(id) {

    let pedidos =
        obtenerPedidos();


    let pedido =
        pedidos.find(function(pedido) {

            return pedido.id === id;

        });


    if (!pedido) {
        return;
    }


    if (
        pedido.estado !== "Aceptado"
    ) {
        return;
    }


    pedido.estado = "Listo";

    pedido.fechaListo =
        obtenerFechaHoy();


    guardarPedidos(pedidos);


    cargarPanelAdmin();
}


// ==========================================
// DENEGAR PEDIDO
// ==========================================

function denegarPedido(id) {

    let pedidos =
        obtenerPedidos();


    let pedido =
        pedidos.find(function(pedido) {

            return pedido.id === id;

        });


    if (!pedido) {
        return;
    }


    pedido.estado = "Denegado";

    pedido.fechaListo = null;


    guardarPedidos(pedidos);


    cargarPanelAdmin();
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
// COMPATIBILIDAD CON PEDIDOS ANTIGUOS
// ==========================================

function actualizarPedidosAntiguos() {

    let pedidos =
        obtenerPedidos();


    let huboCambios = false;


    pedidos.forEach(function(pedido) {

        if (
            !Array.isArray(pedido.camisetas)
        ) {

            pedido.camisetas = [];


            if (
                pedido.equipo !== undefined ||
                pedido.jugador !== undefined ||
                pedido.numero !== undefined
            ) {

                pedido.camisetas.push({

                    equipo:
                        pedido.equipo || "",

                    jugador:
                        pedido.jugador || "",

                    numero:
                        pedido.numero || ""

                });
            }


            huboCambios = true;
        }


        if (
            pedido.fechaListo === undefined
        ) {

            pedido.fechaListo = null;

            huboCambios = true;
        }


        if (
            pedido.estado === undefined
        ) {

            pedido.estado = "Pendiente";

            huboCambios = true;
        }
    });


    if (huboCambios) {

        guardarPedidos(pedidos);
    }
}


// ==========================================
// INICIAR PÁGINA
// ==========================================

window.onload = function() {

    actualizarPedidosAntiguos();


    if (usuarioActual) {

        entrarAlPanel();

    } else {

        mostrarRegistro();

    }
};