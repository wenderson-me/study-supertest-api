const supertest = require('supertest');
const chai = require('chai');
const faker = require('faker/locale/pt_BR')

const request = supertest('http://localhost:3000')

const rotaUsuarios = '/usuarios'

describe('Validar get no endpoint' + rotaUsuarios, () => {
  it('Validar retorno com sucesso ao utilizar query string', async () => {

    const usuario = {

      nome: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: faker.datatype.boolean()
    }
    const { body: bodyUsuario } = await request.post(rotaUsuarios).send(usuario).expect(201)

    const { body } = await request.get(rotaUsuarios).query({ _id: bodyUsuario._id }).expect(200)
    chai.assert.deepEqual(body, {
      quantidade: 1,
      usuarios: [
        {
          nome: usuario.nome,
          email: usuario.email,
          password: usuario.password,
          administrador: usuario.administrador,
          _id: bodyUsuario._id
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