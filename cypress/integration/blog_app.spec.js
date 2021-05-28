describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Kari1',
      username: 'kayttajatunnus1',
      password: 'salasana1'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  //5.17
  it('Login form is shown', function() {
    cy.contains('Login')
    cy.get('#username')
    cy.get('#password')
  })

  //5.18
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').clear()
      cy.get('#username').type('kayttajatunnus1')
      cy.get('#password').clear()
      cy.get('#password').type('salasana1')
      cy.get('#login-button').click()
      cy.contains('Kari1 logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').clear()
      cy.get('#username').type('kayttajatunnus1_virheellinen')
      cy.get('#password').clear()
      cy.get('#password').type('salasana1_virheellinen')
      cy.get('#login-button').click()
      cy.get('#error').should('contain', 'Wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'kayttajatunnus1',
        password: 'salasana1' })
    })

    //5.19
    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Title1')
      cy.get('#author').type('Author1')
      cy.get('#url').type('Url1')
      cy.get('#likes').type('0')
      cy.get('#save-button').click()
      cy.get('#info').should('contain', ' added')
    })


    //5.20
    it('A blog can be liked', function() {
      cy.createBlog({
        title: 'Title2',
        author: 'Author2',
        url: 'Url2',
        likes: 0
      })

      cy.get('#view-button').click()
      cy.get('#update-likes-button').click()
      cy.visit('http://localhost:3000')
      cy.get('#view-button').click()
      //cy.get('#likes').should('have.value', '1')
      cy.get('#likes-div').should('contain', 'likes 1')
    })

    //5.20
    it('A blog can be removed', function() {
      cy.createBlog({
        title: 'Title2',
        author: 'Author2',
        url: 'Url2',
        likes: 0
      })

      cy.get('#view-button').click()
      cy.visit('http://localhost:3000')
      cy.get('#view-button').click()
      cy.get('#remove-button').click()
      cy.get('#info').should('contain', ' deleted')
    })

    //5.21
    it('A blog can be removed only by user who created it', function() {
      cy.createBlog({
        title: 'Title2',
        author: 'Author2',
        url: 'Url2',
        likes: 0
      })

      cy.get('#logout-button').click()
      cy.visit('http://localhost:3000')

      const user = {
        name: 'Kari_999',
        username: 'kayttajatunnus999',
        password: 'salasana999'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')

      cy.get('#username').clear()
      cy.get('#username').type('kayttajatunnus999')
      cy.get('#password').clear()
      cy.get('#password').type('salasana999')
      cy.get('#login-button').click()
      cy.contains('Kari_999 logged in')

      cy.get('#view-button').click()
      cy.visit('http://localhost:3000')
      cy.get('#view-button').click()
      cy.get('#remove-button').click()
      cy.get('#error').should('contain', 'Delete blog Title2 failed')
    })


    //5.22
    it.only('A blogs ordered by likes', function() {
      //first blog - one likes
      cy.createBlog({
        title: 'Title1',
        author: 'Author1',
        url: 'Url1',
        likes: 0
      })
      cy.get('.view-button').click()
      cy.get('.update-likes-button').click()
      cy.wait(500)

      // second blog - tho likes
      cy.createBlog({
        title: 'Title2',
        author: 'Author2',
        url: 'Url2',
        likes: 0
      })
      cy.visit('http://localhost:3000')
      cy.get('.view-button').last().click()
      cy.get('.update-likes-button').last().click()
      cy.wait(500)
      cy.get('.update-likes-button').last().click()

      // third blog - three likes
      cy.createBlog({
        title: 'Title3',
        author: 'Author3',
        url: 'Url3',
        likes: 0
      })
      cy.visit('http://localhost:3000')
      cy.get('.view-button').last().click()
      cy.get('.update-likes-button').last().click()
      cy.wait(500)
      cy.get('.update-likes-button').last().click()
      cy.wait(500)
      cy.get('.update-likes-button').last().click()
      cy.wait(500)
      cy.visit('http://localhost:3000')
      cy.wait(1000)

      //first div contains title with most clicks
      cy.get('.blog-title').first().contains ('Title3')
    })
  })

})
