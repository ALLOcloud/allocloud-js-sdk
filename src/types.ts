export type ID = string | number;

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

export type APIError = {
  type: string;
  details: string;
  message: string;
};

/** Caller ID */
export type CallerID = {
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

export type LabelID = {
  id?: ID;
  label: string;
};

export type ReadAllShort = {
  id: ID;
  name: string;
};

export type PostalAddress = {
  company_name: string;
  address_line_1: string;
  address_number: string;
  address_line_2: string;
  postal_code: string;
  city: string;
  vat: string;
};

export type Parking = {
  enabled: boolean;
  park_extension: string;
  first_slot: string;
  last_slot: string;
  timeout: number;
};

/** Accounts */
export type Account = {
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
export type Device = {
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
  call_forward: {
    enabled: boolean;
    number: string;
    require_key_press: boolean;
    direct_calls_only: boolean;
    keep_caller_id: boolean;
  };
  music_on_hold_id: ID;
  transport: string;
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

export type DeviceRegistration = {
  username: string;
  name: string;
  owner_id: ID;
  category: string;
  user_agent: string;
  contact_ip: string;
  contact_port: number;
};

export type DeviceStatus = {
  id?: ID;
  registered: boolean;
  state?: string;
};

/** Hardwares */
export type Hardware = {
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
export type Calendar = {
  id?: ID;
  name: string;
  is_external_calendar: boolean;
  ics: string;
  url: string;
  time_zone: string;
};

/** Callflows */
export type FeatureCode = {
  name: string;
  number: string;
};

export type Flow = {
  id?: ID;
  module: string;
  children: Flow;
  data: {
    caption: string;
    id: ID;
  };
};

export type Callflow = {
  id?: ID;
  name: string;
  numbers: string[];
  featurecode: FeatureCode;
  flow: Flow;
};

/** Calls history */
export type HistoryCall = {
  id?: ID;
  owner_id: ID;
  billing_seconds: number;
  call_direction: string;
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
export type Conference = {
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
export type Contact = {
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

export type ContactUpdate = {
  contacts: Contact[];
  phonebook: string;
};

export type ContactDeleteResponse = {
  deleted: ID[];
};

/** Function Keys */
export type FunctionKey = {
  key_id: ID;
  line_id: ID;
  type: string;
  value: string;
  label: string;
};
