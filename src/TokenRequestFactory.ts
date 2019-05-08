import { Headers, Request } from "cross-fetch";
import { URL } from "universal-url";

import { RequestFactory } from "./types";

class TokenRequestFactory implements RequestFactory<Request> {
  private authToken: string;
  baseUrl: string;
  version: string;

  constructor(authToken: string, baseUrl: string, version: string) {
    this.authToken = authToken;
    this.baseUrl = baseUrl;
    this.version = version;
  }

  prefixURI(uri: string): string {
    const prefix = `/${this.version}/`;
    if (uri.startsWith(prefix)) {
      return uri;
    }

    return `${prefix}${uri}`;
  }

  createRequest(uri: string, method: string = "GET", body?: Object) {
    const url = new URL(this.prefixURI(uri), this.baseUrl);
    const headers = new Headers();
    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json");
    headers.set("X-Auth-Token", this.authToken);

    if (method === "GET") {
      if (body) {
        Object.entries(body).forEach(entry =>
          url.searchParams.append(entry[0], String(entry[1]))
        );
      }

      return new Request(url.toString(), { headers, method });
    }

    return new Request(url.toString(), {
      headers,
      method,
      body: JSON.stringify(body)
    });
  }
}

export default TokenRequestFactory;
