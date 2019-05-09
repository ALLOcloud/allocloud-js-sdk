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
  FunctionKey,
  Group,
  Media,
  Menu,
  NetworksResponse,
  Network,
  PhoneNumber,
  PhoneNumberCreate,
  PhoneNumberUpdate,
  Recording,
  Trunk,
  User,
  VoicemailBox
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

  /** Groups */
  listGroups(): Promise<Group[]> {
    return this.listResource("groups");
  }

  getGroup(id: ID): Promise<Group> {
    return this.getResource(`groups/${id}`);
  }

  createGroup(params: Group): Promise<Group> {
    return this.createResource("groups", params);
  }

  updateGroup(id: ID, params: Group): Promise<Group> {
    return this.updateResource("groups", { id, ...params });
  }

  deleteGroup(id: ID): Promise<{ group_id: ID }> {
    return this.deleteResource(`groups/${id}`);
  }

  /** Medias */
  listMedias(): Promise<Media[]> {
    return this.listResource("medias");
  }

  getMedia(id: ID): Promise<Media> {
    return this.getResource(`medias/${id}`);
  }

  getMediaRaw(id: ID): Promise<Media> {
    return this.getResource(`medias/${id}/raw`);
  }

  createMedia(params: Media): Promise<Media> {
    return this.createResource("medias", params);
  }

  updateMedia(id: ID, params: Media): Promise<Media> {
    return this.updateResource("medias", { id, ...params });
  }

  deleteMedia(id: ID): Promise<{ media_id: ID }> {
    return this.deleteResource(`medias/${id}`);
  }

  /** Menus */
  listMenus(): Promise<Menu[]> {
    return this.listResource("menus");
  }

  getMenu(id: ID): Promise<Menu> {
    return this.getResource(`menus/${id}`);
  }

  createMenu(params: Menu): Promise<Menu> {
    return this.createResource("menus", params);
  }

  updateMenu(id: ID, params: Menu): Promise<Menu> {
    return this.updateResource("menus", { id, ...params });
  }

  deleteMenu(id: ID): Promise<{ menu_id: ID }> {
    return this.deleteResource(`menus/${id}`);
  }

  /** Networks */
  async listNetworks(): Promise<Network[]> {
    const req = (await this.getResource("networks")) as NetworksResponse;
    return req.networks;
  }

  /** Phone numbers */
  async listPhoneNumbers(): Promise<PhoneNumber[]> {
    const numbers = await this.listResource("phone_numbers");
    return Object.keys(numbers).reduce((acc, key) => {
      const num = numbers[key];
      acc[acc.length] = {
        id: key,
        ...num
      };
      return acc;
    }, []);
  }

  getPhoneNumber(id: ID): Promise<PhoneNumber> {
    return this.getResource(`phone_numbers/${id}`);
  }

  createPhoneNumber(params: PhoneNumberCreate): Promise<PhoneNumber> {
    return this.createResource("phone_numbers", params);
  }

  updatePhoneNumber(params: PhoneNumberUpdate): Promise<PhoneNumberUpdate> {
    return this.updateResource("phone_numbers", params);
  }

  deletePhoneNumber(id: ID): Promise<{ phone_number_id: ID }> {
    return this.deleteResource(`phone_numbers/${id}`);
  }

  /** Recordings */
  listRecordings(): Promise<Recording[]> {
    return this.listResource("recordings");
  }

  getRecording(id: ID): Promise<Recording> {
    return this.getResource(`recordings/${id}`);
  }

  getRecordingRaw(id: ID): Promise<Recording> {
    return this.getResource(`recordings/${id}/raw`);
  }

  deleteRecording(id: ID): Promise<{ recording_id: ID }> {
    return this.deleteResource(`recordings/${id}`);
  }

  /** Trunks */
  listTrunks(): Promise<Trunk[]> {
    return this.listResource("trunks");
  }

  getTrunk(id: ID): Promise<Trunk> {
    return this.getResource(`trunks/${id}`);
  }

  createTrunk(params: Trunk): Promise<Trunk> {
    return this.createResource("trunks", params);
  }

  updateTrunk(id: ID, params: Trunk): Promise<Trunk> {
    return this.updateResource("trunks", { id, ...params });
  }

  deleteTrunk(id: ID): Promise<{ trunk_id: ID }> {
    return this.deleteResource(`trunks/${id}`);
  }

  /** Users */
  listUsers(): Promise<User[]> {
    return this.listResource("users");
  }

  getUser(id: ID): Promise<User> {
    return this.getResource(`users/${id}`);
  }

  createUser(params: User): Promise<User> {
    return this.createResource("users", params);
  }

  updateUser(id: ID, params: User): Promise<User> {
    return this.updateResource("users", { id, ...params });
  }

  deleteUser(id: ID): Promise<{ user_id: ID }> {
    return this.deleteResource(`users/${id}`);
  }

  /** Voicemails Boxes */
  listVoicemailBoxes(): Promise<VoicemailBox[]> {
    return this.listResource("vmboxes");
  }

  getVoicemailBox(id: ID): Promise<VoicemailBox> {
    return this.getResource(`vmboxes/${id}`);
  }

  createVoicemailBox(params: VoicemailBox): Promise<VoicemailBox> {
    return this.createResource("vmboxes", params);
  }

  updateVoicemailBox(id: ID, params: VoicemailBox): Promise<VoicemailBox> {
    return this.updateResource("vmboxes", { id, ...params });
  }

  deleteVoicemailBox(id: ID): Promise<{ vmbox_id: ID }> {
    return this.deleteResource(`vmboxes/${id}`);
  }
}

export default Client;
