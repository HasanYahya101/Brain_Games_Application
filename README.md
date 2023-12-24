# Brain Games Application (React Native using Expo Go)

This Application is made using React Native to allow it to work on Android and IOS. You need several Node Modules to run this project. This project is a copy of [Elevate App](https://elevateapp.com/) for Human Computer Interaction Course Project. However, i was unable to complete tis project (with all features) in time. Therefore, this app only has a limited set iof games. Similarly, the Assets in `assets` folder are not all used. But, i put them there just in case. 

## Pre-Requisites:

You also, need `node` and `npm` installed as well as `npx`.To download `npm` use this [link](https://www.npmjs.com/package/download). To download `node`, use this [link](https://nodejs.org/en/download). However for `node`, i suggest using a version manager for `javascript`, such as `nvm` instead which you can get by following instructions given [here](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/).

Also, you can also download `yarn`, instead of `npm`, by following instructions given [here](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable). However, i suggest using `npm`. To download `npx` enter this command in powershell or command-line after you have installed `npm`.

```
npm install -g npx
```

However, if you are using `yarn`, instead of `npm`, you don't need to download `npx` as `yarn` is compatible with `npx`.

## How to Configure the Application:

Firstly, Download the Repository (you only need the `App.js` file and the `app` and `assets` folders). After that run the following command to create an expo starter project.

```
npx create-expo-app my-app // replace my-app with the name of your application
```

For example, if my app name is __BrainTrainRN__, then i will use the command:

```
npx create-expo-app BrainTrainRN
```

After creating the Application Template. Go to it. For example:

```
cd my-app

// Or if you have named it something else use that name instead.
// For example, if the name is BrainTrainRN, then us this instead.

cd BrainTrainRN
```

After this run this command in the root folder to create the `node_modules` folder.

```
npm install
```

Now, open the App.js in the newly created project and copy the code from `App.js` file in this Repository into it. After this copy the `app` and `assets` folders from this repositiry (with all contents) and paste them in the root folder of the newly created project. Root folder is the folder with `node_modules` folder and the `package.json` file.

After this you need to install some `npm` packages. To download them use the commands given below one by one.

```
npm install @expo/webpack-config@19.0.0
npm install @react-native-async-storage/async-storage@1.18.2"
npm install @react-native-community/masked-view@0.1.11"
npm install @react-navigation/material-bottom-tabs@6.2.19"
npm install @react-navigation/native": "^6.1.9"
npm install @react-navigation/stack": "^6.3.20"
npm install expo
npm install expo-av@13.4.1
npm install expo-mail-composer@12.3.0
npm install expo-splash-screen@0.20.5
npm install expo-sqlite@11.3.3
npm install expo-status-bar@1.6.0
npm install expo-system-ui@2.4.0
npm install ionicons@7.2.1
npm install ionicons-npm@2.0.1
npm install react@18.2.0
npm install react-dom@18.2.0
npm install react-native@0.72.6
npm install react-native-gesture-handler@2.12.0
npm install react-native-reanimated@3.3.0
npm install react-native-safe-area-context@4.6.3
npm install react-native-screens@3.22.0
npm install react-native-sound@0.11.2
npm install react-native-svg@13.9.0
npm install react-native-svg-circular-progress@1.0.4
npm install react-native-swiper@1.6.0
npm install react-native-web
npm install expo-doctor@1.3.0
```

If you are using `yarn` you can download them using:

```
yarn add package_name@1.2.3
```

After installing all of them check the compatibility using:

```
npx expo-doctor
```

If there are any compatibility issues, uninstall the previous ones and install the new ones. For uninstalling using `npm`, use the `uninstall` command instead of `install`. For example:

```
npm uninstall package-name@version

// then install new one using

npm install package-name@new_version
```

Now, download the `Expo Go`, app on Android or use the camera app on IOS. Run the following command:

```
npx expo start
```

You can scan the given QR Code using the Expo app on android or the camera app on ios. Your app should run on your device.
