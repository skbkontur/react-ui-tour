import axios, {AxiosInstance} from 'axios';

export default class ClientApi {
  axios: AxiosInstance;
  baseUrl: string;
  constructor(baseUrl = '') {
    this.axios = axios.create({
      baseURL: baseUrl,
      withCredentials: true,
    });
    this.baseUrl = baseUrl;
  }

  getSmt(): Promise<{message: string}> {
    // return this.axios.post(`api/generate`).then((res) => res.data);
    return Promise.resolve({message: 'foo'});
  }
}
