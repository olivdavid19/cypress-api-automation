import { faker } from '@faker-js/faker'

describe('PUT /todos', () => {

  context('Deve criar um usuario e todos', () => {
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

    //Criar user
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

    it('Deve atualizar "todos" do usuario', () => {
      const newTodo = {
        status: 'completed',
        title: faker.lorem.sentence(3),
        due_on: faker.date.future().toISOString().replace('Z', '')
      }

      cy.putTodoById(Cypress.env('TODO_ID'), newTodo).then(response => {
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql(newTodo.status)
        expect(response.body.title).to.eql(newTodo.title)
        expect(response.body.due_on).to.contain(newTodo.due_on)
      })
    })

    it('Deve falhar na atualização de "todos" sem token', () => {
      cy.putTodoByIdNoToken(Cypress.env('TODO_ID'), todo).then(response => {
        expect(response.status).to.be.equal(404)
        expect(response.statusText).to.eql('Not Found')
      })
    })
  })
})