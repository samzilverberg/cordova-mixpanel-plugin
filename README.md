
## Cordova Plugin that wraps Mixpanel sdk for android and ios

- [android sdk version 4.5.3](https://github.com/mixpanel/mixpanel-android/tree/v4.5.3)
- [ios sdk version 2.7.2](https://github.com/mixpanel/mixpanel-iphone/tree/v2.7.2)

#### Install

```
cordova plugin add https://github.com/samzilverberg/cordova-mixpanel-plugin.git
```

#### Usage

**window.mixpanel:**

- alias(aliasId, originalId, onSuccess, onFail)
  - also available as ```createAlias```
- distinctId(function onSuccess(distinctId), onFail)
- flush(onSuccess, onFail)
- identify(distinctId, onSuccess, onFail)
- init(token, onSuccess, onFail)
- registerSuperProperties(superProperties, onSuccess, onFail)
- reset(onSuccess, onFail)
- track(eventName, eventProperties, onSuccess, onFail)

**window.mixpanel.people:**

- identify(distinctId, onSuccess, onFail)
- registerPushToken(apnsOrGcmToken, onSuccess, onFail)
  - More info about push notifications at:
    - [android](https://mixpanel.com/site_media/doctyl/uploads/Android-spec/com/mixpanel/android/mpmetrics/MixpanelAPI.People.html#initPushHandling(java.lang.String))
    - [ios](https://mixpanel.com/help/reference/ios-push-notifications)
- set(peopleProperties, onSuccess, onFail)


## TODOs

- check if sdks need to be updated
- [publish to npm](https://cordova.apache.org/announcements/2015/04/21/plugins-release-and-move-to-npm.html)
- add more Mixpanel People operations
  - set once, unset, increment, delete (more?)
- make sure ios/android use same error messages
- refactor ios code
  - remove code duplication of checking that mixpanel was init



## Troubleshooting

### IOS

#### hey i installed the plugin and now build fails, why?

open your xcode proj, goto **build phases -> link binary with libraries**:
  - drag all files under folder 'frameworks' (on the left) to here
  - add the following if missing:
      - libicucore
      - cfnetwork

#### i get error 'Mixpanel' plugin not found, check config.xml

appears to be some problem of the xcode proj settings.
only working solution i found so far is to
```
cordova platform remove ios
cordova platform add ios
cordova build ios
```
and setting up the build phase correctly again, as described in last question.



##### Keywords
mixpanel, plugin cordova, phonegap, ionic, android, ios
