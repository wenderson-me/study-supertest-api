const supertest = require('supertest');
const chai = require('chai');
const { assert } = require('chai');

const request = supertest('http://localhost:3000')

const rotaLogin = '/login'

describe.only('validar autenticação do usuário', () => {

  it.only('Usuario com dados validos fazer login com sucesso', async () => {

    const { body } = await request.post(rotaLogin).send(
      {
        "email": "fulano@qa.com",
        "password": "teste"
      }
    ).expect(200)
    chai.assert.deepEqual(body, {
      "message": "Login realizado com sucesso",
      authorization: body.authorization
    })
  });

  it('Usuario com dados invalidos não faz login', async () => {
    const { body } = await request.post(rotaLogin).send(
      {
        "email": "fulano@q.com",
        "password": "9838943"
      }
    )
    chai.assert.deepEqual(body, {
      "message": "Email e/ou senha inválidos"
    })
  })

  /*
  it.only('Usuário com email invalido', async () => {
    const { body } = await request.post(rotaLogin).send(
      {
        "email": "fulano@qa",
        "password": "teste"
      }
    )
    chai.assert.deepEqual(body, {
      "email": "email deve ser um email válido"
    })
  })
  */
});