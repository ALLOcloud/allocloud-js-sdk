const ALLOcloud = require("@allocloud/js-sdk").default;

const main = async () => {
  const API_KEY = process.env.ALLOCLOUD_API_KEY;
  const opts = {
    baseUrl: "https://wn.allocloud.com",
    version: "v3.0"
  };

  const client = await ALLOcloud.create(API_KEY, opts);

  echoOnlineDevices(client);
  echoRegistrations(client);
  echoCalendars(client);
};

const echoOnlineDevices = async client => {
  let status = await client.listDevicesStatus();
  const registred = status
    .filter(s => s.registered)
    .map(s => s.id)
    .join(", ");
  console.log("Registered devices ids:", registred);
};

const echoRegistrations = async client => {
  const registrations = await client.listDevicesRegistrations();
  console.log("Registrations:\n", registrations);
};

const echoCalendars = async client => {
  const calendars = await client.getCalendar(1);
  console.log("Calendars:\n", calendars);
};

main();
