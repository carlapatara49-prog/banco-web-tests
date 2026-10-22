describe ('Transferencias', () =>{
    beforeEach(() =>{
         cy.visit('/')
         cy.fazerLoginComCredenciaisValidas()
    })

    it ('Deve transferir quando informo dados e valor validos', () =>{

        //Act
        cy.realizarTransferencias('Maria Oliveira','João da Silva','11')

        //Assert
        cy.verificarMensagemNoToast('Transferência realizada!')
    
    })

     it ('Deve  apresentar erro ao tentar transferir  valor maior do que R$ 5mil sem token', () =>{

        //Act
        cy.realizarTransferencias('Maria Oliveira','João da Silva','6000')
        
        //Assert
        cy.verificarMensagemNoToast('Transferência realizada!')
    
    })
 })
