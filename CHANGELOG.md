Changelog
=========

### 4.6.2 2019-06-05
- update android lib from 5.6.0 to 5.6.2
- update ios lib from 3.4.4 to 3.4.6
 

### 4.6.1 2019-04-03
4.6.0 and 4.5.3 were broken versions because of accidental commit of ref to .DS_store file from plugin.xml.
released 4.6.1 and 4.5.4 with the fix (removing the ref)


### 4.6.0 2019-03-30
 - update android lib from 5.4.5 to 5.6.0
   - push notifs: FCM now replaces GCM
     see: https://github.com/mixpanel/mixpanel-android/releases/tag/v5.5.0
 - update ios lib from 3.4.1 to 3.4.4
 - BREAKING CHANGE: removed the android only `initPushHandling` fn

### 4.5.3 2019-03-30
 - update android lib from 5.4.4 to 5.4.5
 - update ios lib from 3.3.7 to 3.4.1

### 4.5.2 2018-12-27
 - update android lib from 5.4.1 to 5.4.4
 - update ios lib from 3.3.3 to 3.3.7

### 4.5.1 2018-12-27
 - mixpanel.people.initPushHandling : android only (thanks [Todd Vrba](https://github.com/SpellChucker)) 


### 4.5.0 2018-08-25
 - mixpanel.people.append
 - mixpanel.people.union
 - update android lib from 5.4.0 to 5.4.1
 - update ios lib from 3.3.2 to 3.3.3


### 4.4.1 2018-05-29
 - update android lib from 5.2.4 to 5.4.0
 - update ios lib from 3.2.3 to 3.3.2


### 4.4.0 2018-05-28 (DEPRECATED)
- unpublished from npm due to bug


### 4.3.2 2018-05-29
- ios: support identify with usePeople flag 
  - ty [Ödön Örzsik](https://github.com/orzsikodon) for [suggestion](https://github.com/samzilverberg/cordova-mixpanel-plugin/issues/89) and hotfix


### 4.3.1 2018-05-28 (DEPRECATED)
- unpublished from npm due to bug


### 4.3.0 2018-04-24
- play-services version can be pinned via variable when adding the plugin (thanks [akhatri](https://github.com/akhatri)).
  - example: cordova plugin add cordova-plugin-mixpanel --variable PLAY_SERVICES_VERSION="11.8.0"
  - when not specifying variable default is '+' (as it was before)


### 4.2.0 2018-01-28
- update android lib from 5.2.1 to 5.2.4
- `mixpanel.alias` will use `mixpanel.distinctId` if originalId is invalid
- `mixpanel.alias` can be called with just alias and callback functions
  - this variant of alias will call and use `mixpanel.distinctId` as the originalId


### 4.1.0 2017-12-09
- update android lib from 5.1.4 to 5.2.1
- update ios lib from 3.2.0 to 3.2.3
- small correction to README and to repo url (thanks [Jørgen Svennevik Notland](https://github.com/jQrgen) and [Bruno Freitas](https://github.com/brunosfreitas))


### 4.0.0 2017-09-15

major version upgrade from 3.x->4.x:   
reverted usage of cocoapods for ios lib installation, mixpanel source is included in repo.

- update ios lib from 3.1.9 to 3.2.0
- mixpanel.unregisterSuperProperty
- mixpanel.getSuperProperties
- mixpanel.registerSuperPropertiesOnce


### 3.1.0 2017-07-25
- update android lib from 5.0.2 to 5.1.4
- update ios lib from 3.1.4 to 3.1.9
- remove the deprecated showSurvey fn
- add faq entry for pod problems (thanks [Daniel López](https://github.com/dlopezp))


### 3.0.1 2017-05-31
- update ios lib from 3.1.3 to 3.1.4
  - 3.1.4 is supposed to solve the C99 dialect problems by replacing any dialect related code with more "vanilla" code
- drop support for cordova version less than 5.x


### 3.0.0 2017-04-30

major version upgrade from 2.x->3.x: now using cocoapods for ios lib installation.

- update android lib from 4.9.8 to 5.0.2
- update ios lib from 3.0.6 to 3.1.3
  - use cocoapods to install the ios lib
- remove survey functionality as its been removed in the mixpanel libs
- specify engine requirements in package.json instead in plugin.xml


### 2.3.5 2017-04-30
- C99 dialect build probs in UIImage+MPAverageColor.m:  
  manual code fix for it until next mixpanel-iphone version is released   
- support for angulartics by setting __loaded after init (thanks [mgregier](https://github.com/mgregier))
- update android lib from 4.9.6 to 4.9.8


### 2.3.4 2017-02-27
- update android lib from 4.9.2 to 4.9.6
- mixpanel.people.deleteUser (thanks [Julien Roubieu](https://github.com/julienroubieu))
- browser platform: small improvement to error handling on MixpanelProxy.js (thanks [Damien Fa](https://github.com/damienfa))


### 2.3.3 2016-11-21
- deprecated mixpanel.people.identify
  - mixpanel.identify will already set the id for use in tracking events and people api


### 2.3.2 2016-11-19
- mixpanel.people.trackCharge (thanks [Emmanuel Prochasson](https://github.com/eprochasson) for providing the base)
- mixpanel.people.unset


### 2.3.1 2016-11-19
- republish because of accidental npmjs mistake


### 2.3.0 2016-11-19
- update android lib from 4.9.1 to 4.9.2
  - NOTICE: 4.9.2 requires Google Play Services > 7.5.0
- update ios lib from 3.0.0 to 3.0.6
  - ios 10 should now be supported in case anyone had problems with it


### 2.2.1 2016-08-09
- android play services dependency as wildcard version to avoid conflict with other plugins (thanks [ZiFFeL1992](https://github.com/ZiFFeL1992))


### 2.2.0 2016-07-31
- update ios lib from 2.9.1 to 3.0.0 (thanks [Timan Rebel](https://github.com/timanrebel))
- update android lib from 4.7.0 to 4.9.1 and use maven repo (thanks [Timan Rebel](https://github.com/timanrebel))
- add TimeEvent methods (thanks [Jon Smart](https://github.com/JonSmart))
- add typescript declarations file (thanks [Jon Smart](https://github.com/JonSmart))


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
