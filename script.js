const actividadesForm = document.getElementById('actividadForm');
const actividadesBody = document.getElementById('actividadesBody');
const emptyMessage = document.getElementById('emptyMessage');
const iniciarBtn = document.getElementById('iniciarBtn');
const actividadesContainer = document.getElementById('actividadesContainer');
const inicioContainer = document.getElementById('inicio');
const volverBtn = document.getElementById('volverBtn'); // Asegúrate de tener este elemento

let actividades = JSON.parse(localStorage.getItem('actividades')) || [];

// Función para guardar actividades en localStorage
function guardarActividades() {
    localStorage.setItem('actividades', JSON.stringify(actividades));
}

// Función para eliminar una actividad
function eliminarActividad(index) {
    actividades.splice(index, 1);
    guardarActividades();
    actualizarTabla();
}

// Evento para el botón de inicio
iniciarBtn.addEventListener('click', function() {
    inicioContainer.style.display = 'none'; // Ocultar la pantalla de inicio
    actividadesContainer.style.display = 'block'; // Mostrar el contenedor de actividades
    actualizarTabla(); // Actualizar la tabla si hay actividades guardadas
});

// Manejar el envío del formulario
actividadesForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const actividadInput = document.getElementById('actividad').value;
    const materiaInput = document.getElementById('materia').value;
    const descripcionInput = document.getElementById('descripcion').value;
    const fechaInput = document.getElementById('fecha').value;

    const nuevaActividad = {
        actividad: actividadInput,
        materia: materiaInput,
        descripcion: descripcionInput,
        fecha: fechaInput
    };

    actividades.push(nuevaActividad);
    guardarActividades();
    actividadesForm.reset();
    actualizarTabla();
});

// Función para actualizar la tabla de actividades
function actualizarTabla() {
    actividadesBody.innerHTML = '';

    if (actividades.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
        actividades.sort((a, b) => new Date(a.fecha) - new Date(b.fecha)); // Ordenar por fecha

        actividades.forEach((actividad, index) => {
            const row = document.createElement('tr');
            const numeroCell = document.createElement('td');
            numeroCell.textContent = index + 1;

            const actividadCell = document.createElement('td');
            actividadCell.textContent = actividad.actividad;

            const materiaCell = document.createElement('td');
            materiaCell.textContent = actividad.materia;

            const descripcionCell = document.createElement('td');
            descripcionCell.textContent = actividad.descripcion;

            const fechaCell = document.createElement('td');
            fechaCell.textContent = actividad.fecha;

            const deleteCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.classList.add('delete-button');
            deleteButton.onclick = function () {
                eliminarActividad(index);
            };
            deleteCell.appendChild(deleteButton);

            row.appendChild(numeroCell);
            row.appendChild(actividadCell);
            row.appendChild(materiaCell);
            row.appendChild(descripcionCell);
            row.appendChild(fechaCell);
            row.appendChild(deleteCell);

            actividadesBody.appendChild(row);
        });
    }
}

// Inicializar la tabla al cargar
actualizarTabla();

