const ALLOcloud = require("@allocloud/js-sdk").default;

const main = async () => {
  const API_KEY = process.env.ALLOCLOUD_API_KEY;
  const opts = {
    baseUrl: "https://wn.allocloud.com",
    version: "v3.0"
  };
  const client = await ALLOcloud.create(API_KEY, opts);

  const conf = await client.createConference({
    owner_id: 1,
    name: "Super Important Conference",
    members_maximum: 5,
    members_pin: "1234",
    members_announce_join_leave: true,
    members_join_muted: true,
    language: "fr_FR"
  });

  if (conf && conf.id) {
    console.log(`Conference ${conf.id} created.`);

    await client.updateConference(conf.id, {
      ...conf,
      name: "Hyper Important Conference"
    });

    console.log("Conference updated.");
  }
};

main();
