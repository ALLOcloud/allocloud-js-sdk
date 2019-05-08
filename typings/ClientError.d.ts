export default class ClientError extends Error {
    response: Response;
    body: Object;
    constructor(response: Response, body: Object);
}
