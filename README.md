
### Cordova Plugin that wraps Mixpanel sdk for android and ios

- [android sdk version 4.5.3](https://github.com/mixpanel/mixpanel-android/tree/v4.5.3)
- [ios sdk version 2.7.2](https://github.com/mixpanel/mixpanel-iphone/tree/v2.7.2)

```
cordova plugin add https://github.com/samzilverberg/cordova-mixpanel-plugin.git
```

#### Usage

window.mixpanel:

- alias(aliasId, originalId, onSuccess, onFail)
  - also available as ```createAlias```
- flush(onSuccess, onFail)
- identify(distinctId, onSuccess, onFail)
- init(token, onSuccess, onFail)
- reset(onSuccess, onFail)
- track(eventName, eventProperties, onSuccess, onFail)

### TODO in near future

- add basic Mixpanel People operations



## Troubleshooting

### IOS

#### hey i installed the plugin and now build fails, why?

open your xcode proj, goto **build phases -> link binary with libraries**:
  - drag all files under folder 'frameworks' (on the left) to here
  - add these two:
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