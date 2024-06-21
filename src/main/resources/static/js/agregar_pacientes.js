document.getElementById("agregarForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const dni = document.getElementById("dni").value;
    const fechaAlta = document.getElementById("fechaAlta").value;
    const calle = document.getElementById("calle").value;
    const numero = document.getElementById("numero").value;
    const localidad = document.getElementById("localidad").value;
    const provincia = document.getElementById("provincia").value;

    const paciente = {
        nombre,
        apellido,
        dni,
        fechaIngreso: fechaAlta,
        domicilio: {
            calle,
            numero,
            localidad,
            provincia
        }
    };

    fetch("/paciente", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(paciente)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert("Paciente agregado con éxito");
        window.location.href = "listar_pacientes.html";
    })
    .catch(error => {
        console.error("Error agregando paciente:", error);
    });
});
