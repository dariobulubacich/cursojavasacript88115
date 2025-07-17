const torneo = "Torneo de Invierno";
let participantes = [];
const maxParticipantes = 5;

function iniciarRegistro() {
  alert("Bienvenido al " + torneo);
  let continuar = confirm("¿Querés registrar participantes?");

  while (continuar && participantes.length < maxParticipantes) {
    const nombre = prompt("Ingrese el nombre del jugador:")?.trim();
    const categoria = prompt("Ingrese la categoría:")?.trim();
    const carnet = prompt("Ingrese el número de carnet:")?.trim();

    if (!nombre || !categoria || !carnet) {
      alert("Debés completar todos los campos.");
    } else if (participantes.some((p) => p.carnet === carnet)) {
      alert("Este número de carnet ya fue ingresado.");
    } else {
      const jugador = { nombre, categoria, carnet };
      participantes.push(jugador);
      console.log("Jugador registrado:", jugador);
      alert(`Jugador ${nombre} registrado con éxito.`);
    }

    if (participantes.length < maxParticipantes) {
      continuar = confirm("¿Deseás registrar otro?");
    } else {
      alert("Se alcanzó el máximo de participantes.");
    }
  }

  mostrarResumen();
}

function mostrarResumen() {
  console.log("===== Resumen de Participantes =====");
  participantes.forEach((p) => {
    console.log(
      `• ${p.nombre} - Categoría ${p.categoria} - Carnet: ${p.carnet}`
    );
  });
  alert("Fin del registro. Consultá la consola para ver el resumen.");
}
