/* eslint-disable */
describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Teemu Soukki',
      username: 'TSo',
      password: 'suolainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3001')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
  })
  it('user can log in', function() {
    cy.contains('log in').click()
    cy.get('#username').type('TSo')
    cy.get('#password').type('suolainen')
    cy.get('#login-button').click()

    cy.contains('Matti Luukkainen logged in')
  })


describe('when logged in', function() {
  beforeEach(function() {
    cy.contains('log in').click()
    cy.get('#username').type('TSo')
    cy.get('#password').type('suolainen')
    cy.get('#login-button').click()
  })

  it('a new note can be created', function() {
    cy.contains('new note').click()
    cy.get('input').type('a note created by cypress')
    cy.contains('save').click()
    cy.contains('a note created by cypress')
  })
  describe('and a note exists', function () {
    beforeEach(function () {
      cy.contains('new note').click()
      cy.get('input').type('another note cypress')
      cy.contains('save').click()
    })

    it('it can be made important', function () {
      cy.contains('another note cypress')
        .contains('make not important')
        .click()

      cy.contains('another note cypress')
        .contains('make important')
    })
  })
})

it.only('login fails with wrong password', function() {
  cy.contains('log in').click()
  cy.get('#username').type('mluukkai')
  cy.get('#password').type('wrong')
  cy.get('#login-button').click()

  cy.contains('wrong credentials')
})
})