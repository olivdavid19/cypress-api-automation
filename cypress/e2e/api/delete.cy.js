import { faker } from '@faker-js/faker'

describe('DELETE /todos', () => {

    context('Deve criar um usuario e "todos"', () => {
        const user = {
            name: faker.person.fullName(),
            gender: faker.person.sex(),
            email: faker.internet.email(),
            status: 'active'
        }

        const todo = {
            status: 'pending',
            title: faker.lorem.sentence(3),
            due_on: faker.date.future().toISOString().replace('Z', '')
        }

        //Criar user e todo
        beforeEach(() => {
            cy.postUser(user).then(response => {
                expect(response.status).to.eql(201)
                Cypress.env('USER_ID', response.body.id)

                cy.postTodoForUser(response.body.id, todo).then(response => {
                    expect(response.status).to.eql(201)
                    Cypress.env('TODO_ID', response.body.id)
                })
            })
        })

        //Deletar user
        afterEach(() => {
            cy.deleteUserById(Cypress.env('USER_ID')).then(response => {
                expect(response.status).to.eql(204)
            })
        })

        it('Deve deletar "todos" de um usuario', () => {
            cy.deleteTodoById(Cypress.env('TODO_ID')).then(response => {
                expect(response.status).to.eql(204)
                expect(response.statusText).to.eql('No Content')
            })

            cy.getTodosFromId(Cypress.env('TODO_ID')).then(response => {
                expect(response.status).to.be.equal(404)
                expect(response.statusText).to.eql('Not Found')
            })
        })

        //Esta a falhar, não deveria ser possível deletar todo sem token
        //Status code é 404 mas deveria ser 401
        it('Deve deletar "todos" de um usuario sem autorização', () => {
            cy.deleteTodoByIdNoToken(Cypress.env('TODO_ID')).then(response => {
                expect(response.status).to.eql(401)
                expect(response.statusText).to.eql('Unauthorized')
            })
        })
    })

    it('Deve falhar ao deletar "todos" com ID nao existente', () => {
        cy.deleteTodoById('wrong').then(response => {
            expect(response.status).to.be.equal(404)
            expect(response.statusText).to.eql('Not Found')
        })
    })
})