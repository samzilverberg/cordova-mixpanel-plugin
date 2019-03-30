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


/**
 * can be called in two ways:
 * - with 4 args, as function signature
 * - with 3 args `mixpanel.alias(alias, onSuccess, onFail)`
 */
mixpanel.alias = mixpanel.createAlias = function(alias, originalId, onSuccess, onFail) {
  if (!alias || typeof alias !== 'string') {
    return onFail(errors.invalid('alias', alias));
  }

  if (arguments.length === 3 && typeof originalId === 'function'){
    onFail = onSuccess;
    onSuccess = originalId;
    originalId = null;
  }

  if (!originalId || typeof originalId !== 'string'){
    mixpanel.distinctId(
      function(distinctId){
        exec(onSuccess, onFail, 'Mixpanel', 'alias', [alias, distinctId]);
      }, 
      onFail
    );
  } else {
    exec(onSuccess, onFail, 'Mixpanel', 'alias', [alias, originalId]);  
  }
};

mixpanel.distinctId = function(onSuccess, onFail) {
  exec(onSuccess, onFail, 'Mixpanel', 'distinctId', []);
};

mixpanel.flush = function(onSuccess, onFail) {
  exec(onSuccess, onFail, 'Mixpanel', 'flush', []);
};

mixpanel.getSuperProperties = function(onSuccess, onFail) {
  exec(onSuccess, onFail, 'Mixpanel', 'getSuperProperties', []);
};


/**
 * can be called in two ways:
 * - with 3 args `mixpanel.alias(alias, onSuccess, onFail)`
 * - with 4 args, as function signature
 *     in this case, "usePeople" boolean will be passed to ios mixpanel sdk, as documented here:
 *     https://github.com/mixpanel/mixpanel-iphone/releases/tag/v3.2.0
 *     NOTE: usePeople has no effect on android
 */
mixpanel.identify = function(id, usePeople, onSuccess, onFail) {
  if (!id || typeof id !== 'string') {
    return onFail(errors.invalid('id', id));
  }

  if (arguments.length === 3 && typeof usePeople === 'function'){
    onFail = onSuccess;
    onSuccess = usePeople;
    usePeople = true;
  }

  exec(onSuccess, onFail, 'Mixpanel', 'identify', [id, !!usePeople]);
};

mixpanel.init = function(token, onSuccess, onFail) {
  if (!token || typeof token != 'string') {
    return onFail(errors.invalid('token', token));
  }

  var onSuccessWrapper = function(){
    mixpanel['__loaded'] = true;
    onSuccess.apply(onSuccess, arguments);
  }

  exec(onSuccessWrapper, onFail, 'Mixpanel', 'init', [token]);
};

mixpanel.registerSuperProperties = function(superProperties, onSuccess, onFail) {
  if (!superProperties || typeof superProperties !== 'object') {
    return onFail(errors.invalid('superProperties', superProperties));
  }

  exec(onSuccess, onFail, 'Mixpanel', 'registerSuperProperties', [superProperties]);
};

mixpanel.registerSuperPropertiesOnce = function(superProperties, onSuccess, onFail) {
  if (!superProperties || typeof superProperties !== 'object') {
    return onFail(errors.invalid('superProperties', superProperties));
  }

  exec(onSuccess, onFail, 'Mixpanel', 'registerSuperPropertiesOnce', [superProperties]);
};

mixpanel.reset = function(onSuccess, onFail) {
  exec(onSuccess, onFail, 'Mixpanel', 'reset', []);
};

mixpanel.timeEvent = function(eventName, onSuccess, onFail) {
  if (!eventName || typeof eventName != 'string') {
    return onFail(errors.invalid('event', eventName));
  }
  exec(onSuccess, onFail, 'Mixpanel', 'timeEvent', [eventName]);
};

mixpanel.track = function(eventName, eventProperties, onSuccess, onFail) {
  if (!eventName || typeof eventName != 'string') {
    return onFail(errors.invalid('event', eventName));
  }

  exec(onSuccess, onFail, 'Mixpanel', 'track', [eventName, eventProperties]);
};

