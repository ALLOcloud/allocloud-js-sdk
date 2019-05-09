import { 
/** Client requests. */
RequestFactory, RequestPerformer, ResponseParser, 
/** Data types. */
ID, Account, Device, DeviceRegistration, DeviceStatus, Calendar, Callflow, HistoryCall, Conference, ReadAllShort, Contact, ContactUpdate, ContactDeleteResponse, FunctionKey, Group, Media, Menu, Network, PhoneNumber, PhoneNumberCreate, PhoneNumberUpdate, Recording, Trunk, User, VoicemailBox } from "./types";
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
    private listResource;
    private getResource;
    private createResource;
    private updateResource;
    private deleteResource;
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
    /** Groups */
    listGroups(): Promise<Group[]>;
    getGroup(id: ID): Promise<Group>;
    createGroup(params: Group): Promise<Group>;
    updateGroup(id: ID, params: Group): Promise<Group>;
    deleteGroup(id: ID): Promise<{
        group_id: ID;
    }>;
    /** Medias */
    listMedias(): Promise<Media[]>;
    getMedia(id: ID): Promise<Media>;
    getMediaRaw(id: ID): Promise<Media>;
    createMedia(params: Media): Promise<Media>;
    updateMedia(id: ID, params: Media): Promise<Media>;
    deleteMedia(id: ID): Promise<{
        media_id: ID;
    }>;
    /** Menus */
    listMenus(): Promise<Menu[]>;
    getMenu(id: ID): Promise<Menu>;
    createMenu(params: Menu): Promise<Menu>;
    updateMenu(id: ID, params: Menu): Promise<Menu>;
    deleteMenu(id: ID): Promise<{
        menu_id: ID;
    }>;
    /** Networks */
    listNetworks(): Promise<Network[]>;
    /** Phone numbers */
    listPhoneNumbers(): Promise<PhoneNumber[]>;
    getPhoneNumber(id: ID): Promise<PhoneNumber>;
    createPhoneNumber(params: PhoneNumberCreate): Promise<PhoneNumber>;
    updatePhoneNumber(params: PhoneNumberUpdate): Promise<PhoneNumberUpdate>;
    deletePhoneNumber(id: ID): Promise<{
        phone_number_id: ID;
    }>;
    /** Recordings */
    listRecordings(): Promise<Recording[]>;
    getRecording(id: ID): Promise<Recording>;
    getRecordingRaw(id: ID): Promise<Recording>;
    deleteRecording(id: ID): Promise<{
        recording_id: ID;
    }>;
    /** Trunks */
    listTrunks(): Promise<Trunk[]>;
    getTrunk(id: ID): Promise<Trunk>;
    createTrunk(params: Trunk): Promise<Trunk>;
    updateTrunk(id: ID, params: Trunk): Promise<Trunk>;
    deleteTrunk(id: ID): Promise<{
        trunk_id: ID;
    }>;
    /** Users */
    listUsers(): Promise<User[]>;
    getUser(id: ID): Promise<User>;
    createUser(params: User): Promise<User>;
    updateUser(id: ID, params: User): Promise<User>;
    deleteUser(id: ID): Promise<{
        user_id: ID;
    }>;
    /** Voicemails Boxes */
    listVoicemailBoxes(): Promise<VoicemailBox[]>;
    getVoicemailBox(id: ID): Promise<VoicemailBox>;
    createVoicemailBox(params: VoicemailBox): Promise<VoicemailBox>;
    updateVoicemailBox(id: ID, params: VoicemailBox): Promise<VoicemailBox>;
    deleteVoicemailBox(id: ID): Promise<{
        vmbox_id: ID;
    }>;
}
export default Client;
