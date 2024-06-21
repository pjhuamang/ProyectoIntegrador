const tableBody = document.getElementById('pacientesTableBody');

function fetchPacientes() {
    fetch('/paciente')
        .then(response => response.json())
        .then(data => {
            tableBody.innerHTML = '';
            data.forEach((paciente, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${paciente.nombre}</td>
                    <td>${paciente.apellido}</td>
                    <td>${paciente.dni}</td>
                    <td>${paciente.fechaIngreso}</td>
                    <td>${paciente.domicilio.calle} ${paciente.domicilio.numero}, ${paciente.domicilio.localidad}, ${paciente.domicilio.provincia}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="editPaciente(${paciente.id}, '${paciente.nombre}', '${paciente.apellido}', '${paciente.dni}', '${paciente.fechaIngreso}', '${paciente.domicilio.calle}', '${paciente.domicilio.numero}', '${paciente.domicilio.localidad}', '${paciente.domicilio.provincia}')">Modificar</button>
                        <button class="btn btn-danger btn-sm" onclick="deletePaciente(${paciente.id})">Eliminar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

function editPaciente(id, nombre, apellido, dni, fechaIngreso, calle, numero, localidad, provincia) {
    const formHtml = `
        <form id="editForm">
            <div class="mb-3">
                <label for="editNombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="editNombre" value="${nombre}" required />
            </div>
            <div class="mb-3">
                <label for="editApellido" class="form-label">Apellido</label>
                <input type="text" class="form-control" id="editApellido" value="${apellido}" required />
            </div>
            <div class="mb-3">
                <label for="editDni" class="form-label">DNI</label>
                <input type="text" class="form-control" id="editDni" value="${dni}" required />
            </div>
            <div class="mb-3">
                <label for="editFechaIngreso" class="form-label">Fecha de Alta</label>
                <input type="date" class="form-control" id="editFechaIngreso" value="${fechaIngreso}" required />
            </div>
            <div class="mb-3">
                <label for="editCalle" class="form-label">Calle</label>
                <input type="text" class="form-control" id="editCalle" value="${calle}" required />
            </div>
            <div class="mb-3">
                <label for="editNumero" class="form-label">Número</label>
                <input type="text" class="form-control" id="editNumero" value="${numero}" required />
            </div>
            <div class="mb-3">
                <label for="editLocalidad" class="form-label">Localidad</label>
                <input type="text" class="form-control" id="editLocalidad" value="${localidad}" required />
            </div>
            <div class="mb-3">
                <label for="editProvincia" class="form-label">Provincia</label>
                <input type="text" class="form-control" id="editProvincia" value="${provincia}" required />
            </div>
            <button type="submit" class="btn btn-primary">Actualizar</button>
        </form>
    `;

    const editFormContainer = document.createElement('div');
    editFormContainer.innerHTML = formHtml;
    document.body.appendChild(editFormContainer);

    const editForm = document.getElementById('editForm');
    editForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const updatedPaciente = {
            id,
            nombre: document.getElementById('editNombre').value,
            apellido: document.getElementById('editApellido').value,
            dni: document.getElementById('editDni').value,
            fechaIngreso: document.getElementById('editFechaIngreso').value,
            domicilio: {
                calle: document.getElementById('editCalle').value,
                numero: document.getElementById('editNumero').value,
                localidad: document.getElementById('editLocalidad').value,
                provincia: document.getElementById('editProvincia').value
            }
        };

        fetch(`/paciente/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPaciente)
        })
        .then(response => response.json())
        .then(data => {
            alert('Paciente actualizado con éxito');
            fetchPacientes(); // Refrescar la lista de pacientes
            document.body.removeChild(editFormContainer); // Eliminar el formulario de edición
        })
        .catch(error => console.error('Error:', error));
    });
}

function deletePaciente(id) {
    if (confirm('¿Está seguro de que desea eliminar este paciente?')) {
        fetch(`/paciente/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Paciente eliminado con éxito');
                fetchPacientes(); // Refrescar la lista de pacientes
            } else {
                alert('Error eliminando paciente');
            }
        })
        .catch(error => console.error('Error:', error));
    }
}

fetchPacientes();
