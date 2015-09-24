Changelog
=========

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