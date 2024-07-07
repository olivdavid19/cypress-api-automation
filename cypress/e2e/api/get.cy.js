const { expect } = require("chai").use(require('chai-json-schema'));
import { faker } from '@faker-js/faker'

describe('GET /todos', () => {

  it('Deve retornar no maximo 10 "todos" de usuarios', () => {
    cy.getTodos().then(response => {
      expect(response.status).to.be.equal(200)
      expect(response.body).to.be.a('array')
      expect(response.body).not.to.be.empty
    })
  })

  const numbers = [1, 100]
  numbers.forEach(n => {
    it(`Deve retornar ${n} "todos" de usuarios`, () => {
      cy.getNumberOfTodos(n).then(response => {
        expect(response.status).to.be.equal(200)
        expect(response.body).to.be.a('array')
        expect(response.body).not.to.be.empty
        expect(response.body.length).to.eql(n)
      })
    })
  })

  //Estou suponto que esse é o comportamento esperado, dado que 100 é o máximo
  it(`Deve retornar 10 "todos" se pesquisarmos por 101 de usuarios`, () => {
    cy.getNumberOfTodos('101').then(response => {
      expect(response.status).to.be.equal(200)
      expect(response.body).to.be.a('array')
      expect(response.body).not.to.be.empty
      expect(response.body.length).to.eql(10)
    })
  })


  it('Deve retornar "todos" com status completed', () => {
    cy.getTodosWithStatus('completed').then(response => {
      expect(response.status).to.be.equal(200)
      expect(response.body).to.be.a('array')
      expect(response.body).not.to.be.empty
    })
  })

  it('Deve retornar nenhum "todos"', () => {
    cy.getTodosWithStatus('wrong').then(response => {
      expect(response.status).to.be.equal(200)
      expect(response.body).to.be.a('array')
      expect(response.body).to.be.empty
    })
  })

  it('Deve fazer validação JSON schema', () => {
    const schema = {
      title: 'Check JSON schema',
      type: 'object',
      properties: {
        id: {
          type: 'number',
          minimum: 5
        },
        user_id: {
          type: 'number',
          minimum: 7
        },
        title: {
          type: 'string'
        },
        due_on: {
          type: 'string'
        },
        status: {
          type: 'string'
        }
      },
      required: [
        'id',
        'user_id',
        'title',
        'due_on',
        'status'
      ]
    }

    cy.getTodos().then(response => {
      expect(response.status).to.be.equal(200)
      expect(response.body[0]).to.be.jsonSchema(schema);
    })
  })

  it('Deve retornar "todos" de usuário com status completed', () => {
    cy.getTodosWithStatus('completed').then(response => {
      expect(response.status).to.eql(200)

      for (let i = 0; i < 10; i++) {
        expect(response.body[i].status).to.eql('completed');
      }
    })
  })

  describe('Deve retornar "todos" de um usuario', () => {
    const user = {
      name: faker.person.fullName(),
      gender: faker.person.sex(),
      email: faker.internet.email(),
      status: 'active'
    }

    const todo = {
      status: 'pending',
      title: faker.lorem.sentence(3),
      due_on: faker.date.future()
    }

    //Criar user e todo
    before(() => {
      cy.postUser(user).then(response => {
        expect(response.status).to.eql(201)
        Cypress.env('USER_ID', response.body.id)

        cy.postTodoForUser(Cypress.env('USER_ID'), todo).then(response => {
          expect(response.status).to.eql(201)
        })
      })
    })

    //Deletar user
    after(() => {
      cy.deleteUserById(Cypress.env('USER_ID')).then(response => {
        expect(response.status).to.eql(204)
      })
    })

    it('Via parametro', () => {
      cy.getTodosFromUserParam(Cypress.env('USER_ID')).then(response => {
        expect(response.status).to.be.equal(200)
        expect(response.body.length).to.eql(1)
        expect(response.body[0].status).to.eql(todo.status)
        expect(response.body[0].title).to.eql(todo.title)
        expect(response.body.due_on).to.contain(todo.due_on)
      })
    })

    it('Via URL', () => {
      cy.getTodosFromUserUrl(Cypress.env('USER_ID')).then(response => {
        expect(response.status).to.be.equal(200)
        expect(response.body.length).to.eql(1)
        expect(response.body[0].status).to.eql(todo.status)
        expect(response.body[0].title).to.eql(todo.title)
        expect(response.body.due_on).to.contain(todo.due_on)
      })
    })
  })

  it('Deve falhar quando utilizar URL errada', () => {
    cy.request({
      method: 'GET',
      url: '/todoss',
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.be.equal(404)
      expect(response.statusText).to.be.equal('Not Found')
    })
  })

  it('Deve falhar quando utilizar um ID errado', () => {
    cy.getTodosFromId('wrong').then(response => {
      expect(response.status).to.be.equal(404)
      expect(response.statusText).to.eql('Not Found')
    })
  })
})