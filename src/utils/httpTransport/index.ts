import { baseApiUrl } from '../../../config';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

type Options = {
  data?: any;
  timeout?: number | undefined;
  headers?: any;
  method?: string | undefined;
  credentials?: string;
};

type Obj = Record<string | number | symbol, unknown>

// Самая простая версия. Реализовать штучку со всеми проверками им предстоит в конце спринта
// Необязательный метод
function queryStringify(data: Obj) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  // Здесь достаточно и [object Object] для объекта
  return `?${Object
    .entries(data)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')}`;
}

export class HTTPTransport {
  get = (url:string, options: Options = {}) => this.request(options.data ? `${url}${queryStringify(options.data)}` : url, {
    ...options,
    method: METHODS.GET,
  }, options.timeout);

  post = (url: string, options: Options = {}) => this.request(url, {
    ...options, headers: { 'Content-Type': 'application/json' }, method: METHODS.POST, credentials: 'include',
  }, options.timeout);

  put = (url: string, options: Options = {}) => this.request(url, {
    ...options, headers: { 'Content-Type': 'application/json' }, method: METHODS.PUT, credentials: 'include',
  }, options.timeout);

  delete = (url: string, options: Options = {}) => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  request = (url: string, options: Options = {}, timeout = 5000): Promise<XMLHttpRequest> => {
    url = baseApiUrl + url;
    let { headers = {}, method, data } = options;

    if (typeof data !== 'string') {
      data = JSON.stringify(data);
    }

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      xhr.withCredentials = true;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
