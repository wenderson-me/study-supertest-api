const supertest = require('supertest');
const chai = require('chai');
const { assert } = require('chai');

const request = supertest('http://localhost:3000')

const rotaLogin = '/login'

describe('validar autenticação do usuário', () => {

  it('Validar usuário autenticado com sucesso', async () => {

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
});