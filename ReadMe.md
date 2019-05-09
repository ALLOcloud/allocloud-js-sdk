# ALLOcloud JavaScript SDK

An isomorphic/universal promise based interface to the ALLOcloud API.

[![CircleCI](https://img.shields.io/circleci/project/github/ALLOcloud/allocloud-js-sdk.svg?style=for-the-badge&logo=circleci)](https://circleci.com/gh/ALLOcloud/allocloud-js-sdk) [![npm](https://img.shields.io/npm/v/allocloud-js-sdk.svg?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/allocloud-js-sdk)

[Documentation](https://allocloud.github.io/allocloud-js-sdk/)

## Install

```shell
$ yarn add allocloud-js-sdk
# or with NPM
$ npm install --save allocloud-js-sdk
```

## Usage

```js
import ALLOcloud from "allocloud-js-sdk";

const API_KEY = process.env.ALLOCLOUD_API_KEY;

const main = async () => {
  const client = await ALLOcloud.create(API_KEY);

  const devices = await client.listDevices();
  const deviceThree = await client.getDevice(3);
  const contacts = await client.listContacts();

  console.log("Devices count:", devices.length);
  console.log("Contacts count:", contacts.length);
  console.log("Device (id: 3) name:", deviceThree.name);

  const newCalendar = {
    name: "My super new calendar",
    is_external_calendar: false,
    ics: "BEGIN:VCALENDAR\nVERSION:2.0\n{ICS_DATA_HERE}\nEND:VCALENDAR",
    url: "",
    time_zone: "Europe/Brussels"
  };

  const calendar = await client.createCalendar(newCalendar);
  console.log("New calendar created. id:", calendar.id);
};

main();
```
