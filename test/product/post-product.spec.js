const chai = require('chai');
const faker = require('faker/locale/pt_BR');

const rotaProdutos = '/produtos'

describe('Validar verbo POST no endpoint' + rotaProdutos, () => {
  it('Cadastro com sucesso de novo produto', async () => {
    const { body: bodyLogin } = await request.post('/login')
      .send(
        {
          email: "fulano@qa.com",
          password: "teste",
        }
      ).expect(200)
    const { body } = await request.post(rotaProdutos).send({
      nome: faker.commerce.product(),
      preco: faker.commerce.price(),
      descricao: faker.commerce.productDescription(),
      quantidade: faker.datatype.number()
    }).set('authorization', bodyLogin.authorization).expect(201)
    console.log(bodyLogin)
    console.log(body)
    chai.assert.deepEqual(body,
      {
        message: "Cadastro realizado com sucesso",
        _id: body._id
      }
    )
  })
})
