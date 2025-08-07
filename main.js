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

function eliminarJugador(index) {
  participantes.splice(index, 1);
  guardarEnLocalStorage();
  mostrarParticipantes();
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
    alert("Se alcanzó el máximo de participantes.");
    return;
  }

  const nombre = nombreInput.value.trim();
  const categoria = categoriaInput.value.trim();
  const carnet = carnetInput.value.trim();

  if (!nombre || !categoria || !carnet) return;

  if (participantes.some((p) => p.carnet === carnet)) {
    alert("Ese número de carnet ya fue ingresado.");
    return;
  }

  participantes.push({ nombre, categoria, carnet });
  guardarEnLocalStorage();
  mostrarParticipantes();
  form.reset();
});

reiniciarBtn.addEventListener("click", () => {
  if (confirm("¿Estás seguro que querés reiniciar el registro?")) {
    participantes = [];
    guardarEnLocalStorage();
    mostrarParticipantes();
  }
});

document.addEventListener("DOMContentLoaded", mostrarParticipantes);
