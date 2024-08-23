describe('Teste de Front-end Checkboxes', () => {
  //Cria uma constante webPage para alocar o site
  const webPage = 'https://the-internet.herokuapp.com/checkboxes'
  //Cria duas constantes para alocar o ID das checkboxes
  const checkbox1 = '#checkboxes > :nth-child(1)'
  const checkbox2 = '#checkboxes > :nth-child(3)'
  it('Deve preencher a checkbox 1', () => {
    cy.log('Visita o site')
    cy.visit(webPage)

    cy.log('Verifica se a checkbox 1 não está marcada')
    cy.get(checkbox1).should('not.be.checked')

    cy.log('Marca a checkbox 1')
    cy.get(checkbox1).check()
  });
  it('Deve desmarcar a checkbox 2', () => {
    cy.log('Visita o site')
    cy.visit(webPage)

    cy.log('Verifica que a segunda checkbox já está marcada')
    cy.get(checkbox2).should('be.checked')

    cy.log('Desmarca a checkbox 2')
    cy.get(checkbox2).uncheck()
  });
  it('Deve alternar e cadenciar o preenchimento das checkboxes 1 e 2 por 10 vezes', () => {
    cy.log('Visita o site')
    cy.visit(webPage)

    cy.log('Verifica que a segunda checkbox já está marcada')
    cy.get(checkbox2).should('be.checked')

    cy.log('Loop para sequenciar a marcação das checkboxes')
    for (let i = 0; i < 10; i++) {
      cy.log('Marca as checkboxes 1 e 2')
      cy.get(checkbox1).check().should('be.checked')
      cy.get(checkbox2).check().should('be.checked')

      cy.log('Desmarca as checkboxes 1 e 2')
      cy.get(checkbox1).uncheck().should('not.be.checked')
      cy.get(checkbox2).uncheck().should('not.be.checked')
    }
  });
});

describe('Teste de Front-end Drag and Drop', () => {
  //Cria uma constante webPage para alocar o site
  const webPage = 'https://the-internet.herokuapp.com/drag_and_drop'
  //Cria duas constantes para alocar o ID das colunas
  const colunaA = '#column-a'
  const colunaB = '#column-b'
  //Cria uma constante DataTransfer
  const dataTransfer = new DataTransfer
  it('Deve clicar, segurar e arrastar a coluna A para a coluna B', () => {
    cy.log('Visita o site')
    cy.visit(webPage)

    cy.log('Verifica se a coluna A contém a coluna A')
    cy.get(colunaA)
      .should('have.text', 'A')

    cy.log('Simula a função drag sobre a coluna A')
    cy.get(colunaA).trigger('dragstart', { dataTransfer })

    cy.log('Simula a função drop sobre a coluna B')
    cy.get(colunaB).trigger('drop', { dataTransfer })

    cy.log('Termina a função drag sobre a coluna B')
    cy.get(colunaB).trigger('dragend')

    cy.log('Verifica se a coluna B contém a coluna A')
    cy.get(colunaB)
      .should('have.text', 'A')
  });
  it('Deve clicar, segurar e arrastar a coluna A para a coluna B', () => {
    cy.log('Visita o site')
    cy.visit(webPage)

    cy.log('Verifica se a coluna B contém a coluna B')
    cy.get(colunaB)
      .should('have.text', 'B')

    cy.log('Simula a função drag sobre a coluna B')
    cy.get(colunaB).trigger('dragstart', { dataTransfer })

    cy.log('Simula a função drop sobre a coluna A')
    cy.get(colunaA).trigger('drop', { dataTransfer })

    cy.log('Termina a função drag sobre a coluna A')
    cy.get(colunaA).trigger('dragend')

    cy.log('Verifica se a coluna A contém a coluna B')
    cy.get(colunaA)
      .should('have.text', 'B')
  });
  it('Deve alterar e cadenciar as colunas A e B entre si', () => {
    cy.log('Visita o site')
    cy.visit(webPage)

    cy.log('Verifica se a coluna A contém a coluna A')
    cy.get(colunaA)
      .should('have.text', 'A')

    cy.log('Loop para sequenciar as colunas')
    for (let i = 0; i < 10; i++) {
      cy.log('Simula a função drag sobre a coluna B')
      cy.get(colunaB).trigger('dragstart', { dataTransfer })

      cy.log('Simula a função drop sobre a coluna A')
      cy.get(colunaA).trigger('drop', { dataTransfer })

      cy.log('Termina a função drag sobre a coluna A')
      cy.get(colunaA).trigger('dragend')

      cy.log('Verifica se a coluna A contém A ou B cada vez que realiza a ação de drag and down')
      cy.get(colunaA)
        .invoke('text')
        .should('be.oneOf', ['A', 'B'])
    }
  });
});

