'use strict';

var exec = require('cordova/exec'),
  mixpanel = {
    people: {}
  };


// MIXPANEL API


mixpanel.alias = mixpanel.createAlias = function(alias, originalId, onSuccess, onFail) {
  exec(onSuccess, onFail, 'Mixpanel', 'alias', [alias, originalId]);
};

mixpanel.flush = function(onSuccess, onFail) {
  exec(onSuccess, onFail, 'Mixpanel', 'flush', []);
};

mixpanel.identify = function(id, onSuccess, onFail) {
  exec(onSuccess, onFail, 'Mixpanel', 'identify', [id]);
};

mixpanel.init = function(token, onSuccess, onFail) {
  exec(onSuccess, onFail, 'Mixpanel', 'init', [token]);
};

mixpanel.register = function(superProperties, onSuccess, onFail) {
  exec(onSuccess, onFail, 'Mixpanel', 'register', [superProperties]);
};

mixpanel.reset = function(onSuccess, onFail) {
  exec(onSuccess, onFail, 'Mixpanel', 'reset', []);
};

mixpanel.track = function(eventName, eventProperties, onSuccess, onFail) {
  exec(onSuccess, onFail, 'Mixpanel', 'track', [eventName, eventProperties]);
};


// PEOPLE API


mixpanel.people.identify = function(distinctId, onSuccess, onFail) {
  exec(onSuccess, onFail, 'Mixpanel', 'people_identify', [distinctId]);
};

mixpanel.people.set = function(peopleProperties, onSuccess, onFail) {
  exec(onSuccess, onFail, 'Mixpanel', 'people_set', [peopleProperties]);
};

mixpanel.people.registerPushToken = function(pushToken, onSuccess, onFail) {
  exec(onSuccess, onFail, 'Mixpanel', 'people_registerPushToken', [pushToken]);
};

// Exports


module.exports = mixpanel;
