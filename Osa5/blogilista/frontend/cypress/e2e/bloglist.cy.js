/* eslint-disable */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Teemu Soukki',
      username: 'TSo',
      password: 'suolainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3003')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })
  it('can log in', function() {
      cy.get('input[name="Username"]').type('TSo')
      cy.get('input[name="Password"]').type('suolainen')
      cy.get('button[type="submit"]').click()
  })

  it('fails with wrong credentials', function() {
    cy.get('input[name="Username"]').type('wronguser')
    cy.get('input[name="Password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()

    cy.contains('wrong credentials')
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('input[name="Username"]').type('TSo')
      cy.get('input[name="Password"]').type('suolainen')
      cy.get('button[type="submit"]').click()
    })

    it('A blog can be created', function() {
      cy.contains('New Blog').click()

      cy.get('input[id="title"]').type('Test Blog Title')
      cy.get('input[name="author"]').type('Test Author')
      cy.get('input[name="url"]').type('https://example.com')

      cy.contains('create').click()
      cy.contains('Test Blog Title, by: Test Author')
    })
    it('A blog can be liked', function() {
      cy.contains('New Blog').click()
      cy.get('input[name="title"]').type('Test Blog Title')
      cy.get('input[name="author"]').type('Test Author')
      cy.get('input[name="url"]').type('https://example.com')
      cy.contains('create').click()

      cy.contains('Test Blog Title, by: Test Author').parent().as('blogItem')
      cy.get('@blogItem').contains('Show Details').click()

      cy.get('@blogItem').contains('Like').click()

      cy.get('@blogItem').contains('Likes: 1')
    })
    
  })
})