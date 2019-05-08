import { APIError } from "./types";
export default class ClientError extends Error {
    response: Response;
    _message: string;
    details: string;
    type: string;
    constructor(response: Response, error?: APIError);
}
