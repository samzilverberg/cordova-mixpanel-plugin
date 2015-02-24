
### Cordova Plugin that wraps Mixpanel sdk for android and ios

- android sdk version 4.5.3
- ios sdk version 2.7.2

```
cordova plugin add https://github.com/samzilverberg/cordova-.git
```

#### currently supports

- window.mixpanel.flush(onSuccess, onFail)
- window.mixpanel.identify(distinctId, onSuccess, onFail)
- window.mixpanel.init(token, onSuccess, onFail)
- window.mixpanel.reset(onSuccess, onFail)
- window.mixpanel.track(eventName, eventProperties, onSuccess, onFail)


### TODO in near future
- add basic Mixpanel People operations
- add alias
