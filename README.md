# Testes automatizados da aplicação web do Banco

Projeto de testes end-to-end com Cypress e JavaScript, criado para demonstrar aos alunos da **Mentoria 2.0** como estruturar e automatizar testes de uma aplicação web. Os fluxos reutilizam Custom Commands para reduzir repetição e facilitar a leitura dos cenários.

## Componentes do projeto

- **Cypress**: framework que executa os testes end-to-end no navegador.
- **cypress-mochawesome-reporter**: gera relatórios HTML dos resultados.
- **Testes E2E** (`cypress/e2e/`): cenários de login e transferência.
- **Custom Commands** (`cypress/support/commands/`): ações e verificações reutilizáveis pelos testes.
- **Fixture** (`cypress/fixtures/credenciais.json`): credenciais válidas e inválidas usadas nos cenários de login.
- **Configuração** (`cypress.config.js`): define a URL base da aplicação (`http://localhost:4000`), o reporter e a integração com o Cypress.

## Pré-requisitos

- Node.js e npm instalados.
- A API [banco-api](https://github.com/juliodelimas/banco-api) e a aplicação web [banco-web](https://github.com/juliodelimas/banco-web) clonadas, instaladas e em execução.
- A aplicação web acessível em `http://localhost:4000`, conforme a URL base configurada no Cypress. Consulte as instruções de cada repositório para instalar e iniciar a API e a aplicação.

> Inicie a API e a aplicação web antes de abrir ou executar os testes. Os testes não iniciam esses serviços automaticamente.

## Instalação e execução

1. Clone este repositório e entre na pasta do projeto:

   ```bash
   git clone https://github.com/carlapatara49-prog/banco-web-tests.git
   cd banco-web-tests
   ```

2. Instale as dependências listadas em `package.json`:

   ```bash
   npm install
   ```

3. Em terminais separados, inicie a API e a aplicação web seguindo as instruções dos respectivos repositórios. Confirme que a aplicação web está disponível em `http://localhost:4000`.

4. Execute os testes de uma das formas abaixo:

   ```bash
   # Abre a interface do Cypress para selecionar e executar os testes
   npm run cy:open

   # Executa todos os testes em modo headless
   npm test

   # Executa os testes em modo headed, exibindo o navegador
   npm run cy:headed
   ```

Os comandos `npm test` e `npm run cy:headed` executam os testes com o Cypress pela linha de comando; o segundo exibe o navegador durante a execução.

## Testes automatizados

### Login — `cypress/e2e/login.cy.js`

Antes de cada cenário, o teste visita a página inicial e tira uma captura de tela. São cobertos:

- **Login com dados válidos**: realiza o login e verifica que o título “Realizar Transferência” fica visível.
- **Login com dados inválidos**: tenta entrar com credenciais inválidas e verifica a mensagem “Erro no login. Tente novamente.”.

As credenciais usadas são carregadas da fixture `cypress/fixtures/credenciais.json`.

### Transferências — `cypress/e2e/transferencias.cy.js`

Antes de cada cenário, o teste visita a página inicial e realiza login com credenciais válidas. São cobertos:

- **Transferência válida**: transfere `11` da conta Priscila para a conta Julio e verifica a mensagem “Transferência realizada!”.
- **Transferência acima de R$ 5.000 sem token**: tenta transferir `6000` e verifica a mensagem de que é necessária autenticação para esse valor.

## Custom Commands

Os comandos são registrados em `cypress/support/commands.js`, que importa os arquivos da pasta `cypress/support/commands/`. O suporte E2E (`cypress/support/e2e.js`) carrega esses comandos e registra o reporter.

| Comando | Arquivo | Uso e comportamento |
| --- | --- | --- |
| `cy.verificarMensagemNoToast(mensagem)` | `common.js` | Verifica se o elemento `.toast` contém exatamente o texto informado. |
| `cy.selecionarOpcaoNaCombobox(labelDoCampo, opcao)` | `common.js` | Localiza o campo pelo `for` do `label`, abre a combobox e seleciona a opção indicada. |
| `cy.fazerLoginComCredenciaisValidas()` | `login.js` | Lê `valida.usuario` e `valida.senha` da fixture e envia o formulário de login. |
| `cy.fazerLoginComCredenciaisInvalidas()` | `login.js` | Lê `invalida.usuario` e `invalida.senha` da fixture e envia o formulário de login. |
| `cy.realizarTransferencia(contaOrigem, contaDestino, valor)` | `transferencias.js` | Seleciona as contas de origem e destino, preenche o valor e clica em “Transferir”. |

## Relatórios e capturas de tela

O reporter `cypress-mochawesome-reporter` é configurado em `cypress.config.js` e registrado em `cypress/support/e2e.js`. Após a execução, o relatório HTML fica em `cypress/reports/html/index.html`.

Os testes de login também salvam capturas de tela ao visitar a página inicial. O Cypress pode salvar capturas adicionais quando um teste falha. Esses arquivos ficam em `cypress/screenshots/` (e podem ser incluídos no relatório). A gravação de vídeos está desativada na configuração (`video: false`).
