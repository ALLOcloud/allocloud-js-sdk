# ALLOcloud JavaScript SDK

An isomorphic/universal promise based interface to the ALLOcloud API.

[![CircleCI](https://circleci.com/gh/allocloud/allocloud-js-sdk.svg?style=svg)](https://circleci.com/gh/allocloud/allocloud-js-sdk)

## Install

```shell
$ yarn add allocloud-js-sdk
# Enjoy the SDK api.
```

## Usage

See [typings](typings/index.d.ts) for available method while we don't have proper documentation for this lib. Plan is to use typedoc so we can infer documentation from typings and get things done faster.

```js
import ALLOcloud from "allocloud-js-sdk";

const API_KEY = process.env.ALLOCLOUD_API_KEY;
const client = ALLOcloud.create(API_KEY);

const main = async () => {
  try {
    await client.authenticate();
  } catch (err) {
    console.error("Authentication failed. Error:", err.message);
  }

  try {
    const devices = await client.listDevices();
    const deviceThree = await client.getDevice(3);
    const contacts = await client.listContacts();

    console.log("Devices count:", devices.length);
    console.log("Contacts count:", contacts.length);
    console.log("Device (id: 3) name:", deviceThree.name);
  } catch (err) {
    console.error("Data request(s) failed. Error:", err.message);
  }
};

main();
```
