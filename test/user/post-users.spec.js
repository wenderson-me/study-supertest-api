const chai = require('chai');
const faker = require('faker/locale/pt_BR');

const rotaUsuarios = '/usuarios'

describe('Validar verbo POST no endpoint' + rotaUsuarios, () => {
  it('Cadastro com sucesso de novo usuário', async () => {
    const { body } = await request.post(rotaUsuarios)
      .send(
        {
          nome: `${faker.name.firstName()} ${faker.name.lastName()}`,
          email: faker.internet.email(),
          password: faker.internet.password(),
          administrador: `${faker.datatype.boolean()}`
        }
      ).expect(201)
    chai.assert.deepEqual(body, {
      "message": "Cadastro realizado com sucesso",
      _id: body._id
    })
  });

  it('Impedir cadastro de usuário com dados insuficientes', async () => {
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

  it('Impedir cadastro de um usuário com email já existente', async () => {

    const user = {
      nome: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: `${faker.datatype.boolean()}`
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
