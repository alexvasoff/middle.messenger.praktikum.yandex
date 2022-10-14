const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

// Самая простая версия. Реализовать штучку со всеми проверками им предстоит в конце спринта
// Необязательный метод
function queryStringify(data) {
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
  get = (url, options = {}) => this.request(options.data ? `${url}${queryStringify(options.data)}` : url, {
    ...options,
    method: METHODS.GET,
  }, options.timeout);

  post = (url, options = {}) => this.request(url, {
    ...options, headers: { 'Content-Type': 'application/json' }, method: METHODS.POST, credentials: 'include',
  }, options.timeout);

  put = (url, options = {}) => this.request(url, {
    ...options, headers: { 'Content-Type': 'application/json' }, method: METHODS.PUT, credentials: 'include',
  }, options.timeout);

  delete = (url, options = {}) => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  request = (url, options = {}, timeout = 5000) => {
    const { headers = {}, method, data } = options;

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
