
## Cordova Plugin that wraps Mixpanel sdk for android and ios

- [android sdk version 5.6.2](https://github.com/mixpanel/mixpanel-android/tree/v5.6.2)
- [ios sdk version 3.4.6](https://github.com/mixpanel/mixpanel-iphone/tree/v3.4.6)


#### Install

requires cordova >5.x.x

```
  cordova plugin add cordova-plugin-mixpanel
```

*Optional Preferences*: 

- `PLAY_SERVICES_VERSION`: default value `+`
- `FIREBASE_VERSION`: default value `+`

You can use the above plugin preferences to explicitly specify a google play services or firebase messages version (to avoid version conflicts with other existing plugins)

example:
```
cordova plugin add cordova-plugin-mixpanel --variable PLAY_SERVICES_VERSION="11.8.0"
```

#### Initialization and quick start

init the plugin with your mixpanel project token with
```
  mixpanel.init(your-token,
    function(){ /* successful init */ },
    function(){ /* fail */})
```
and then followup with all your favorite mixpanel functionality.<br/>
`mixpanel.track` to track events.<br/>
`alias` or `identify` (depending on use case) to set the id for people events (after login or register).<br/>
`people.set` to set properties on the people entity identified before.<br/>
you can read more about mixpanel api in their reference: https://mixpanel.com/help/reference <br/>


#### Usage

**window.mixpanel:**

- alias(aliasId, originalId, onSuccess, onFail)
  - also available as ```createAlias```
- alias(aliasId, onSuccess, onFail)
  - will use `distinctId` from mixpanel sdk as originalId
- distinctId(function onSuccess(distinctId), onFail)
- flush(onSuccess, onFail)
- getSuperProperties(onSuccess, onFail)
- identify(distinctId, onSuccess, onFail)
- identify(distinctId, usePeople, onSuccess, onFail)
  - only affects ios: will pass `usePeople` to the ios mixpanel sdk identify method
- init(token, onSuccess, onFail)
- registerSuperProperties(superProperties, onSuccess, onFail)
- registerSuperPropertiesOnce(superProperties, onSuccess, onFail)
- reset(onSuccess, onFail)
- timeEvent(eventName, onSuccess, onFail)
- track(eventName, eventProperties, onSuccess, onFail)
- unregisterSuperProperty(superPropertyName, onSuccess, onFail)

**window.mixpanel.people:**

- append(appendObject, onSuccess, onFail)
- deleteUser(onSuccess, onFail)
- increment(peopleProperties, onSuccess, onFail)
- setPushId(pushId, onSuccess, onFail)
  - use to manually send a push notifications token to mixpanel
    - [android](http://mixpanel.github.io/mixpanel-android/com/mixpanel/android/mpmetrics/MixpanelAPI.People.html#setPushRegistrationId-java.lang.String)
    - [ios](https://mixpanel.com/help/reference/ios-push-notifications)
  - Usage example using the [PhoneGap Push Plugin](https://github.com/phonegap/phonegap-plugin-push):
  ```
    var push = PushNotification.init({
        'android': {},
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
- union(unionObject, onSuccess, onFail)


## Contributing and Testing

contributions of all sorts to the source code are more than welcome.
any contribution will be noted in the changeslog (for FAME! :-D ).

Please try to test your contributions using your cordova project or a dummy test project.
You may use mine which i've published to NPM:
https://www.npmjs.com/package/cordova-mixpanel-plugin-testapp


## License Notice

All Mixpanel ios sdk source files under `src/ios/Mixpanel` are licensed under the apache license.<br/>
A copy of the license is located at `src/ios/Mixpanel/LICENSE`.<br/>

The rest of the code is MIT license, located at `/LICENSE`.


## Troubleshooting

### IOS

#### hey i installed the plugin and now build fails, why?

open your xcode proj, goto **build phases -> link binary with libraries**:
  - drag all files under folder 'frameworks' (on the left) to here
  - add the following if missing:
      - libicucore
      - cfnetwork


#### my build still fails, got a compile error at UIImage+MPAverageColor.m

if your got this error: "variable-sized object may not be initialized" from `char colorIndices[kNumberOfHexColors] = {0};`.<br/>
this is caused by compiler using a wrong C dialect (C99 for example).<br/>
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
