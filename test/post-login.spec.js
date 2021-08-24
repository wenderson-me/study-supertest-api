const supertest = require('supertest');
const chai = require('chai');
const faker = require('faker/locale/pt_BR');

const request = supertest('http://localhost:3000')

const rotaLogin = '/login'
const rotaUsuario = '/usuarios'

describe.only('validar autenticação do usuário', () => {

  it('Usuario com dados validos deve fazer login com sucesso', async () => {

    const usuario = {
      nome: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: `${faker.datatype.boolean()}`
    }

    const { body: createUser } = await request.post(rotaUsuario).send(usuario).expect(201)

    const { body } = await request.post(rotaLogin).send(
      {
        email: usuario.email,
        password: usuario.password
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
        email: "invla@gmail.com",
        password: "invalid12345"
      }
    )
    chai.assert.deepEqual(body, {
      "message": "Email e/ou senha inválidos"
    })
  })
});