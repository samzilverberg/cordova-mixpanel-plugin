
## Cordova Plugin that wraps Mixpanel sdk for android and ios

- [android sdk version 4.9.2](https://github.com/mixpanel/mixpanel-android/tree/v4.9.2)
- [ios sdk version 3.0.6](https://github.com/mixpanel/mixpanel-iphone/tree/v3.0.6)

#### Install

```
for cordova version > 5.x.x:
  cordova plugin add cordova-plugin-mixpanel

older versions:
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
- showSurvey(onSuccess, onFail) **currently only iOS**
  -  by default the SDK attempts to show any available survey at app launch.  If you'd like to trigger a survey after a particular action though use this.

**window.mixpanel.people:**

- increment(peopleProperties, onSuccess, onFail)
- setPushId(pushId, onSuccess, onFail)
  - More info about push notifications at:
    - [android](https://mixpanel.com/site_media/doctyl/uploads/Android-spec/com/mixpanel/android/mpmetrics/MixpanelAPI.People.html#initPushHandling(java.lang.String))
    - [ios](https://mixpanel.com/help/reference/ios-push-notifications)
  - Usage example using the [PhoneGap Push Plugin](https://github.com/phonegap/phonegap-plugin-push):
  ```
    var push = PushNotification.init({
        'android': {'senderID': '<GCM Sender ID>'},
        'ios': {'alert': 'true', 'badge': 'true', 'sound': 'true'}
    });
    push.on('registration', function(data) {
      mixpanel.people.setPushId(data.registrationId, function onSuccess(){}, function onFail(){});
    });
  ```
- set(peopleProperties, onSuccess, onFail)
- setOnce(peopleProperties, onSuccess, onFail)
- trackCharge(amount, chargeProperties, onSuccess, onFail)
- unset(propertiesArray, onSuccess, onFail)


## TODOs
- add more Mixpanel People operations
  - unset, delete (more?)
- make sure ios/android use same error messages
- refactor ios code
  - remove code duplication of checking that mixpanel was init


## Contributing and Testing

contributions of all sorts to the source code are more than welcome.
any contribution will be noted in the changeslog (for FAME! :-D ).

Please try to test your contributions using your cordova project or a dummy test project.
You may use mine which i've published to NPM:
https://www.npmjs.com/package/cordova-mixpanel-plugin-testapp


## Troubleshooting

### IOS

#### hey i installed the plugin and now build fails, why?

open your xcode proj, goto **build phases -> link binary with libraries**:
  - drag all files under folder 'frameworks' (on the left) to here
  - add the following if missing:
      - libicucore
      - cfnetwork


#### my build still fails, got a compile error at UIImage+MPAverageColor.m

if your got this error: "variable-sized object may not be initialized" from `char colorIndices[kNumberOfHexColors] = {0};`.
this is caused by compiler using a wrong C dialect (C99 for example).
to fix:
- open your project in xcode
- goto build settings tab
- scroll down to "apple llvm 8.0 - language"
- set "C language dialect" to be default


#### i get error 'Mixpanel' plugin not found, check config.xml

appears to be some problem of the xcode proj settings.<br/>
only working solution i found so far is to
```
cordova platform remove ios
cordova platform add ios
cordova build ios
```
and setting up the build phase correctly again, as described in last question.


#### hey i'm on iOS>9 and nothing is happening, why?

google for NSAppTransportSecurity.<br/>
since iOS9 they are more strict about what your app is allowed to connect to.<br/>
you will have to manually add some entries to your app plist file to allow network connectivity to mixpanel server.

### Android

#### my build fails, wat? why?

mixpanel lib depends on google play services 3.1 or higher.<br/>
you can install this through the android sdk under extras category.<br/>
FYI this plugin registers a dependency on ANY version of play services so it doesnt conflict with other plugins in any way.

##### Keywords
mixpanel, plugin cordova, phonegap, ionic, android, ios
