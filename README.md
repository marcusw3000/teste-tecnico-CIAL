# Cypress Test Suite

Este projeto contém um conjunto de testes automatizados utilizando o Cypress, voltados para garantir a funcionalidade adequada de endpoints de uma API RESTful e a verificação de elementos de front-end. Os testes estão organizados em dois arquivos principais: testeBackEnd.cy.js e testeFrontEnd.cy.js.

## Tecnologias utilizadas

**Framework de testes:** Cypress

**Outras:** Node, Docker

## Estrutura dos arquivos

1. testeBackEnd.cy.js

Este arquivo contém testes focados no back-end da aplicação, interagindo diretamente com a API.
```
 Teste Back-end Listar todos os celulares
     Deve LISTAR todos os celulares
     Deve retornar erro ao ler endpoint correto com ID inexistente

  Teste Back-end IDs especificos
     Deve LISTAR todos os celulares com IDs especificos

  Teste Back-end Listar celular por ID
     Deve LISTAR um celular a partir de um ID

  Teste Back-end Atualizar um campo específico
     Deve ATUALIZAR um campo especifico

  Teste Back-end Cadastrar um celular
     Deve CRIAR um novo celular/MacBook Pro 16
     Deve CRIAR novo celular/Iphone 15 Pro Max
     Deve CRIAR novo celular/Apple Watch Series 9

  Teste Back-end Cadastrar e Deletar um mesmo celular
     Deve CRIAR novo celular/Iphone 15
     Deve DELETAR um celular

  Teste Back-end Cadastrar e Atualizar um mesmo celular
     Deve CRIAR novo celular/Iphone 15
     Deve ATUALIZAR os dados do celular criado acima
```

2. testeFrontEnd.cy.js

Este arquivo é focado nos testes de front-end, onde o Cypress interage com a interface do usuário para verificar a funcionalidade de elementos como checkboxes, inputs, e botões.

```
  Teste de Front-end Checkboxes
     Deve preencher a checkbox 1
     Deve desmarcar a checkbox 2
     Deve alternar e cadenciar o preenchimento das checkboxes 1 e 2 por 10 vezes

  Teste de Front-end Drag and Drop
     Deve clicar, segurar e arrastar a coluna A para a coluna B
     Deve clicar, segurar e arrastar a coluna A para a coluna B
     Deve alterar e cadenciar as colunas A e B entre si

  Teste de Front-End DropDown
     Deve selecionar a opção 1
     Deve selecionar a opção 2

  Teste de Front-end Upload File
     Deve fazer upload de uma imagem
     Deve clicar em Upload sem selecionar um arquivo
     Deve fazer upload de um arquivo PDF

  Teste Front-end Login Page
     Deve validar login
     Deve validar login e deslogar
     Deve digitar campo usuário com entrada invalida/errada
     Deve digitar campo senha com entrada invalida/errada
     Deve clicar em Login sem digitar nenhum campo

  Teste Front-end Redirect link/Status Code
     Deve clicar no link e no subsequente e redirecionar para mensagem de status 200
     Deve clicar no link e no subsequente e redirecionar para mensagem de status 301
     Deve clicar no link e no subsequente e redirecionar para mensagem de status 404
     Deve clicar no link e no subsequente e redirecionar para mensagem de status 500
```

## Estrutura do Dockerfile

```
FROM cypress/included:13.12.0

RUN mkdir /testeTecnico

WORKDIR /testeTecnico

COPY ./package.json .
COPY ./cypress.json .
COPY ./cialLogo.jpg .
COPY ./testePratico.pdf ./
RUN npm install

COPY . .

CMD ["npx", "cypress", "run"]
```

## Instalação

1-Clone este repositório.

2-Navegue até o diretório do projeto e execute o comando:

```bash
npm install
```

## Executando os Testes

3-Para executar todos os testes, utilize o comando: (Isso abrirá a interface do Cypress, onde você pode selecionar os arquivos de teste que deseja executar.)
```
npx cypress open
```
4-Alternativamente, você pode executar os testes em modo headless com:
```
npx cypress run
```

## Arquivos necessários

Os arquivos listados abaixo, localizados na pasta raiz, são essenciais para a execução dos testes e, portanto, são imprescindíveis.

```
cialLogo.jpg
testePratico.pdf
```

## Notas Adicionais

Identifiquei que os testes de Back-end as vezes retornam testes negativos devido a um problema de rota entre os servidores e os requests. Caso isso aconteça, por favor, desconsidere o teste e execute novamente.

## Evidências

Teste de Back-end

![image](https://github.com/user-attachments/assets/c5b211e7-ec43-4169-a0cd-d546d71100c7)


Teste de Front-end

![image](https://github.com/user-attachments/assets/7eb7f92d-e968-40ae-91a6-941def207a81)


