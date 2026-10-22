Cypress.Commands.add('realizarTransferencias', (contaOrigem, contaDestino, valor) => {
     cy.selecionarOpcaoCombobox('conta-origem', contaOrigem)
         cy.selecionarOpcaoCombobox('conta-destino', contaDestino)
         cy.get('#valor').click().type(valor)
         cy.contains('button', 'Transferir').click()
})
