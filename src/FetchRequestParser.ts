import { ResponseParser, APIError } from "./types";
import ClientError from "./ClientError";

class FetchRequestParser implements ResponseParser<Response> {
  parseResponse = (response: Response): Promise<any> => {
    return response.json().then((json: { data?: Object; error?: APIError }) => {
      if (response.ok) {
        return json.data;
      }
      return Promise.reject(new ClientError(response, json.error));
    });
  };
}

export default FetchRequestParser;
