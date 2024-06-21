const tableBody = document.getElementById('turnosTableBody');

function fetchTurnos() {
    fetch('/turno')
        .then(response => response.json())
        .then(data => {
            tableBody.innerHTML = '';
            data.forEach((turno, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${turno.pacienteId}</td>
                    <td>${turno.odontologoId}</td>
                    <td>${turno.fechaHora}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

fetchTurnos();
