import { AugmentedRequest, RESTDataSource } from '@apollo/datasource-rest';
import { v4 as uuid } from 'uuid';
import { CustomContext } from 'src/graphql/custom-context.js';

const Headers = {
  IDENT: 'x-identifier',
  JWT: 'x-user-oktajwt',
  REQUEST_ID: 'x-request-id',
};

export class BaseDataSource extends RESTDataSource {
  public context: CustomContext;

  public init(context: CustomContext) {
    this.context = context;
  }

  protected willSendRequest(_path: string, options: AugmentedRequest) {
    const requestId = this.readHeader(Headers.REQUEST_ID) ?? uuid();
    const ident = this.readHeader(Headers.IDENT) ?? 'unknown';

    // request.timeout = 55_000
    options.headers[Headers.REQUEST_ID] = requestId;
    options.headers[Headers.IDENT] = `apollo-server/${ident}`;

    if (this.context.token) {
      options.headers[Headers.JWT] = this.context.token;
    }
  }

  protected cacheOptionsFor() {
    return { ttl: 0 };
  }

  private readHeader(key: string) {
    const headers = this.context.req.headers;
    const value = headers[key];

    return Array.isArray(value) ? value[0] : value;
  }
}
