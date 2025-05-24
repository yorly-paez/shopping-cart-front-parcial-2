document.getElementById('loginForm').addEventListener('submit', function (e) {
    // Prevenir el comportamiento por defecto del formulario (recargar la página)
    e.preventDefault()

    // Obtener valores de los campos del formulario
    const nameUser = document.getElementById('nameUser').value
    const password = document.getElementById('password').value

    // Mostrar valores en consola para depuración
    console.log('Valores leidos del formulario', { nameUser, password })

    // Llamar a la función login con los credenciales
    login(nameUser, password)
})

function login(nameUser, password) {
    // Eliminar cualquier token previo almacenado
    localStorage.removeItem('token')

    // Variables para configurar la alerta
    let message = ''
    let alertType = ''

    fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: nameUser,
            password: password,
        })
    })
    .then((response) => {
        if (response.status === 200) {
            alertType = 'success'
            message = 'Inicio de sesión exitoso'

            alertBuilder(alertType, message)

            return response.json().then((data) => {
                // Guardar el token en localStorage
                localStorage.setItem('token', data.token)

                // Redirigir al dashboard después de 2 segundos
                setTimeout(() => {
                    location.href = 'admin/dashboard.html'
                }, 2000)
            })
        } else {
            alertType = 'danger'
            message = 'Usuario o contraseña incorrectos'
            alertBuilder(alertType, message)
        }

        console.log('Respuesta del servicio', response)
    })
    .catch((error) => {
        alertType = 'danger'
        message = 'Ocurrió un error inesperado'
        console.log('Error en el servicio', error)
        alertBuilder(alertType, message)
    })
}
function alertBuilder(alertType, message) {
    // Plantilla HTML para la alerta usando clases de Bootstrap
    const alert = `
        <div class="alert alert-${alertType} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `

    // Insertar la alerta en el elemento con ID 'alert'
    document.getElementById('alert').innerHTML = alert
}