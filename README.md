
### Cordova Plugin that wraps Mixpanel sdk for android and ios

- android sdk version 4.5.3
- ios sdk version 2.7.2

```
cordova plugin add https://github.com/samzilverberg/cordova-mixpanel-plugin.git
```

#### Usage

window.mixpanel:

- .flush(onSuccess, onFail)
- .identify(distinctId, onSuccess, onFail)
- .init(token, onSuccess, onFail)
- .reset(onSuccess, onFail)
- .track(eventName, eventProperties, onSuccess, onFail)

### TODO in near future

- add basic Mixpanel People operations
- add .alias(alias, originalId) (also 'createAlias')



## Troubleshooting

### IOS

#### hey i installed the plugin and now build fails, why?

open your xcode proj, goto build phases -> link binary with libraries:
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
and setting up the build phase correctly again.