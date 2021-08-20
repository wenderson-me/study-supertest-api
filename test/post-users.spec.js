const supertest = require('supertest');
const chai = require('chai');

const request = supertest('http://localhost:3000')

const rotaUsuarios = '/usuarios'

describe.only('Validar verbo POST no endpoint' + rotaUsuarios, () => {
  it('Cadastro com sucesso de novo usuário', async () => {
    const { body } = await request.post(rotaUsuarios)
      .send(
        {
          "nome": "Wendy",
          "email": "wendy@qa.com",
          "password": "teste",
          "administrador": "true"
        }
      ).expect(201)
    chai.assert.deepEqual(body, {
      "message": "Cadastro realizado com sucesso",
      _id: body._id
    })
  });
})