mixpanel.unregisterSuperProperty = function(superPropertyName, onSuccess, onFail) {
  if (!superPropertyName || typeof superPropertyName != 'string') {
    return onFail(errors.invalid('superPropertyName', superPropertyName));
  }
  exec(onSuccess, onFail, 'Mixpanel', 'unregisterSuperProperty', [superPropertyName]);
};


// PEOPLE API


/**
 * @param {*} appendObject example:
 *      {
 *        'key1': [values to append to key1],
 *        'key2': [values to append to key2]
 *      }
 */
mixpanel.people.append = function(appendObject, onSuccess, onFail) {
  if (!appendObject || typeof appendObject !== 'object') {
    return onFail(errors.invalid('appendObject', appendObject));
  }
  var keys = Object.keys(appendObject);
  for (var i=0; i < keys.length; i++) {
    if (!Array.isArray(appendObject[keys[i]])) {
      return onFail(errors.invalid('appendObject', appendObject));
    }
  }

  exec(onSuccess, onFail, 'Mixpanel', 'people_append', [appendObject]);
};

mixpanel.people.deleteUser = function(onSuccess, onFail) {
  exec(onSuccess, onFail, 'Mixpanel', 'people_deleteUser', []);
};

/** @deprecated 2016-11-21 mixpanel.identify will set id for both events and people */
mixpanel.people.identify = function(distinctId, onSuccess, onFail) {
  if (!distinctId) {
    return onFail(errors.invalid('distinctId', distinctId));
  }

  exec(onSuccess, onFail, 'Mixpanel', 'identify', [distinctId]);
};

mixpanel.people.increment = function(peopleProperties, onSuccess, onFail) {
  if (!peopleProperties || (typeof peopleProperties === 'object' && Object.keys(peopleProperties).length === 0)) {
    return onFail(errors.invalid('properties', peopleProperties));
  }

  exec(onSuccess, onFail, 'Mixpanel', 'people_increment', [peopleProperties]);
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

/**
 * @param pushId is the token/id you get back when registering the device with the notification service
 *        for android - this is the FCM token
 *        for ios - this is the APN token
 */
mixpanel.people.setPushId = function(pushId, onSuccess, onFail) {
  if (!pushId || typeof pushId !== 'string') {
    return onFail(errors.invalid('pushId', pushId));
  }

  exec(onSuccess, onFail, 'Mixpanel', 'people_setPushId', [pushId]);
};

mixpanel.people.trackCharge = function(amount, chargeProperties, onSuccess, onFail) {
  if (typeof amount !== 'number' || !isFinite(amount)) {
    return onFail(errors.invalid('amount', amount));
  }
  if (chargeProperties && typeof chargeProperties !== 'object') {
    return onFail(errors.invalid('chargeProperties', chargeProperties));
  }


  exec(onSuccess, onFail, 'Mixpanel', 'people_track_charge', [amount, chargeProperties]);
};

/**
 * @param {*} unionObject example:
 *      {
 *        'key1': [values to union into key1],
 *        'key2': [values to union into key2]
 *      }
 */
mixpanel.people.union = function(unionObject, onSuccess, onFail) {
  if (!unionObject || typeof unionObject !== 'object') {
    return onFail(errors.invalid('unionObject', unionObject));
  }
  var keys = Object.keys(unionObject);
  for (var i=0; i < keys.length; i++) {
    if (!Array.isArray(unionObject[keys[i]])) {
      return onFail(errors.invalid('unionObject', unionObject));
    }
  }

  exec(onSuccess, onFail, 'Mixpanel', 'people_union', [unionObject]);
};

mixpanel.people.unset = function(propertiesArray, onSuccess, onFail) {
  if (!Array.isArray(propertiesArray)) {
    return onFail(errors.invalid('propertiesArray', propertiesArray));
  }

  exec(onSuccess, onFail, 'Mixpanel', 'people_unset', [propertiesArray]);
};


// Exports


module.exports = mixpanel;
