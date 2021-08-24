const supertest = require('supertest');
const chai = require('chai');
const faker = require('faker');

const request = supertest('http://localhost:3000')

const rotaUsuarios = '/usuarios'

describe('Validar verbo POST no endpoint' + rotaUsuarios, () => {
  it('Cadastro com sucesso de novo usuário', async () => {
    const { body } = await request.post(rotaUsuarios)
      .send(
        {
          nome: "Wendy",
          email: "wendy@qa.com",
          password: "teste",
          administrador: "true"
        }
      ).expect(201)
    chai.assert.deepEqual(body, {
      "message": "Cadastro realizado com sucesso",
      _id: body._id
    })
  });

  it('Cadastro de um novo usuário com dados insuficientes', async () => {
    const { body } = await request.post(rotaUsuarios)
      .send(
        {
          inexistente: '1'
        }
      ).expect(400)
    //console.log(body)
    chai.assert.deepEqual(body, {
      nome: 'nome é obrigatório',
      email: 'email é obrigatório',
      password: 'password é obrigatório',
      administrador: 'administrador é obrigatório',
      inexistente: 'inexistente não é permitido'
    })
  })

  it.only('Cadastro de um usuário com email já existente', async () => {

    const user = {
      nome: "kim lip",
      email: "kimlip@gmail.com",
      password: "kimlip12343",
      administrador: "true"
    }

    const { body: bodyUser } = await request.post(rotaUsuarios).send(user).expect(201)

    const { body } = await request.post(rotaUsuarios).send({
      nome: user.nome,
      email: user.email,
      password: user.password,
      administrador: user.administrador
    }).expect(400)
    chai.assert.deepEqual(body, {
      "message": "Este email já está sendo usado"
    })
  });
})
