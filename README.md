# Apollo Authentication Demo

This demo illustrates how to authenticate an application using Apollo client against a server running Apollo server **version 4**.

This monorepo includes both the [server](./server) and React Native [client](./reactNativeClient/) code.

Both client and server code use TypeScript.

The code is mostly the Apollo demo code with authentication added.

## To run the server

```
$ cd server
$ npm install
$ npm start
```

## To run the React-Native App

The r-n app is built with [expo](https://expo.io/). Running it assumes you are familiar with r-n development using expo. For iOS you'll also need at least the xcode command line tools.

```
$ cd reactNativeApp
$ npm install
$ npm run ios
```

Substitute `npm run android` if you're running on an android emulator.
