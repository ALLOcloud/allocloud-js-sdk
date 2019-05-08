import { fetch } from "cross-fetch";

import TokenRequestFactory from "./TokenRequestFactory";
import FetchRequestPerformer from "./FetchRequestPerformer";
import FetchRequestParser from "./FetchRequestParser";

import {
  /** Client requests. */
  RequestFactory,
  RequestPerformer,
  ResponseParser,

  /** Data types. */
  ID,
  Account,
  Device,
  DeviceRegistration,
  DeviceStatus,
  Calendar,
  Callflow,
  HistoryCall,
  Conference,
  ReadAllShort,
  Contact,
  ContactUpdate,
  ContactDeleteResponse,
  FunctionKey
} from "./types";

interface ClientConfig {
  baseUrl: string;
  version: string;
}

const defaultConfig: ClientConfig = {
  baseUrl: "https://wn.allocloud.com",
  version: "v3.0"
};

/**
 * @class Client
 */
class Client<RequestType, ResponseType> {
  constructor(
    private requestFactory: RequestFactory<RequestType>,
    private requestPerformer: RequestPerformer<RequestType, ResponseType>,
    private responseParser: ResponseParser<ResponseType>
  ) {}

  static async getAuthTokenFromAPIKey(apiKey: string, config: ClientConfig) {
    try {
      const { baseUrl, version } = config;
      const tokenReq = await fetch(`${baseUrl}/${version}/auth/account`, {
        method: "PUT",
        body: JSON.stringify({
          data: {
            api_key: apiKey
          }
        })
      });

      const tokenRes = await tokenReq.json();
      return Promise.resolve(tokenRes.data.auth_token);
    } catch (err) {
      throw err;
    }
  }

  static async create(
    apiKey: string,
    config: ClientConfig = defaultConfig
  ): Promise<Client<any, any>> {
    const { baseUrl, version } = config;
    const authToken = await Client.getAuthTokenFromAPIKey(apiKey, config);
    const client = new Client(
      new TokenRequestFactory(authToken, baseUrl, version),
      new FetchRequestPerformer(),
      new FetchRequestParser()
    );

    return Promise.resolve(client);
  }

  listResource<T>(uri: string): Promise<T[]> {
    const req = this.requestFactory.createRequest(uri);
    return this.requestPerformer
      .performRequest(req)
      .then(this.responseParser.parseResponse);
  }

  getResource<T>(uri: string, params?: Object): Promise<T> {
    const req = params
      ? this.requestFactory.createRequest(uri, "GET", params)
      : this.requestFactory.createRequest(uri);
    return this.requestPerformer
      .performRequest(req)
      .then(this.responseParser.parseResponse);
  }

  createResource<T>(uri: string, params: Object): Promise<T> {
    const req = this.requestFactory.createRequest(uri, "PUT", {
      data: { ...params }
    });
    return this.requestPerformer
      .performRequest(req)
      .then(this.responseParser.parseResponse);
  }

  updateResource<T>(uri: string, params: Object): Promise<T> {
    const req = this.requestFactory.createRequest(uri, "POST", {
      data: { ...params }
    });
    return this.requestPerformer
      .performRequest(req)
      .then(this.responseParser.parseResponse);
  }

  deleteResource<T>(uri: string, params?: Object): Promise<T> {
    const req = this.requestFactory.createRequest(uri, "DELETE", {
      data: { ...params }
    });
    return this.requestPerformer
      .performRequest(req)
      .then(this.responseParser.parseResponse);
  }

  /**
   * ALLOcloud types
   */

  /** Accounts */
  getAccount(): Promise<Account> {
    return this.getResource("accounts");
  }

  /** Calendars */
  listCalendars(): Promise<Calendar[]> {
    return this.listResource("calendars");
  }

  getCalendar(id: ID): Promise<Calendar> {
    return this.getResource(`calendars/${id}`);
  }

  createCalendar(params: Calendar): Promise<Calendar> {
    return this.createResource("calendars", params);
  }

