/**
 * Listener para el evento submit del formulario de login
 * Captura los valores de email y password, y llama a la función login
 */
document.getElementById('loginForm').addEventListener('submit', function(e){
    // Prevenir el comportamiento por defecto del formulario (recargar la página)
    e.preventDefault()
    
    // Obtener valores de los campos del formulario
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    // Mostrar valores en consola para depuración
    console.log('Valores leidos del formulario', {email, password})
    
    // Llamar a la función login con los credenciales
    login(email, password)
})

/**
 * Función para manejar el proceso de autenticación
 * @param {string} email - Correo electrónico del usuario
 * @param {string} password - Contraseña del usuario
 */
function login(email, password){
    // Eliminar cualquier token previo almacenado
    localStorage.removeItem('token')
    
    // Variables para configurar la alerta
    let message = ''
    let alertType = ''
    
    // Endpoint de la API de autenticación
    const REQRES_ENDPOINT = 'https://reqres.in/api/login'
    
    // Configurar y enviar petición HTTP POST
    fetch(REQRES_ENDPOINT, {
        method: 'POST', // Método HTTP
        headers: { // Cabeceras de la petición
            'Content-type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        },
        body: JSON.stringify({email, password}) // Cuerpo con los credenciales
    })
    .then((response) =>{ // Manejar la respuesta del servidor
        if(response.status === 200){ // Si la autenticación fue exitosa
            alertType = 'success'
            message = 'Inicio de sesión exitoso'
            
            // Mostrar alerta de éxito
            alertBuilder(alertType, message)
            
            // Procesar la respuesta JSON para obtener el token
            response.json().then((data) => {
                // Almacenar el token en localStorage
                localStorage.setItem('token', data.token)
            }) 
            
            // Redirigir al dashboard después de 2 segundos
            setTimeout(() =>{
                location.href = 'admin/dashboard.html'
            }, 2000)
        }
        else{ // Si las credenciales son incorrectas
            alertType = 'danger'
            message = 'Correo o contraseña inválida'
            
            // Mostrar alerta de error
            alertBuilder(alertType, message)
        }
        
        // Registrar respuesta en consola para depuración
        console.log('Respuesta del servicio', response)
    })
    .catch((error) =>{ // Manejar errores de red o del servidor
        alertType = 'danger'
        message = 'Ocurrió un error inesperado'
        
        // Registrar error en consola
        console.log('Error en el servicio', error)
        
        // Mostrar alerta de error crítico
        alertBuilder(alertType, message)
    })
}

/**
 * Función para construir y mostrar alertas en la interfaz
 * @param {string} alertType - Tipo de alerta (success, danger, etc.)
 * @param {string} message - Mensaje a mostrar en la alerta
 */
function alertBuilder(alertType, message){
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