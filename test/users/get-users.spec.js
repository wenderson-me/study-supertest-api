const supertest = require('supertest');
const chai = require('chai');

const request = supertest('http://localhost:3000')

const rotaUsuarios = '/usuarios'

describe('Validar get no endpoint' + rotaUsuarios, () => {
  it('Validar retorno com sucesso ao utilizar query string', async () => {
    const { body } = await request.get(rotaUsuarios).query({ _id: '0uxuPY0cbmQhpEz1' }).expect(200)
    chai.assert.deepEqual(body, {
      quantidade: 1,
      usuarios: [
        {
          "nome": "Fulano da Silva",
          "email": "fulano@qa.com",
          "password": "teste",
          "administrador": "true",
          "_id": "0uxuPY0cbmQhpEz1"
        }
      ]
    })
  });

  it('Nenhum usuário encontrado ao utilizar _id inexistente na query string', async () => {
    const { body } = await request.get(rotaUsuarios).query({ _id: 'A' }).expect(200)
    chai.assert.deepEqual(body, {
      "quantidade": 0,
      "usuarios": []
    })
  });

  it('Mensagem de erro ao utilizar chave inexistente na query string', async () => {
    const { body } = await request.get(rotaUsuarios).query({ _id: '0uxuPY0cbmQhpEz1', inexistente: 'a' }).expect(400)
    chai.assert.deepEqual(body, {
      "inexistente": "inexistente não é permitido"
    })
  });
})