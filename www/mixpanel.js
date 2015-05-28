'use strict';

var exec = require('cordova/exec'),
  mixpanel = {
    people: {}
  },
  initialized = false,
  errors = {
    notInitialized: 'mixpanel not initialized',
    invalid: function(paramName, value) {
      return 'invalid ' + paramName + ': ' + value;
    }
  };


// MIXPANEL API


mixpanel.alias = mixpanel.createAlias = function(alias, originalId, onSuccess, onFail) {
  if (!initialized) onFail(errors.notInitialized);
  else if (!alias) onFail(errors.invalid('alias', alias));
  else exec(onSuccess, onFail, 'Mixpanel', 'alias', [alias, originalId]);
};

mixpanel.flush = function(onSuccess, onFail) {
  if (!initialized) onFail(errors.notInitialized);
  else exec(onSuccess, onFail, 'Mixpanel', 'flush', []);
};

mixpanel.identify = function(id, onSuccess, onFail) {
  if (!initialized) onFail(errors.notInitialized);
  else if (!id) onFail(errors.invalid('id', id));
  else exec(onSuccess, onFail, 'Mixpanel', 'identify', [id]);
};

mixpanel.init = function(token, onSuccess, onFail) {
  if (!token) onFail(errors.invalid('token', token));
  else {
    var wrappedSuccessFn = function() {
        initialized = true;
        onSuccess();
      },
      wrappedFailFn = function(err) {
        initialized = false;
        onFail(err);
      };
    exec(wrappedSuccessFn, wrappedFailFn, 'Mixpanel', 'init', [token]);
  }
};

mixpanel.reset = function(onSuccess, onFail) {
  if (!initialized) onFail(errors.notInitialized);
  else exec(onSuccess, onFail, 'Mixpanel', 'reset', []);
};

mixpanel.track = function(eventName, eventProperties, onSuccess, onFail) {
  if (!initialized) onFail(errors.notInitialized);
  else if (!eventName) onFail(errors.invalid('event', eventName));
  else exec(onSuccess, onFail, 'Mixpanel', 'track', [eventName, eventProperties]);
};


// PEOPLE API


mixpanel.people.identify = function(distinctId, onSuccess, onFail) {
  if (!initialized) onFail(errors.notInitialized);
  else if (!distinctId) onFail(errors.invalid('distinctId', distinctId));
  else exec(onSuccess, onFail, 'Mixpanel', 'people_identify', [distinctId]);
};

mixpanel.people.set = function(peopleProperties, onSuccess, onFail) {
  if (!initialized) onFail(errors.notInitialized);
  else if (!peopleProperties || (typeof peopleProperties === 'object' && Object.keys(peopleProperties).length === 0)) onFail(errors.invalid('properties', peopleProperties));
  else exec(onSuccess, onFail, 'Mixpanel', 'people_set', [peopleProperties]);
};


// Exports


module.exports = mixpanel;