
## NOTE: unmaintained & looking for maintainers (since 07-2022)

First: This plugin works! so don't be afraid to try it.

I wasn't able to find any time in the last year (2022) to actively update the libs.
It's gotten to the point that my dev env is not even setup correctly anymore (new computer) and I can't even find time to set it up properly anymore.

If anyone wants to continue maintaining this contact me.

Maintenance is pretty simple: just update the libs, `cordova build android/ios` to see that it works after the update, and maybe update the api a little once in a while.

If your'e interested but want to totally rewrite / refactor that's also fine by me.
as long as you release as a major version so you don't break versions that are actively used.

## Cordova Plugin that wraps Mixpanel sdk for android and ios

- [Android SDK version 6.2.2](https://github.com/mixpanel/mixpanel-android/tree/v6.2.2)
- [iOS SDK version 4.1.5](https://github.com/mixpanel/mixpanel-iphone/tree/v4.1.5)

#### Install

Requires Cordova > 5.x.x

```
  cordova plugin add cordova-plugin-mixpanel
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
