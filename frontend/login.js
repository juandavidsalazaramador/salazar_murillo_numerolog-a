const formLogin = document.getElementById("form-login");
const mensaje = document.getElementById("mensaje");
const zonaProtegida = document.getElementById("zona-protegida");
const nombreUsuario = document.getElementById("nombre-usuario");
const btnVerPerfil = document.getElementById("btn-ver-perfil");
const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");
const resultadoProtegido = document.getElementById("resultado-protegido");

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = "mensaje " + (tipo || "");
}

function mostrarSesionActiva(usuario) {
  formLogin.classList.add("oculto");
  zonaProtegida.classList.remove("oculto");
  nombreUsuario.textContent = usuario.nombre_completo || usuario.email;
}

// Si ya hay un token guardado de una sesión anterior, se muestra la zona protegida directamente
const tokenGuardado = localStorage.getItem("token");
const usuarioGuardado = localStorage.getItem("usuario");
if (tokenGuardado && usuarioGuardado) {
  mostrarSesionActiva(JSON.parse(usuarioGuardado));
}

formLogin.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  mostrarMensaje("", "");

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const respuesta = await fetch("/api/v1/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password_hash: password })
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      mostrarMensaje(datos.mensaje || "No se pudo iniciar sesión", "error");
      return;
    }

    localStorage.setItem("token", datos.token);
    localStorage.setItem("usuario", JSON.stringify(datos.usuario));

    mostrarMensaje("Inicio de sesión exitoso", "exito");
    mostrarSesionActiva(datos.usuario);
  } catch (error) {
    mostrarMensaje("Error de conexión con el servidor", "error");
    console.error(error);
  }
});

btnVerPerfil.addEventListener("click", async () => {
  const token = localStorage.getItem("token");
  resultadoProtegido.textContent = "Cargando...";

  try {
    const respuesta = await fetch("/api/v1/users", {
      headers: { "x-token": token }
    });
    const datos = await respuesta.json();

    if (!respuesta.ok) {
      resultadoProtegido.textContent = "Error: " + (datos.msg || datos.mensaje);
      return;
    }

    resultadoProtegido.textContent = JSON.stringify(datos, null, 2);
  } catch (error) {
    resultadoProtegido.textContent = "Error de conexión con el servidor";
  }
});

btnCerrarSesion.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  window.location.reload();
});
