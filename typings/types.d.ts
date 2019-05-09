export declare type ID = string | number;
export interface RequestFactory<T> {
    baseUrl: string;
    version: string;
    createRequest(uri: string, method?: string, body?: Object): T;
    prefixURI(uri: string): string;
}
export interface RequestPerformer<T, U> {
    performRequest(request: T): Promise<U>;
}
export interface ResponseParser<U> {
    parseResponse(response: U): Promise<any>;
}
export declare type APIError = {
    type: string;
    details: string;
    message: string;
};
export declare enum PrivLevel {
    ADMIN = "admin",
    SUPERDUPER = "superduper",
    USER = "user"
}
export declare enum NetworkTransport {
    TCP_34540 = "tcp_34540",
    TCP_34560 = "tcp_34560",
    TCP_10065 = "tcp_10065",
    UDP_10060 = "udp_10060",
    UDP_34540 = "udp_34540",
    UDP_34560 = "udp_34560",
    TLS_10061 = "tls_10061",
    TLS_34521 = "tls_34521",
    TLS_34541 = "tls_34541",
    TLS_34561 = "tls_34561",
    WSS_443 = "wss_443"
}
/** Caller ID */
export declare type CallerID = {
    internal: {
        name: string;
        number: string;
    };
    external: {
        name: string;
        number: string;
        anonymous: boolean;
    };
    fax: {
        name: string;
        number: string;
    };
    emergency: {
        name: string;
        number: string;
    };
};
export declare type CallForward = {
    enabled: boolean;
    number: string;
    require_key_press: boolean;
    direct_calls_only: boolean;
    keep_caller_id: boolean;
};
export declare type LabelID = {
    id?: ID;
    label: string;
};
export declare type ReadAllShort = {
    id: ID;
    name: string;
};
export declare type PostalAddress = {
    company_name: string;
    address_line_1: string;
    address_number: string;
    address_line_2: string;
    postal_code: string;
    city: string;
    vat: string;
};
export declare type Parking = {
    enabled: boolean;
    park_extension: string;
    first_slot: string;
    last_slot: string;
    timeout: number;
};
/** Accounts */
export declare type Account = {
    id?: ID;
    name: string;
    category: string;
    notes: string;
    available_apps: string[];
    provision: {
        admin_password: string;
        admin_pin: string;
    };
    caller_id: CallerID;
    music_on_hold_id: ID;
    time_zone: string;
    language: string;
    country: string;
    restriction: string;
    postal_address: {
        main: PostalAddress;
    };
    billing: {
        rate_plan: number;
        volume_pack: number;
        spending_plan: number;
        credit_limit: number;
        credit_limit_theshold: number;
        max_number_fwd_calls: number;
        max_number_incoming_calls: number;
        max_number_outgoing_calls: number;
        max_number_sim_calls: number;
        available_products: LabelID[];
        available_packs: LabelID[];
        available_spending_plans: LabelID[];
        platform_trunk_enabled: boolean;
        pickup: boolean;
        parkings: {
            main: Parking;
        };
        failover_number: string;
        custom_files: string[];
        internal_phonebook: boolean;
        realm: string;
        prov_key: string;
        hostname_suffix: string;
        created: Date;
        children: string[];
    };
};
/** Devices */
export declare type Device = {
    id?: ID;
    name: string;
    hostname: string;
    owner_id: ID;
    owner_association_category: string;
    username: string;
    password: string;
    language: string;
    time_zone: string;
    country: string;
    restriction: string;
    caller_id: CallerID;
    call_forward: CallForward;
    music_on_hold_id: ID;
    transport: NetworkTransport;
    hardware_order: number;
    hardware: Hardware;
    status: boolean;
    retries: {
        wait_until_next_retry: number;
        max: number;
    };
    always_registered: boolean;
    missed_calls_log: boolean;
};
export declare type DeviceRegistration = {
    username: string;
    name: string;
    owner_id: ID;
    category: string;
    user_agent: string;
    contact_ip: string;
    contact_port: number;
};
export declare type DeviceStatus = {
    id?: ID;
    registered: boolean;
    state?: string;
};
/** Hardwares */
export declare type Hardware = {
    id?: ID;
    category: string;
    brand: string;
    family: string;
    model: string;
    mac_address: string;
    version: string;
    provisioning_version: string;
    zero_touch_provisioning: boolean;
    remote_logging: boolean;
    config: object;
};
/** Calendars */
export declare type Calendar = {
    id?: ID;
    name: string;
    is_external_calendar: boolean;
    ics: string;
    url: string;
    time_zone: string;
};
/** Callflows */
export declare type FeatureCode = {
    name: string;
    number: string;
};
export declare type Flow = {
    id?: ID;
    module: string;
    children: Flow;
    data: {
        caption: string;
        id: ID;
    };
};
export declare type Callflow = {
    id?: ID;
    name: string;
    numbers: string[];
    featurecode: FeatureCode;
    flow: Flow;
};
/** Calls history */
export declare enum CallDirection {
    INCOMING = "incoming",
    OUTGOING = "outgoing",
    BOTH = "both"
}
export declare type HistoryCall = {
    id?: ID;
    owner_id: ID;
    billing_seconds: number;
    call_direction: CallDirection;
    callee_callid: string;
    callee_id_number: string;
    caller_callid: string;
    caller_id_number: string;
    cost: number;
    detected_country: string;
    detected_operator: string;
    detected_type: string;
    duraction_seconds: number;
    hangup_cause: string;
    timestamp: number;
};
/** Conferences */
export declare type Conference = {
    id?: ID;
    owner_id: ID;
    name: string;
    members_maximum: number;
    members_pin: string;
    members_announce_join_leave: boolean;
    members_join_muted: boolean;
    language: string;
};
/** Directories */
export declare type Contact = {
    id?: ID;
    user_id: ID;
    phonebook: string;
    details: {
        names: {
            first: string;
            last: string;
        };
        company: {
            name: string;
        };
        phone_numbers: {
            land_lines: string[];
            mobiles: string[];
            faxes: string[];
        };
    };
};
export declare type ContactUpdate = {
    contacts: Contact[];
    phonebook: string;
};
export declare type ContactDeleteResponse = {
    deleted: ID[];
};
/** Function Keys */
export declare type FunctionKey = {
    key_id: ID;
    line_id: ID;
    type: string;
    value: string;
    label: string;
};
/** Groups */
export declare type Member = {
    member_id: ID;
    member_type: string;
    delay: number;
    timeout: number;
    logged: boolean;
};
export declare type Group = {
    id?: ID;
    name: string;
    waiting_queue: boolean;
    global_timeout: number;
    pickup: boolean;
    members: Member[];
    music_on_hold_id: ID;
    login_logout_authorized: boolean;
    strategy: string;
};
/** Medias */
export declare type Media = {
    id?: ID;
    name: string;
    content_type: string;
    file_name: string;
    available_as_moh: boolean;
};
/** Menus */
export declare type Menu = {
    id?: ID;
    name: string;
    media_id: ID;
    retries: number;
    timeout: number;
    hunt: {
        allow: string[];
        deny: string[];
    };
};
/** Networks */
export declare type NetworksResponse = {
    networks: Network[];
};
export declare type Network = {
    address: string;
    network: string;
    netmask: string;
};
/** Phone Numbers */
export declare type PhoneNumber = {
    id?: ID;
    state: string;
    used_by: string;
    used_by_id: ID;
    used_by_name: string;
    assigned_to: string;
    features: string[];
    category: string;
    trunk_id: ID;
    trunk_name: string;
    carrier: string;
    country: string;
    bypass_number?: string;
    bypass_enabled?: boolean;
};
export declare type PhoneNumberCreate = {
    state: string;
    trunk_id: ID;
    carrier: string;
};
export declare type PhoneNumberUpdate = {
    phone_numbers: string[];
    state: string;
};
/** Recordings */
export declare enum RecordingFormat {
    MP3 = "mp3",
    WAV = "wav"
}
export declare type Recording = {
    id: ID;
    format: RecordingFormat;
};
/** Trunks */
export declare enum TrunkCategory {
    CARRIER = "carrier",
    PBX_CONNECTOR = "pbx_connector",
    INTER_ACCOUNT = "inter_account"
}
export declare enum TrunkBrand {
    UNKNOWN = "unknown",
    PANASONIC = "panasonic",
    SOFT_SWITCH_CLOUD = "soft_switch_cloud",
    V3M1 = "v3m1",
    NIKO = "niko"
}
export declare enum TrunkConcurrentCallsVolume {
    XSMALL = "xsmall",
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large",
    XLARGE = "xlarge"
}
export declare type TrunkAdvancedOpts = {
    override_from_domain: boolean;
    override_from_user: boolean;
    add_country_prefix_for_emergency_calls: boolean;
    vpn: boolean;
    incoming: {
        strip_numbers: number;
        prepend_numbers: string;
    };
};
export declare type Trunk = {
    id?: ID;
    name: string;
    category: TrunkCategory;
    brand: TrunkBrand;
    concurrent_calls_volume: TrunkConcurrentCallsVolume;
    calls_direction: CallDirection;
    priv_level: PrivLevel;
    internal_calls: boolean;
    enabled: boolean;
    transport: NetworkTransport;
    server: string;
    port: number;
    username: string;
    password: string;
    caller_id_used: string;
    trunk_order: number;
    country: string;
    restriction: string;
    advanced: TrunkAdvancedOpts;
};
/** Users */
export declare type User = {
    id?: ID;
    username: string;
    priv_level: PrivLevel;
    password: string;
    require_password_update: boolean;
    first_name: string;
    last_name: string;
    email: string;
    vm_to_email_enabled: boolean;
    enabled: boolean;
    caller_id: CallerID;
    language: string;
    mobile_number: string;
    time_zone: string;
    country: string;
    restriction: string;
    call_forward: CallForward;
    music_on_hold_id: ID;
    browserphone_id: ID;
    advanced: boolean;
    hotdesk_enabled: boolean;
    hotdesk_id: ID;
    hotdesk_keep_logged_in_elsewhere: boolean;
    hotdesk_pin: string;
    hotdesk_require_pin: boolean;
    no_service: boolean;
    apps: Object;
    subscriptions: Object;
    quickcall_device: ID;
};
/** Voicemails Boxes */
export declare type VoicemailBox = {
    id?: ID;
    name: string;
    mailbox: string;
    owner_id: ID;
    require_pin: boolean;
    pin: string;
    delete_after_notify: boolean;
    time_zone: string;
};