describe('Teste de Front-End DropDown', () => {
  //Cria uma constante webPage para alocar o site
  const webPage = 'https://the-internet.herokuapp.com/dropdown'
  //Cria duas constantes para alocar o ID das listas
  const checkbox1 = '#checkboxes > :nth-child(1)'
  const checkbox2 = '#checkboxes > :nth-child(3)'
  it('Deve selecionar a opção 1', () => {
    cy.log('Visita o site')
    cy.visit(webPage)

    cy.log('Seleciona a opção 1 e confere o resultado')
    cy.get('#dropdown').select('Option 1')
      .should('have.value', '1')
  });
  it('Deve selecionar a opção 1', () => {
    cy.log('Visita o site')
    cy.visit(webPage)

    cy.log('Seleciona a opção 2 e confere o resultado')
    cy.get('#dropdown').select('Option 2')
      .should('have.value', '2')
  });
});

describe('Teste de Front-end Upload File', () => {
  //Cria uma constante webPage para alocar o site
  const webPage = 'https://the-internet.herokuapp.com/upload'
  it('Deve fazer upload de uma imagem', () => {
    cy.log('Visita o site')
    cy.visit(webPage)

    cy.log('Faz upload de uma imagem')
    cy.get('#file-upload')
      .click()
      .selectFile('cialLogo.JPG')

    cy.log('Clica em fazer upload e procede o arquivo')
    cy.get('#file-submit').click()

    cy.log('Verifica se o upload foi bem-sucedido')
    cy.get('h3')
      .should('have.text', 'File Uploaded!')
  });
  it('Deve clicar em Upload sem selecionar um arquivo', () => {
    cy.log('Visita o site')
    cy.visit(webPage)

    cy.log('Clica em fazer upload sem proceder o arquivo')
    cy.get('#file-submit').click()

    cy.log('Verifica se a página avançou sem fazer upload de arquivo')
    cy.get('h1')
      .should('have.text', 'Internal Server Error')
  });
  it('Deve fazer upload de um arquivo PDF', () => {
    cy.log('Visita o site')
    cy.visit(webPage)

    cy.log('Faz upload de um arquivo PDF')
    cy.get('#file-upload')
      .click()
      .selectFile('testePratico.pdf')

    cy.log('Clica em fazer upload e procede o arquivo')
    cy.get('#file-submit').click()

    cy.log('Verifica se o upload foi bem-sucedido')
    cy.get('h3')
      .should('have.text', 'File Uploaded!')
  });
});

