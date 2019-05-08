import { ResponseParser } from "./types";
import ClientError from "./ClientError";

class FetchRequestParser implements ResponseParser<Response> {
  parseResponse = (response: Response): Promise<any> => {
    return response
      .json()
      .then((json: { data: Object }) => {
        if (response.ok) {
          return json.data;
        }
        return Promise.reject(new ClientError(response, json.data));
      })
      .catch(() => Promise.reject(new ClientError(response, {})));
  };
}

export default FetchRequestParser;
