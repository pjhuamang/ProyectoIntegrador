const tableBody = document.querySelector("#odontologosTable tbody");
function fetchOdontologos() {
  // listando los odontologos

  fetch(`/odontologo`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Limpiar el contenido actual de la tabla
      tableBody.innerHTML = "";

      // Insertar los datos en la tabla
      data.forEach((odontologo, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
                <td>${odontologo.id}</td>
                <td>${odontologo.nombre}</td>
                <td>${odontologo.apellido}</td>
                <td>${odontologo.nroMatricula}</td>
                <td>
                  <button class="btn btn-primary btn-sm" onclick="editOdontologo(${odontologo.id}, '${odontologo.nombre}', '${odontologo.apellido}', '${odontologo.nroMatricula}')">Modificar</button>
                  <button class="btn btn-danger btn-sm" onclick="deleteOdontologo(${odontologo.id})">Eliminar</button>
                </td>
              `;

        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  // modificar un odontologo

  // eliminar un odontologo
}

function editOdontologo(id, nombre, apellido, nroMatricula) {
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
        <label for="editMatricula" class="form-label">Matrícula</label>
        <input type="text" class="form-control" id="editMatricula" value="${nroMatricula}" required />
      </div>
      <button type="submit" class="btn btn-primary">Actualizar</button>
    </form>
  `;

  const editFormContainer = document.createElement("div");
  editFormContainer.innerHTML = formHtml;
  document.body.appendChild(editFormContainer);

  const editForm = document.getElementById("editForm");
  editForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const updatedNombre = document.getElementById("editNombre").value;
    const updatedApellido = document.getElementById("editApellido").value;
    const updatedMatricula = document.getElementById("editMatricula").value;

    fetch(`/odontologo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, nombre: updatedNombre, apellido: updatedApellido, nroMatricula: updatedMatricula }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Odontólogo actualizado con éxito");
        fetchOdontologos(); // Refrescar la lista de odontólogos
        document.body.removeChild(editFormContainer); // Eliminar el formulario de edición
      })
      .catch((error) => {
        console.error("Error actualizando odontólogo:", error);
      });
  });
}

function deleteOdontologo(id) {
  const confirmacion = confirm("¿Está seguro que desea eliminar este odontólogo?");

  if (confirmacion) {
    fetch(`/odontologo/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Odontólogo eliminado con éxito");
        fetchOdontologos();
      })
      .catch((error) => {
        console.error("Error eliminando odontólogo:", error);
      });
  }
}


fetchOdontologos();
