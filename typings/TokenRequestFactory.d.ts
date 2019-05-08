import { RequestFactory } from "./types";
declare class TokenRequestFactory implements RequestFactory<Request> {
    private authToken;
    baseUrl: string;
    version: string;
    constructor(authToken: string, baseUrl: string, version: string);
    prefixURI(uri: string): string;
    createRequest(uri: string, method?: string, body?: Object): Request;
}
export default TokenRequestFactory;
