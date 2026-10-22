describe('Login', () => {
  beforeEach(() => {
      cy.visit('/')
      cy.screenshot('após-visitar-pagina')
  })

  it('Login com dados válidos devem permitir entrada no sistema', () => {

    //Act
     cy.fazerLoginComCredenciaisValidas()

    //Assert
    cy.contains('h4','Realizar Transferência').should('be.visible')

  })

   it('Login com dados inválidos devem apresentar mensagem de erro', () => {

    //Act
    cy.fazerLoginComCredenciaisInvalidas()  

    //Assert
    cy.verificarMensagemNoToast('Erro no login. Tente novamente.')
   
   })
})