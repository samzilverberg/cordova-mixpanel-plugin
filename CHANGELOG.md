Changelog
=========

### 2.1.0 2015-12-20
- fix for distinctId by damienfa
- browser platform supported (thanks [Damien Fa](https://github.com/damienfa))
- update ios lib from 2.7.2 to 2.9.1
- fix for flush timer not starting after init

### 2.0.1 2015-11-07
- same as 2.0.0, just bumped it because of npm publish problem


### 2.0.0 2015-11-07
- release on NPM to support cordova 5.x.x
  - install plugin via ``` cordova add cordova-plugin-mixpanel ```
- update android lib from 4.5.3 to 4.7.0 (thanks [Simon Arneson](https://github.com/scanniza))
- more mixpanel functionality (thanks [Justin Young](https://github.com/soupman99))
  - mixpanel api:
    - showSurvey (only iOS currently)
  - mixpanel people api:
    - increment
    - setOnce


### 1.3.1 2015-10-17
- fix registerPushToken functionality (thanks [Steven Feaster](https://github.com/sfeast))
  - use correct fn on android
  - fix data conversion of pushId on ios
  - rename it to setPushId to avoid confusion with 'registration' process


### 1.3.0 2015-09-24

- more mixpanel functionality (thanks [Josh Dover](https://github.com/joshdover))
  - mixpanel api:
    - distinctId
    - registerSuperProperties
  - mixpanel people api:
    - registerPushToken
- perform arguments checks in js instead in native code


### 1.2.1 2015-05-29

- plugin.xml - dont use use 'android-minSdkVersion' preference


### 1.2.0 2015-05-26

- plugin.xml - use 'android-minSdkVersion' smarter cordova preference instead of 'uses-sdk' (thanks [Florian Holzhauer](https://github.com/fh))
- min required cordova-cli is now 3.5.0, to support the smart preference mentioned above


### 1.1.0 2015-05-11

- basic mixpanel people api
  - identify
  - set
  

### 1.0.0 2015-04-19

- basic mixpanel api
  - alias
  - flush
  - identify
  - init
  - reset
  - track