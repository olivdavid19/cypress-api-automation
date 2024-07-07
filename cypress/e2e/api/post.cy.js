import { faker } from '@faker-js/faker'

describe('POST /todos', () => {

  context('Deve criar um usuario', () => {
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
      })
    })

    //Deletar user
    afterEach(() => {
      cy.deleteUserById(Cypress.env('USER_ID')).then(response => {
        expect(response.status).to.eql(204)
      })
    })

    it('Deve criar "todos" para o usuario', () => {
      cy.postTodoForUser(Cypress.env('USER_ID'), todo).then(response => {
        expect(response.status).to.eql(201)
        expect(response.body.status).to.eql('pending')
        expect(response.body.title).to.eql(todo.title)
        expect(response.body.due_on).to.contain(todo.due_on)
      })
    })

    it('Deve falhar na criação de "todos" sem body', () => {
      cy.postTodo({}).then(response => {
        expect(response.status).to.eql(422)
        expect(response.statusText).to.eql('Unprocessable Entity')
        expect(response.body[0].field).to.eql('user')
        expect(response.body[0].message).to.eql('must exist')
        expect(response.body[1].field).to.eql('title')
        expect(response.body[1].message).to.eql(`can't be blank`)
        expect(response.body[2].field).to.eql('user_id')
        expect(response.body[2].message).to.eql('is not a number')
        expect(response.body[3].field).to.eql('status')
        expect(response.body[3].message).to.eql(`can't be blank, can be pending or completed`)
      })
    })

    it('Deve falhar na criação de "todos" sem token', () => {
      cy.postTodoForUserNoToken(Cypress.env('USER_ID'), todo).then(response => {
        expect(response.status).to.eql(401)
        expect(response.statusText).to.eql('Unauthorized')
      })
    })
  })
})