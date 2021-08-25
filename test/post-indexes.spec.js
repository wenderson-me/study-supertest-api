const supertest = require('supertest');
const chai = require('chai');
const faker = require('faker/locale/pt_BR');

const request = supertest('https://api.atbbrasil.com.br')

const rotaBodyType = '/administrative/indexes/auto/bodytypes'

describe('Teste', () => {
  it('Post bodytype', async () => {

    const dataBodyType = {
      id: faker.datatype.uuid(),
      displayName: faker.random.words(),
      description: faker.random.words(),
      value: `${faker.finance.amount()}`,
      isEnabled: true
    }
    const { body } = await request.post(rotaBodyType)
      .set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkRCNDQ5MUI2OENERDhFQTNERkNCMkIxRTA4Q0JGRkVBIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2Mjk4MzYxODksImV4cCI6MTYyOTgzOTc4OSwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5hdGJicmFzaWwuY29tLmJyIiwiY2xpZW50X2lkIjoiYmVtX21haXMiLCJzdWIiOiJhZThhODQ4NS03YzM0LTRhNmUtODFlMi02NTE0ZmZlMjM2MzMiLCJhdXRoX3RpbWUiOjE2Mjk4MzM1MDQsImlkcCI6ImxvY2FsIiwianRpIjoiQTcwMkFFNkQ3RjIzNTNDNTE5RDdEQUVBRDAxRjQwODMiLCJpYXQiOjE2Mjk4MzYxODksInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJyb2xlcyIsImNvbXBhbnkiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.oR2ejZ6nnLUepAfVR_Y8_Htqw_P3EHUEdHeV84Ikn_nmTW8MKML7AWNAy_Jn-Yeg6czujVFey_ZVreKQhl6TmvQFxYCAp3dCepXJzuuzDv9Nb6aSt13MrJvPAuhvVSPhQpys5Aj3Cc2iG2Z9sOEu17BL-yoxic_ReYGY_gF0XjPL1n27aSFRU5ZoRS1qSsSzRJuLKTqsPkuuhtTD3w_wDht7M_1LqXLHRSeyPClrJGWAu1YgAsw4ECx1WnVPC3RAYemSyMU5B68pWukmvo3Bz9pVsXfriqRkoYZetawLu3sJdbELREihnWXHNKMO64Yfx9rp-fjai7rTmKgACP8I8Q') //set header for this test
      .set('Content-Type', 'application/json') //set header for this test
      .send(dataBodyType).expect(200)
    console.log(body)
    chai.assert.deepEqual(body, {
      id: dataBodyType.id,
      displayName: dataBodyType.displayName,
      description: dataBodyType.description,
      value: dataBodyType.value,
      isEnabled: dataBodyType.isEnabled
    })
  });
});