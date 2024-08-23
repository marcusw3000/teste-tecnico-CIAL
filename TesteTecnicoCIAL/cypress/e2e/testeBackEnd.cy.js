describe('Teste Back-end Listar todos os celulares', () => {
    it('Deve LISTAR todos os celulares', () => {
        cy.log('Acessa um endpoit por metodo GET e lista todos os celulares')
        cy.request('GET', 'https://api.restful-api.dev/objects')
            .then((response) => {
                cy.log('Verifica se o status da resposta é 200')
                expect(response.status).to.eq(200);

                cy.log('Filtra e lista todos os celulares por nome')
                const celulares = response.body.filter(item => {
                    const name = item.name.toLowerCase();
                    return name.includes('pixel') || name.includes('iphone') || name.includes('samsung');
                });

                cy.log('Verifica se encontrou celulares')
                expect(celulares).to.have.length.greaterThan(0);

                cy.log('Celulares encontrados:', celulares);
            });
    });
    it('Deve retornar erro ao ler endpoint correto com ID inexistente', () => {
        cy.log('Acessa um endpoint com ID inexistente usando o Metodo GET e evita que o Cypress falhe em respostas de erro')
        cy.request({
            method: 'GET',
            url: 'https://api.restful-api.dev/objects/9999999999',
            failOnStatusCode: false
        }).then((response) => {

            cy.log('Verifica se o status da resposta é 404')
            expect(response.status).to.eq(404);
        });
    });
});

describe('Teste Back-end IDs especificos', () => {
    it('Deve LISTAR todos os celulares com IDs especificos', () => {
        const expectedIds = ["3", "5", "10"];

        cy.request('GET', 'https://api.restful-api.dev/objects?id=3&id=5&id=10')
            .then((response) => {
                cy.log('Verifica se o status da resposta é 200')
                expect(response.status).to.eq(200);

                cy.log('Cria uma constante e verifica se os celulares retornados tem os IDs esperados')
                const returnedIds = response.body.map(item => item.id);
                expect(returnedIds).to.include.members(expectedIds);

                cy.log('Verifica se todos os IDs esperados foram retornado')
                expect(returnedIds).to.have.length(expectedIds.length);

                cy.log('Celulares encontrados:', response.body);
            });
    });
});

describe('Teste Back-end Listar celular por ID', () => {
    it('Deve LISTAR um celular a partir de um ID', () => {
        cy.log('Cria uma constante para verificar se o ID corresponde ao final')
        const dadosEsperados = {
            id: "7",
            name: "Apple MacBook Pro 16",
            data: {
                year: 2019,
                price: 1849.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB"
            }
        };
        cy.log('Acessa um endpoint com ID especifica usando o Metodo GET e evita que o Cypress falhe em respostas de erro')
        cy.request({
            method: 'GET',
            url: 'https://api.restful-api.dev/objects/7',
            failOnStatusCode: false
        }).then((response) => {

            cy.log('Verifica se o status da resposta é 200')
            expect(response.status).to.eq(200);

            cy.log('Verifica se os dados obtidos correspondem com o esperado')
            expect(response.body).to.deep.eq(dadosEsperados);
        });
    });
});

describe('Teste Back-end Atualizar um campo específico', () => {
    it('Deve ATUALIZAR um campo especifico', () => {
        it('should update the details of a cellphone', () => {
            cy.log('Cria uma constante para validar o processo de atualizaçao do campo nela contida')
            const att = {
                name: "Apple MacBook Pro 16 (Updated Name)"
            };

            cy.log('Acessa um endpoint com ID especifica usando o Metodo PUT e atualiza o campo nome')
            cy.request('PATCH', 'https://api.restful-api.dev/objects/7', att)
                .then((response) => {
                    cy.log('Verifique se o status da resposta é 200')
                    expect(response.status).to.eq(200);

                    cy.log('Verifica se os dados atualizados estão corretos')
                    expect(response.body).to.deep.eq(att);
                });
        });
    });
});

