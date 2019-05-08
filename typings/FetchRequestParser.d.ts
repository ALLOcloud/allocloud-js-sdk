import { ResponseParser } from "./types";
declare class FetchRequestParser implements ResponseParser<Response> {
    parseResponse: (response: Response) => Promise<any>;
}
export default FetchRequestParser;
