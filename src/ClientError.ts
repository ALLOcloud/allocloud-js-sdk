import { APIError } from "./types";

export default class ClientError extends Error {
  response: Response;
  _message: string;
  details: string;
  type: string;

  constructor(response: Response, error?: APIError) {
    super(
      error
        ? `[${error.type}] ${error.message}: ${error.details}`
        : response.statusText
    );

    this.response = response;

    if (error) {
      this._message = error.message;
      this.details = error.details;
      this.type = error.type;
    }
  }
}
