const torneo = "Torneo de Invierno";
const maxParticipantes = 5;
let participantes = JSON.parse(localStorage.getItem("participantes")) || [];

const form = document.getElementById("registroForm");
const nombreInput = document.getElementById("nombre");
const categoriaInput = document.getElementById("categoria");
const carnetInput = document.getElementById("carnet");
const listaParticipantes = document.getElementById("listaParticipantes");
const reiniciarBtn = document.getElementById("reiniciarBtn");

function guardarEnLocalStorage() {
  localStorage.setItem("participantes", JSON.stringify(participantes));
}

async function cargarMockAPI() {
  try {
    const res = await fetch("participantes.json");
    participantes = await res.json();
    guardarEnLocalStorage();
    mostrarParticipantes();
  } catch {
    Swal.fire("Error", "No se pudieron cargar datos remotos", "error");
  }
}

function eliminarJugador(index) {
  Swal.fire({
    title: "¿Eliminar jugador?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      participantes.splice(index, 1);
      guardarEnLocalStorage();
      mostrarParticipantes();
      Swal.fire("Eliminado", "El jugador fue eliminado", "success");
    }
  });
}

function mostrarParticipantes() {
  listaParticipantes.innerHTML = "";

  if (participantes.length === 0) {
    listaParticipantes.innerHTML = "<li>No hay participantes registrados.</li>";
    return;
  }

  participantes.forEach((p, index) => {
    const li = document.createElement("li");
    li.textContent = `${p.nombre} - Categoría ${p.categoria} - Carnet: ${p.carnet}`;

    const eliminarBtn = document.createElement("button");
    eliminarBtn.textContent = "Eliminar";
    eliminarBtn.className = "btn-eliminar";
    eliminarBtn.onclick = () => eliminarJugador(index);

    li.appendChild(eliminarBtn);
    listaParticipantes.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (participantes.length >= maxParticipantes) {
    Swal.fire(
      "Límite alcanzado",
      "Se llegó al máximo de participantes.",
      "info"
    );
    return;
  }

  const nombre = nombreInput.value.trim();
  const categoria = categoriaInput.value.trim();
  const carnet = carnetInput.value.trim();

  if (!nombre || !categoria || !carnet) return;

  if (participantes.some((p) => p.carnet === carnet)) {
    Swal.fire("Error", "Ese número de carnet ya fue ingresado.", "error");
    return;
  }

  participantes.push({ nombre, categoria, carnet });
  guardarEnLocalStorage();
  mostrarParticipantes();
  form.reset();

  Swal.fire("Registrado", `${nombre} fue registrado en el torneo`, "success");
});

reiniciarBtn.addEventListener("click", () => {
  Swal.fire({
    title: "¿Reiniciar registro?",
    text: "Se borrarán todos los participantes.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, reiniciar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      participantes = [];
      guardarEnLocalStorage();
      mostrarParticipantes();
      Swal.fire("Reiniciado", "El registro fue reiniciado", "success");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  mostrarParticipantes();
});
