import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import faker from 'faker';

const mock = new MockAdapter(axios);

const TOTAL_ITEMS = 8;

mock.onPost('/consent').reply(200);

mock.onGet('/consents').reply((config) => {
  // `config` is the axios config and contains things like the url

  // return an array in the form of [status, data, headers]
  const { page } = config.params;
  return [200, {
    consents: [
      { name: faker.name.findName(), email: faker.internet.email(), consent: 'Receive newsletter, Be shown targeted ads' },
      { name: faker.name.findName(), email: faker.internet.email(), consent: 'Receive newsletter' },
    ],
    meta: {
      total: TOTAL_ITEMS,
      current: parseInt(page, 10),
    },
  }];
});

export async function giveConsent(data) {
  return axios.post('/consent', data);
}

export async function fetchConsents(params) {
  return axios.get('/consents', { params });
}
