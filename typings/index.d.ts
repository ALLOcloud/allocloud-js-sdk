import { 
/** Client requests. */
RequestFactory, RequestPerformer, ResponseParser, 
/** Data types. */
ID, Account, Device, DeviceRegistration, DeviceStatus, Calendar, Callflow, HistoryCall, Conference, ReadAllShort, Contact, ContactUpdate, ContactDeleteResponse, FunctionKey } from "./types";
interface ClientConfig {
    baseUrl: string;
    version: string;
}
/**
 * @class Client
 */
declare class Client<RequestType, ResponseType> {
    private requestFactory;
    private requestPerformer;
    private responseParser;
    constructor(requestFactory: RequestFactory<RequestType>, requestPerformer: RequestPerformer<RequestType, ResponseType>, responseParser: ResponseParser<ResponseType>);
    static getAuthTokenFromAPIKey(apiKey: string, config: ClientConfig): Promise<any>;
    static create(apiKey: string, config?: ClientConfig): Promise<Client<any, any>>;
    listResource<T>(uri: string): Promise<T[]>;
    getResource<T>(uri: string, params?: Object): Promise<T>;
    createResource<T>(uri: string, params: Object): Promise<T>;
    updateResource<T>(uri: string, params: Object): Promise<T>;
    deleteResource<T>(uri: string, params?: Object): Promise<T>;
    /**
     * ALLOcloud types
     */
    /** Accounts */
    getAccount(): Promise<Account>;
    /** Calendars */
    listCalendars(): Promise<Calendar[]>;
    getCalendar(id: ID): Promise<Calendar>;
    createCalendar(params: Calendar): Promise<Calendar>;
    updateCalendar(id: ID, params: Calendar): Promise<Calendar>;
    deleteCalendar(id: ID): Promise<{
        calendar_id: ID;
    }>;
    /** Callflows */
    listCallflows(): Promise<ReadAllShort[]>;
    getCallflow(id: ID): Promise<Callflow>;
    createCallflow(params: Callflow): Promise<Callflow>;
    updateCallflow(id: ID, params: Callflow): Promise<Callflow>;
    deleteCallflow(id: ID): Promise<{
        callflow_id: ID;
    }>;
    /** Calls history */
    listHistoryCalls(direction?: string): Promise<HistoryCall[]>;
    getHistoryCall(id: ID): Promise<HistoryCall>;
    /** Conferences */
    listConferences(): Promise<ReadAllShort[]>;
    getConference(id: ID): Promise<Conference>;
    createConference(params: Conference): Promise<Conference>;
    updateConference(id: ID, params: Conference): Promise<Conference>;
    deleteConference(id: ID): Promise<{
        conference_id: ID;
    }>;
    /** Devices */
    listDevices(filters?: {
        ownerId?: number;
        externalSipAccount?: boolean;
    }): Promise<Device[]>;
    getDevice(id: ID): Promise<Device>;
    createDevice(params: Device): Promise<Device>;
    updateDevice(id: ID, params: Device): Promise<Device>;
    deleteDevice(id: ID): Promise<{
        device_id: ID;
    }>;
    listDevicesRegistrations(): Promise<DeviceRegistration[]>;
    listDevicesStatus(): Promise<DeviceStatus[]>;
    /** Directories */
    listContacts(): Promise<Contact[]>;
    getContact(id: ID): Promise<Contact>;
    createContact(params: Contact): Promise<Contact>;
    updateContacts(params: ContactUpdate): Promise<{
        updated: number[];
    }>;
    deleteContact(id: ID): Promise<ContactDeleteResponse>;
    deleteMultipleContacts(ids: ID[]): Promise<ContactDeleteResponse>;
    /** Function Keys */
    listDeviceFunctionKeys(deviceId: ID): Promise<FunctionKey[]>;
    updateDeviceFunctionKeys(deviceId: ID, params: FunctionKey): Promise<FunctionKey[]>;
}
export default Client;
