'use strict';

var exec = require('cordova/exec'),
  mixpanel = {
    people: {}
  },
  errors = {
    invalid: function(paramName, value) {
      return 'invalid ' + paramName + ': ' + value;
    }
  };


// MIXPANEL API


mixpanel.alias = mixpanel.createAlias = function(alias, originalId, onSuccess, onFail) {
  if (!alias || typeof alias !== 'string') {
    return onFail(errors.invalid('alias', alias));
  }

  exec(onSuccess, onFail, 'Mixpanel', 'alias', [alias, originalId]);
};

mixpanel.distinctId = function(onSuccess, onFail) {
  exec(onSuccess, onFail, 'Mixpanel', 'distinctId');
};

mixpanel.flush = function(onSuccess, onFail) {
  exec(onSuccess, onFail, 'Mixpanel', 'flush', []);
};

mixpanel.identify = function(id, onSuccess, onFail) {
  if (!id || typeof id !== 'string') {
    return onFail(errors.invalid('id', id));
  }

  exec(onSuccess, onFail, 'Mixpanel', 'identify', [id]);
};

mixpanel.init = function(token, onSuccess, onFail) {
  if (!token || typeof token != 'string') {
    return onFail(errors.invalid('token', token));
  }

  exec(onSuccess, onFail, 'Mixpanel', 'init', [token]);
};

mixpanel.registerSuperProperties = function(superProperties, onSuccess, onFail) {
  if (!superProperties || typeof superProperties !== 'object') {
    return onFail(errors.invalid('superProperties', superProperties));
  }

  exec(onSuccess, onFail, 'Mixpanel', 'registerSuperProperties', [superProperties]);
};

mixpanel.reset = function(onSuccess, onFail) {
  exec(onSuccess, onFail, 'Mixpanel', 'reset', []);
};

mixpanel.showSurvey = function(onSuccess, onFail) {
  exec(onSuccess, onFail, 'Mixpanel', 'showSurvey', []);
};

mixpanel.track = function(eventName, eventProperties, onSuccess, onFail) {
  if (!eventName || typeof eventName != 'string') {
    return onFail(errors.invalid('event', eventName));
  }

  exec(onSuccess, onFail, 'Mixpanel', 'track', [eventName, eventProperties]);
};


// PEOPLE API


mixpanel.people.identify = function(distinctId, onSuccess, onFail) {
  if (!distinctId) {
    return onFail(errors.invalid('distinctId', distinctId));
  }

  exec(onSuccess, onFail, 'Mixpanel', 'people_identify', [distinctId]);
};

mixpanel.people.set = function(peopleProperties, onSuccess, onFail) {
  if (!peopleProperties || (typeof peopleProperties === 'object' && Object.keys(peopleProperties).length === 0)) {
    return onFail(errors.invalid('properties', peopleProperties));
  }

  exec(onSuccess, onFail, 'Mixpanel', 'people_set', [peopleProperties]);
};

mixpanel.people.setOnce = function(peopleProperties, onSuccess, onFail) {
  if (!peopleProperties || (typeof peopleProperties === 'object' && Object.keys(peopleProperties).length === 0)) {
    return onFail(errors.invalid('properties', peopleProperties));
  }

  exec(onSuccess, onFail, 'Mixpanel', 'people_set_once', [peopleProperties]);
};

mixpanel.people.increment = function(peopleProperties, onSuccess, onFail) {
  if (!peopleProperties || (typeof peopleProperties === 'object' && Object.keys(peopleProperties).length === 0)) {
    return onFail(errors.invalid('properties', peopleProperties));
  }

  exec(onSuccess, onFail, 'Mixpanel', 'people_increment', [peopleProperties]);
};

/**
 * @param pushId is the token/id you get back when registering the device with the notification service
 *        for android - this is the GCM token
 *        for ios - this is the APN token
 */
mixpanel.people.setPushId = function(pushId, onSuccess, onFail) {
  if (!pushId || typeof pushId !== 'string') {
    return onFail(errors.invalid('pushId', pushId));
  }

  exec(onSuccess, onFail, 'Mixpanel', 'people_setPushId', [pushId]);
};


// Exports


module.exports = mixpanel;
