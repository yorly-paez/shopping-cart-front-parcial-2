// Función principal que obtiene y muestra una lista de usuarios paginada
function users(page = 1) {
    const USERS_PER_PAGE = 10
    const skip = (page - 1) * USERS_PER_PAGE

    document.getElementById('cardHeader').innerHTML = '<h5>Listado de usuarios</h5>'

    const DUMMYJSON_ENDPOINT = `https://dummyjson.com/users?limit=${USERS_PER_PAGE}&skip=${skip}`

    fetch(DUMMYJSON_ENDPOINT)
        .then((response) => response.json())
        .then((data) => {
            if (data && data.users && data.users.length > 0) {
                let listUsers = `
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Imagen de Usuario</th>
                            <th scope="col">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                `

                data.users.forEach(user => {
                    listUsers += `
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.firstName}</td>
                            <td>${user.lastName}</td>
                            <td><img src="${user.image}" class="img-thumbnail" alt="avatar del usuario"></td>
                            <td>
                                <button type="button" class="btn btn-outline-info" onclick="getUser(${user.id})">Ver</button>
                            </td>
                        </tr>
                    `
                })

                listUsers += `
                        </tbody>
                    </table>
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" href="#" onclick="users(${page - 1})" ${page <= 1 ? 'disabled' : ''}>&laquo;</a></li>
                            <li class="page-item"><a class="page-link" href="#" onclick="users(1)">1</a></li>
                            <li class="page-item"><a class="page-link" href="#" onclick="users(2)">2</a></li>
                            <li class="page-item"><a class="page-link" href="#" onclick="users(${page + 1})">&raquo;</a></li>
                        </ul>
                    </nav>
                `

                document.getElementById('info').innerHTML = listUsers
            } else {
                document.getElementById('info').innerHTML = 'No existen usuarios en la BD'
            }
        })
}

// Función que obtiene los detalles de un usuario específico por su ID
function getUser(idUser) {
    const DUMMYJSON_USER_ENDPOINT = `https://dummyjson.com/users/${idUser}`

    fetch(DUMMYJSON_USER_ENDPOINT)
        .then((response) => response.json())
        .then((user) => {
            if (user && user.id) {
                showModalUser(user)
            } else {
                document.getElementById('info').innerHTML = '<h3>No se encontró el usuario en la API</h3>'
            }
        })
}

// Función que muestra un modal con la información detallada de un usuario
function showModalUser(user) {
    const modalUser = `
    <div class="modal fade" id="showModalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Ver Usuario</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="card">
                <img src="${user.image}" class="card-img-top" alt="Avatar del usuario">
                <div class="card-body">
                    <h5 class="card-title">Información del usuario</h5>
                    <p class="card-text">Correo: ${user.email}</p>
                    <p class="card-text">Nombre: ${user.firstName}</p>
                    <p class="card-text">Apellido: ${user.lastName}</p>
                    <p class="card-text">Telefono: ${user.phone}</p>
                    <p class="card-text">Ciudad: ${user.address.city}</p>
                </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    `
    
    document.getElementById('modalUser').innerHTML = modalUser

    const modal = new bootstrap.Modal(document.getElementById('showModalUser'))
    modal.show()
}
