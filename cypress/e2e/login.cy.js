describe('Login', () => {
  beforeEach(()=>{
      cy.visit('http://localhost:4000')
      cy.screenshot('após-visitar-pagina')
  })
  it.only('Login com dados válidos devem permitir entrada no sistema', () => {
    cy.get('#username').click().type('julio.lima')
    cy.get('#senha').click().type('123456')
     cy.screenshot('após-preencher-dados-validos')
    cy.get('#login-section > .btn').click()
     cy.screenshot('após-clicar-no-botao-entrar')


    //Assert
    cy.contains('h4','Realizar Transferência').should('be.visible')

  })
   it('Login com dados inválidos devem apresentar mensagem de erro', () => {
    cy.visit('http://localhost:4000')
    cy.get('#username').click().type('julio.lima')
    cy.get('#senha').click().type('654321')
    cy.contains('button','Entrar').click()


    //Assert
     cy.get('.toast').should('have.text','Erro no login. Tente novamente.')
   })
})