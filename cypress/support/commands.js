const authorization = `Bearer ${Cypress.env('ACCESS_TOKEN')}`

// GET requisição que testa a obtenção de "todos" de usuarios
Cypress.Commands.add('getTodos', function () {
    cy.request({
        method: 'GET',
        url: '/todos',
        headers: {
            authorization
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

// GET requisição que testa a obtenção de "todos" de usuarios com status esperado
Cypress.Commands.add('getTodosWithStatus', function (expectedStatus) {
    cy.request({
        method: 'GET',
        url: '/todos',
        headers: {
            authorization
        },
        qs: {
            status: expectedStatus
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

// GET requisição que testa a obtenção de um numero de "todos"
Cypress.Commands.add('getNumberOfTodos', function (number) {
    cy.request({
        method: 'GET',
        url: '/todos',
        headers: {
            authorization
        },
        qs: {
            per_page: number
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

// GET requisição que testa a obtenção de "todos" de usuario especifico via parametro
Cypress.Commands.add('getTodosFromUserParam', function (user) {
    cy.request({
        method: 'GET',
        url: '/todos',
        headers: {
            authorization
        },
        qs: {
            user_id: user
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

// GET requisição que testa a obtenção de "todos" de usuario especifico via URL
Cypress.Commands.add('getTodosFromUserUrl', function (user) {
    cy.request({
        method: 'GET',
        url: `/users/${user}/todos`,
        headers: {
            authorization
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

// GET requisição que testa a obtenção de "todos" de um id
Cypress.Commands.add('getTodosFromId', function (id) {
    cy.request({
        method: 'GET',
        url: `/todos/${id}`,
        headers: {
            authorization
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

// POST requisição que testa o cadastro de usuario
Cypress.Commands.add('postUser', function (payload) {
    cy.request({
        method: 'POST',
        url: '/users',
        body: payload,
        headers: {
            authorization
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

// POST requisição que testa o cadastro de todo para um usuario
Cypress.Commands.add('postTodoForUser', function (userId, payload) {
    cy.request({
        method: 'POST',
        url: `/users/${userId}/todos`,
        body: payload,
        headers: {
            authorization
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

// POST requisição que testa o cadastro de todo para um usuario
Cypress.Commands.add('postTodo', function (payload) {
    cy.request({
        method: 'POST',
        url: '/todos',
        body: payload,
        headers: {
            authorization
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

// POST requisição que testa o cadastro de todo para um usuario sem token
Cypress.Commands.add('postTodoForUserNoToken', function (userId, payload) {
    cy.request({
        method: 'POST',
        url: `/users/${userId}/todos`,
        body: payload,
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

//DELETE requisição que testa o deletar de um todo por ID do usuario
Cypress.Commands.add('deleteUserById', function (userId) {
    cy.request({
        method: 'DELETE',
        url: `/users/${userId}`,
        headers: {
            authorization
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

//DELETE requisição que testa o deletar de um todo por ID
Cypress.Commands.add('deleteTodoById', function (todoId) {
    cy.request({
        method: 'DELETE',
        url: `/todos/${todoId}`,
        headers: {
            authorization
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

//DELETE requisição que testa o deletar de um todo por ID sem token
Cypress.Commands.add('deleteTodoByIdNoToken', function (todoId) {
    cy.request({
        method: 'DELETE',
        url: `/todos/${todoId}`,
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

//PUT requisição que atualiza o cadastro de todo
Cypress.Commands.add('putTodoById', function (todoId, payload) {
    cy.request({
        method: 'PUT',
        url: `/todos/${todoId}`,
        headers: {
            authorization
        },
        body: payload,
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

//PUT requisição que atualiza o cadastro de todo sem token
Cypress.Commands.add('putTodoByIdNoToken', function (todoId) {
    cy.request({
        method: 'PUT',
        url: `/todos/${todoId}`,
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})