describe('Teste Back-end Cadastrar um celular', () => {
    it('Deve CRIAR um novo celular/MacBook Pro 16', () => {
        const novoObjeto = {
            "name": "Apple MacBook Pro 16",
            "data": {
                "year": 2019,
                "price": 1849.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB"
            }
        };

        cy.request('POST', 'https://api.restful-api.dev/objects', novoObjeto)
            .then((response) => {
                cy.log('Verifique se o status da resposta é 200')
                expect(response.status).to.eq(200);

                cy.log('Verifica se os dados atualizados estão corretos')
                expect(response.body).to.deep.include(novoObjeto);
            });
    });
    it('Deve CRIAR novo celular/Iphone 15 Pro Max', () => {
        const novoObjeto = {
            "name": "Iphone 15 Pro Max",
            "data": {
                "color": "Cloudy White",
                "price": 1199.99,
                "capacity GB": "256"
            }
        };

        cy.request('POST', 'https://api.restful-api.dev/objects', novoObjeto)
            .then((response) => {
                cy.log('Verifique se o status da resposta é 200')
                expect(response.status).to.eq(200);

                cy.log('Verifica se os dados atualizados estão corretos')
                expect(response.body).to.deep.include(novoObjeto);
            });
    });
    it('Deve CRIAR novo celular/Apple Watch Series 9', () => {
        const novoObjeto = {
            "name": "Apple Watch Series 9",
            "data": {
                "Strap Colour": "Elderberry",
                "price": 399.99,
                "Case Size": "41mm"
            }
        };

        cy.request('POST', 'https://api.restful-api.dev/objects', novoObjeto)
            .then((response) => {
                cy.log('Verifique se o status da resposta é 200')
                expect(response.status).to.eq(200);

                cy.log('Verifica se os dados atualizados estão corretos')
                expect(response.body).to.deep.include(novoObjeto);
            });
    });
});
describe('Teste Back-end Cadastrar e Deletar um mesmo celular', () => {
    //Cria uma variavel para alocar a ID do celular criado
    let idCel;
    it('Deve CRIAR novo celular/Iphone 15', () => {
        const novoObjeto = {
            "name": "Iphone 15",
            "data": {
                "color": "Cloudy White",
                "price": 999.99,
                "capacity GB": "256"
            }
        };

        cy.request('POST', 'https://api.restful-api.dev/objects', novoObjeto)
            .then((response) => {
                cy.log('Verifique se o status da resposta é 200')
                expect(response.status).to.eq(200);

                cy.log('Aloca o ID gerado na variavel')
                idCel = response.body.id;

                cy.log('Verifica se os dados atualizados estão corretos')
                expect(response.body).to.deep.include(novoObjeto);
            });
    });
    it('Deve DELETAR um celular', () => {
        cy.request('DELETE', 'https://api.restful-api.dev/objects/' + idCel)
            .then((response) => {
                cy.log('Verifica se o status da resposta é 200')
                expect(response.status).to.eq(200);

                cy.log('Tenta buscar o celular deletado e verificar se ele não existe mais')
                cy.request({
                    method: 'GET',
                    url: 'https://api.restful-api.dev/objects/' + idCel,
                    failOnStatusCode: false
                }).then((getResponse) => {
                    expect(getResponse.status).to.eq(404);
                });
            });
    });
});
describe('Teste Back-end Cadastrar e Atualizar um mesmo celular', () => {
    //Cria uma variavel para alocar a ID do celular criado
    let idCel;
    it('Deve CRIAR novo celular/Iphone 15', () => {
        const novoObjeto = {
            "name": "Apple MacBook Pro 16",
            "data": {
                "year": 2019,
                "price": 1849.99,
                "CPU model": "Inter Core I9",
                "Hard disk size": "1 TB"
            }
        };

        cy.request('POST', 'https://api.restful-api.dev/objects', novoObjeto)
            .then((response) => {
                cy.log('Verifique se o status da resposta é 200')
                expect(response.status).to.eq(200);

                cy.log('Aloca o ID gerado na variavel')
                idCel = response.body.id;

                cy.log('Verifica se os dados atualizados estão corretos')
                expect(response.body).to.deep.include(novoObjeto);
            });
    });
    it('Deve ATUALIZAR os dados do celular criado acima', () => {
        const dadosAtualizados = {
            "name": "Apple MacBook Pro 16",
            "data": {
                "year": 2019,
                "price": 2049.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB",
                "color": "silver"
            }
        };

        cy.request('PUT', 'https://api.restful-api.dev/objects/' + idCel, dadosAtualizados)
            .then((response) => {
                // Verifique se o status da resposta é 200 (OK)
                expect(response.status).to.eq(200);

                // Verifique se os dados atualizados estão corretos
                expect(response.body).to.deep.include(dadosAtualizados);
            });
    });
});
