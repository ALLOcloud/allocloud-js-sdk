const ALLOcloud = require("@allocloud/js-sdk").default;

const main = async () => {
  const API_KEY = process.env.ALLOCLOUD_API_KEY;
  const opts = {
    baseUrl: "https://wn.allocloud.com",
    version: "v3.0"
  };
  const client = await ALLOcloud.create(API_KEY, opts);

  const newCalendar = {
    name: "My super new calendar",
    is_external_calendar: false,
    ics: "BEGIN:VCALENDAR\n",
    url: "",
    time_zone: "Europe/Brussels"
  };

  client
    .createCalendar(newCalendar)
    .then(calendar => console.log("Calendar created. id:", calendar.id))
    .catch(err => console.error("Cannot create calendar. Error:", err.message));
};

main();
