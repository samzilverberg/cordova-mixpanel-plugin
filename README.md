
## Cordova Plugin that wraps Mixpanel sdk for android and ios

- [Android SDK version 5.8.6](https://github.com/mixpanel/mixpanel-android/tree/v5.8.6)
- [iOS SDK version 3.6.5](https://github.com/mixpanel/mixpanel-iphone/tree/v3.6.5)

*NOTE: this version currenty doesn't support apple watch due to some deprecation of watchkit in xcode 11. use the latest 4.6.x release if you need apple watch support*


#### Install

Requires Cordova > 5.x.x

```
  cordova plugin add cordova-plugin-mixpanel
```

*Optional Preferences*: 

- `PLAY_SERVICES_VERSION`: default value `+`
- `FIREBASE_VERSION`: default value `+`

You can use the above plugin preferences to explicitly specify a google play services or firebase messages version (to avoid version conflicts with other existing plugins)

example:
```
cordova plugin add cordova-plugin-mixpanel --variable PLAY_SERVICES_VERSION="17.0.0"
```

#### Initialization and quick start

Init the plugin with your mixpanel project token with
```
  mixpanel.init(your-token,
    function(){ /* successful init */ },
    function(){ /* fail */})
```
and then followup with all your favorite mixpanel functionality.<br/>
`mixpanel.track` to track events.<br/>
`alias` or `identify` (depending on use case) to set the id for people events (after login or register).<br/>
`people.set` to set properties on the people entity identified before.<br/>
You can read more about mixpanel api in their reference: https://mixpanel.com/help/reference <br/>


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

Contributions of all sorts to the source code are more than welcome.
Any contribution will be noted in the changelog (for FAME! :-D ).

Please try to test your contributions using your cordova project or a dummy test project.
You may use mine which i've published to NPM:
https://www.npmjs.com/package/cordova-mixpanel-plugin-testapp


## License Notice

All Mixpanel ios sdk source files under `src/ios/Mixpanel` are licensed under the apache license.<br/>
A copy of the license is located at `src/ios/Mixpanel/LICENSE`.<br/>

The rest of the code is MIT license, located at `/LICENSE`.


## Troubleshooting

### IOS

#### Hey I installed the plugin and now build fails, why?

Open your xcode proj, goto **build phases -> link binary with libraries**:
  - drag all files under folder 'frameworks' (on the left) to here
  - add the following if missing:
      - libicucore
      - cfnetwork


#### My build still fails, got a compile error at UIImage+MPAverageColor.m

If your got this error: "variable-sized object may not be initialized" from `char colorIndices[kNumberOfHexColors] = {0};`.<br/>
This is caused by compiler using a wrong C dialect (C99 for example).<br/>
To fix:
- open your project in xcode
- goto build settings tab
- scroll down to "apple llvm 8.0 - language"
- set "C language dialect" to be default


#### I get error 'Mixpanel' plugin not found, check config.xml

Appears to be some problem of the Xcode project settings.<br/>
Only working solution I found so far is to
```
cordova platform remove ios
cordova platform add ios
cordova build ios
```
and setting up the build phase correctly again, as described in last question.


#### Hey I'm on iOS>9 and nothing is happening, why?

Google for NSAppTransportSecurity.<br/>
Since iOS 9 they are more strict about what your app is allowed to connect to.<br/>
You will have to manually add some entries to your app plist file to allow network connectivity to mixpanel server.


### Android

#### My build fails, wat? why?

Mixpanel lib depends on google play services 3.1 or higher.<br/>
You can install this through the android sdk under extras category.<br/>
FYI this plugin registers a dependency on ANY version of play services so it doesnt conflict with other plugins in any way.


#### Firebase error: No virtual method getInstanceId() 

If your'e getting some sort of error like this:

```
java.lang.NoSuchMethodError: No virtual method getInstanceId()Lcom/google/android/gms/tasks/Task; 
in class Lcom/google/firebase/iid/FirebaseInstanceId
```

make sure your project is using fire base version > 16.2.x.

see following issue for more info:
https://github.com/samzilverberg/cordova-mixpanel-plugin/issues/105


### Ionic Capacitor & Android

#### Manifest merger failed

If you get a similar message to this
```
ERROR: Manifest merger failed : Attribute application@appComponentFactory value=(android.support.v4.app.CoreComponentFactory) from [com.android.support:support-compat:28.0.0] AndroidManifest.xml:22:18-91
	is also present at [androidx.core:core:1.0.0] AndroidManifest.xml:22:18-86 value=(androidx.core.app.CoreComponentFactory).
	Suggestion: add 'tools:replace="android:appComponentFactory"' to <application> element at AndroidManifest.xml:5:5-43:19 to override.
```

Open the build gradle for android, and in the section of `allprojects` add the following:
```
allprojects {
    ...

    configurations.all {
        resolutionStrategy {
            force "com.google.android.gms:play-services-base:16.0.1"
            force "com.google.firebase:firebase-messaging:18.0.0"
        }
    }
}
```

This will force to use those packages to use those specified versions (adapt the versions to the ones you use/wish). Capacitor is not compatible with androidx yet.


##### Keywords
mixpanel, plugin cordova, phonegap, ionic, android, ios
