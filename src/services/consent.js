import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onPost('/consent').reply(200);

export async function giveContent(data) {
  return axios.post('/consent', data);
}
