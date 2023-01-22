import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { expect } from 'chai';
import { HTTPTransport } from './index';

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    });

    instance = new HTTPTransport();
  });

  afterEach(() => {
    requests.length = 0;
  });

  describe('проверка методов', () => {
    it('.get() отправляет GET запрос', () => {
      instance.get('/user');

      const [request] = requests;

      expect(request.method).to.eq('GET');
    });
    it('.post() отправляет POST запрос', () => {
      instance.post('/user');

      const [request] = requests;

      expect(request.method).to.eq('POST');
    });
    it('.put() отправляет PUT запрос', () => {
      instance.put('/user');

      const [request] = requests;

      expect(request.method).to.eq('PUT');
    });
    it('.delete() отправляет DELETE запрос', () => {
      instance.delete('/user');

      const [request] = requests;

      expect(request.method).to.eq('DELETE');
    });
  });
});