  updateCalendar(id: ID, params: Calendar): Promise<Calendar> {
    return this.updateResource("calendars", { id, ...params });
  }

  deleteCalendar(id: ID): Promise<{ calendar_id: ID }> {
    return this.deleteResource(`calendars/${id}`);
  }

  /** Callflows */
  listCallflows(): Promise<ReadAllShort[]> {
    return this.listResource("callflows");
  }

  getCallflow(id: ID): Promise<Callflow> {
    return this.getResource(`callflows/${id}`);
  }

  createCallflow(params: Callflow): Promise<Callflow> {
    return this.createResource("callflows", params);
  }

  updateCallflow(id: ID, params: Callflow): Promise<Callflow> {
    return this.updateResource("callflows", { id, ...params });
  }

  deleteCallflow(id: ID): Promise<{ callflow_id: ID }> {
    return this.deleteResource(`callflows/${id}`);
  }

  /** Calls history */
  listHistoryCalls(direction: string = "all"): Promise<HistoryCall[]> {
    return this.listResource(`calls_history/${direction}`);
  }

  getHistoryCall(id: ID): Promise<HistoryCall> {
    return this.getResource(`calls_history/${id}`);
  }

  /** Conferences */
  listConferences(): Promise<ReadAllShort[]> {
    return this.listResource("conferences");
  }

  getConference(id: ID): Promise<Conference> {
    return this.getResource(`conferences/${id}`);
  }

  createConference(params: Conference): Promise<Conference> {
    return this.createResource("conferences", params);
  }

  updateConference(id: ID, params: Conference): Promise<Conference> {
    return this.updateResource("conferences", { id, ...params });
  }

  deleteConference(id: ID): Promise<{ conference_id: ID }> {
    return this.deleteResource(`conferences/${id}`);
  }

  /** Devices */
  listDevices(filters?: {
    ownerId?: number;
    externalSipAccount?: boolean;
  }): Promise<Device[]> {
    // TODO: Implement filters.
    return this.listResource("devices");
  }

  getDevice(id: ID): Promise<Device> {
    return this.getResource(`devices/${id}`);
  }

  createDevice(params: Device): Promise<Device> {
    return this.createResource("devices", params);
  }

  updateDevice(id: ID, params: Device): Promise<Device> {
    return this.updateResource(`devices`, { id, ...params });
  }

  deleteDevice(id: ID): Promise<{ device_id: ID }> {
    return this.deleteResource(`devices/${id}`);
  }

  listDevicesRegistrations(): Promise<DeviceRegistration[]> {
    return this.listResource("devices/registrations");
  }

  async listDevicesStatus(): Promise<DeviceStatus[]> {
    const status = await this.listResource("devices/status");
    return Object.keys(status).reduce((acc, key) => {
      const s = status[key];
      acc[acc.length] = {
        id: key,
        registered: s.registered,
        state: s.state
      };
      return acc;
    }, []);
  }

  /** Directories */
  listContacts(): Promise<Contact[]> {
    return this.listResource("directories");
  }

  getContact(id: ID): Promise<Contact> {
    return this.getResource(`directories/${id}`);
  }

  createContact(params: Contact): Promise<Contact> {
    return this.createResource("directories", params);
  }

  updateContacts(params: ContactUpdate): Promise<{ updated: number[] }> {
    return this.updateResource("directories", params);
  }

  deleteContact(id: ID): Promise<ContactDeleteResponse> {
    return this.deleteResource(`directories/${id}`);
  }

  deleteMultipleContacts(ids: ID[]): Promise<ContactDeleteResponse> {
    return this.updateResource("directories/delete", { ids });
  }

  /** Function Keys */
  listDeviceFunctionKeys(deviceId: ID): Promise<FunctionKey[]> {
    return this.listResource(`function_keys/device/${deviceId}`);
  }

  updateDeviceFunctionKeys(
    deviceId: ID,
    params: FunctionKey
  ): Promise<FunctionKey[]> {
    return this.updateResource(`function_keys/device/${deviceId}`, params);
  }
}

export default Client;