describe('Teste Front-end Login Page', () => {
  //Cria uma constante webPage para alocar o site
  const webPage = 'https://the-internet.herokuapp.com/login'
  it('Deve validar login', () => {
    cy.log('Visita o site')
    cy.visit(webPage)

    cy.log('Preenche os campos usuário e senha')
    cy.get('#username').type('tomsmith')
    cy.get('#password').type('SuperSecretPassword!')

    cy.log('Clica em Login')
    cy.get('.radius').click()

    cy.log('Verifica se o login foi bem-sucedido')
    cy.get('h2')
      .should('contain.text', 'Secure Area')
  });
  it('Deve validar login e deslogar', () => {
    cy.log('Visita o site')
    cy.visit(webPage)

    cy.log('Preenche os campos usuário e senha')
    cy.get('#username').type('tomsmith')
    cy.get('#password').type('SuperSecretPassword!')

    cy.log('Clica em Login')
    cy.get('.radius').click()

    cy.log('Verifica se o login foi bem-sucedido')
    cy.get('h2')
      .should('contain.text', 'Secure Area')

    cy.log('Clica em Logout')
    cy.get('.button').click()

    cy.log('Valida o Logout')
    cy.get('h2')
      .should('contain.text', 'Login Page')
  });
  it('Deve digitar campo usuário com entrada invalida/errada', () => {
    cy.log('Visita o site')
    cy.visit(webPage)

    cy.log('Preenche os campos usuário (invalido) e senha')
    cy.get('#username').type('tomsmithh')
    cy.get('#password').type('SuperSecretPassword!')

    cy.log('Clica em Login')
    cy.get('.radius').click()

    cy.log('Verifica se o login foi bem-sucedido')
    cy.get('#flash-messages')
      .should('contain.text', 'Your username is invalid!')
  });
  it('Deve digitar campo senha com entrada invalida/errada', () => {
    cy.log('Visita o site')
    cy.visit(webPage)

    cy.log('Preenche os campos usuário e senha')
    cy.get('#username').type('tomsmith')
    cy.get('#password').type('SuperSecretPassword')

    cy.log('Clica em Login')
    cy.get('.radius').click()

    cy.log('Verifica se o login foi bem-sucedido')
    cy.get('#flash-messages')
      .should('contain.text', 'Your password is invalid!')
  });
  it('Deve clicar em Login sem digitar nenhum campo', () => {
    cy.log('Visita o site')
    cy.visit(webPage)

    cy.log('Clica em Login')
    cy.get('.radius').click()

    cy.log('Verifica se o login foi bem-sucedido')
    cy.get('#flash-messages')
      .should('contain.text', 'Your username is invalid!')
  });
});
describe('Teste Front-end Redirect link/Status Code', () => {
  //Cria uma constante webPage para alocar o site
  const webPage = 'https://the-internet.herokuapp.com/redirector'
  it('Deve clicar no link e no subsequente e redirecionar para mensagem de status 200', () => {
    cy.log('Visita o site')
    cy.visit(webPage)

    cy.log('Clica em redirect para validar redirecionamento')
    cy.get('#redirect').click()

    cy.log('Clica em 200 para redirecionar')
    cy.get(':nth-child(1) > a').click()

    cy.log('Valida o redirecionamento e exibe o codigo de status 200')
    cy.get('p').should('contain.text', 'This page returned a 200 status code.')
  });
  it('Deve clicar no link e no subsequente e redirecionar para mensagem de status 301', () => {
    cy.log('Visita o site')
    cy.visit(webPage)

    cy.log('Clica em redirect para validar redirecionamento')
    cy.get('#redirect').click()

    cy.log('Clica em 301 para redirecionar')
    cy.get('ul > :nth-child(2) > a').click()

    cy.log('Valida o redirecionamento e exibe o codigo de status 301')
    cy.get('p').should('contain.text', 'This page returned a 301 status code.')
  });
  it('Deve clicar no link e no subsequente e redirecionar para mensagem de status 404', () => {
    cy.log('Visita o site')
    cy.visit(webPage)

    cy.log('Clica em redirect para validar redirecionamento')
    cy.get('#redirect').click()

    cy.log('Clica em 404 para redirecionar')
    cy.get(':nth-child(3) > a').click()

    cy.log('Valida o redirecionamento e exibe o codigo de status 404')
    cy.get('p').should('contain.text', 'This page returned a 404 status code.')
  });
  it('Deve clicar no link e no subsequente e redirecionar para mensagem de status 500', () => {
    cy.log('Visita o site')
    cy.visit(webPage)

    cy.log('Clica em redirect para validar redirecionamento')
    cy.get('#redirect').click()

    cy.log('Clica em 500 para redirecionar')
    cy.get(':nth-child(4) > a').click()

    cy.log('Valida o redirecionamento e exibe o codigo de status 500')
    cy.get('p').should('contain.text', 'This page returned a 500 status code.')
  });
});