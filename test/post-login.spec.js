const supertest = require('supertest');
const chai = require('chai');

const request = supertest('http://localhost:3000')

const rotaLogin = '/login'

describe('validar autenticação do usuário', () => {

  it('Usuario com dados validos deve fazer login com sucesso', async () => {

    const { body } = await request.post(rotaLogin).send(
      {
        "email": "wendy@qa.com",
        "password": "teste"
      }
    ).expect(200)
    chai.assert.deepEqual(body, {
      "message": "Login realizado com sucesso",
      authorization: body.authorization
    })
  });

  it('Usuario com dados invalidos não deve fazer login', async () => {
    const { body } = await request.post(rotaLogin).send(
      {
        "email": "fulano@q.com",
        "password": "12345678"
      }
    )
    chai.assert.deepEqual(body, {
      "message": "Email e/ou senha inválidos"
    })
  })

  /*
  it('Usuário com email invalido', async () => {
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