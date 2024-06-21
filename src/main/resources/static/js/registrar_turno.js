document.getElementById('registrarTurnoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const turno = {
        pacienteId: document.getElementById('pacienteId').value,
        odontologoId: document.getElementById('odontologoId').value,
        fechaHora: document.getElementById('fechaHora').value
    };

    fetch('/turno', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(turno)
    })
    .then(response => response.json())
    .then(data => {
        alert('Turno registrado con éxito');
        document.getElementById('registrarTurnoForm').reset();
    })
    .catch(error => console.error('Error:', error));
});
