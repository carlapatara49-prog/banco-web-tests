Cypress.Commands.add('verificarMensagemNoToast', mensagem => {
    cy.get('.toast').should('have.text',mensagem)
})

Cypress.Commands.add('selecionarOpcaoCombobox', (labelDoCampo, opcao)  => {
    cy.get(`label[for= "${labelDoCampo}"]`).parent().as(`campo-${labelDoCampo}`)// cria apelido para a label
        cy.get(`@campo-${labelDoCampo}`).click()
        cy.get(`@campo-${labelDoCampo}`).contains(opcao).click()
})

