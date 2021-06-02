import axios, { CancelTokenSource, Method } from 'axios';
import queryString from 'query-string';
import config from '../config.json';

let cancelTokenSource: CancelTokenSource;

const request = (data: any, method: Method = 'get') => {
  cancelTokenSource && cancelTokenSource.cancel();
  const CancelToken = axios.CancelToken;
  cancelTokenSource = CancelToken.source();

  return axios(config.apiUrl + '?' + queryString.stringify(data), {
    method,
    cancelToken: cancelTokenSource.token,
  }).then(({ data }) => data);
};

export const api = { get: (data: any) => request(data, 'get') };
