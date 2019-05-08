import { RequestPerformer } from "./types";
declare class FetchRequestPerformer implements RequestPerformer<Request, Response> {
    performRequest: {
        (input: RequestInfo, init?: RequestInit): Promise<Response>;
        (input: RequestInfo, init?: RequestInit): Promise<Response>;
    };
}
export default FetchRequestPerformer;
