var MIXPANEL_LIB_URL = 'plugins/cordova-plugin-mixpanel/src/browser/mixpanel-js-lib.js';


var errors = {
  invalid: function(paramName, value) {
    if (typeof paramName !== 'string') {
      (console && console.error) && console.error(paramName, value);
      return "invalid";
    }
    if (typeof value !== 'string') {
      (JSON && JSON.stringify) && (value = JSON.stringify(value));
    }
    return 'invalid ' + paramName + ': ' + value;
  },
  notsupported: function(methodName) {
    if (typeof methodName !== 'string') {
      methodName = "[invalid methodName]";
    }
    return 'Cordova-Plugin-Mixpanel :  ' + methodName + ' is not supported...';
  }
};

window.mixpanel = null; // clean plugin method


// On Mixpanel lib Loaded
function on_mixpanel_loaded(callback) {

  // ALIAS
  mixpanel.original_alias = mixpanel.alias;
  mixpanel.alias = mixpanel.createAlias = function(alias, originalId, onSuccess, onFail) {

    if (!alias || typeof alias !== 'string') {
      if (onFail && typeof onFail === 'function')
        return onFail(errors.invalid('alias', alias));
      else return false;
    }

    // The original_alias function from MixPanel calls the track and identify functions, which have been changed by this library.
    // In version 2.39, if the result is smaller than 0, an error occured.
    var r = mixpanel.original_alias(alias, originalId);

    if (r < 0) {
      if (onFail && typeof onFail === 'function')
        return onFail(errors.invalid('alias', alias));
    } else {
      if (onSuccess && typeof onSuccess === 'function')
        return onSuccess();
    }
  };


  // DISTINCT_ID
  mixpanel.original_get_distinct_id = mixpanel.get_distinct_id;
  mixpanel.distinctId = function(onSuccess, onFail) {

    var distinctId = mixpanel.original_get_distinct_id();

    if (distinctId && onSuccess && typeof onSuccess === 'function')
      return onSuccess(distinctId);

    if (!distinctId && onFail && typeof onFail === 'function')
      return onFail(errors.invalid('distinctId', distinctId));

    return false;
  };


  // FLUSH
  mixpanel.flush = function(onSuccess, onFail) {
    if (onFail && typeof onFail === 'function')
      return onFail(errors.notsupported("flush"));
  };



  // IDENTIFY
  // usePeople is not used. people.identify does not exists in mixpanel-js
  mixpanel.original_identify = mixpanel.identify;
  mixpanel.identify = function(unique_id, usePeople, onSuccess, onFail) {

    if (!unique_id || typeof unique_id !== 'string') {
      if (onFail && typeof onFail === 'function')
        return onFail(errors.invalid('unique_id', unique_id));
      else return false;
    }

    mixpanel.original_identify(unique_id);
    if (onSuccess && typeof onSuccess === 'function')
      return onSuccess();

    return true;
  };

  // registerSuperProperties
  mixpanel.registerSuperProperties = function(superProperties, onSuccess, onFail) {
    if (!superProperties || typeof superProperties !== 'object') {
      if (onFail && typeof onFail === 'function')
        return onFail(errors.invalid('superProperties', superProperties));
      else return false;
    }

    if (onFail && typeof onFail === 'function')
      return onFail(errors.notsupported("registerSuperProperties"));
  };


  // RESET
  mixpanel.reset = function(onSuccess, onFail) {
    if (onFail && typeof onFail === 'function')
      return onFail(errors.notsupported("reset"));
  };


  // TRACK
  mixpanel.original_track = mixpanel.track;
  mixpanel.track = function(eventName, eventProperties, onSuccess, onFail) {

    if (!eventName || typeof eventName != 'string') {
      if (onFail && typeof onFail === 'function')
        return onFail(errors.invalid('event', eventName));
    }

    mixpanel.original_track(eventName, eventProperties, function(r) {
      if (!r) {
        if (onFail && typeof onFail === 'function')
          return onFail(errors.invalid('track', eventName));
      } else {
        if (onSuccess && typeof onSuccess === 'function')
          return onSuccess();
      }
    });

  };

  // @deprecated. people.identify does not exists in the mixpanel-js library.
  mixpanel.people.identify = function(distinctId, onSuccess, onFail) {
    return mixpanel.original_identify(distinctId, onSuccess, onFail);
  };


  mixpanel.people.original_set = mixpanel.people.set;
  mixpanel.people.set = function(peopleProperties, onSuccess, onFail) {
    if (!peopleProperties || (typeof peopleProperties === 'object' && Object.keys(peopleProperties).length === 0)) {
      if (onFail && typeof onFail === 'function')
        return onFail(errors.invalid('peopleProperties', peopleProperties));
    }

    mixpanel.people.original_set(peopleProperties, function(r) {
      if (r !== 1) {
        if (onFail && typeof onFail === 'function')
          return onFail(errors.invalid('people.set', peopleProperties));
      } else {
        if (onSuccess && typeof onSuccess === 'function')
          return onSuccess();
      }
    });

  };


  mixpanel.people.original_set_once = mixpanel.people.set_once;
  mixpanel.people.setOnce = function(peopleProperties, onSuccess, onFail) {
    if (!peopleProperties || (typeof peopleProperties === 'object' && Object.keys(peopleProperties).length === 0)) {
      if (onFail && typeof onFail === 'function')
        return onFail(errors.invalid('peopleProperties', peopleProperties));
    }

    mixpanel_js.people.original_set_once(peopleProperties, function(r) {
      if (typeof r !== "object") {
        if (onFail && typeof onFail === 'function')
          return onFail(errors.invalid('people.setOnce', peopleProperties));
      } else {
        if (onSuccess && typeof onSuccess === 'function')
          return onSuccess();
      }
    });

  };


  // TRACK CHARGE
  mixpanel.people.original_track_charge = mixpanel.people.track_charge;
  mixpanel.people.track_charge = function(charge, eventProperties, onSuccess, onFail) {

    if (!charge || typeof charge != 'number') {
      if (onFail && typeof onFail === 'function')
        return onFail(errors.invalid('charge', charge));
    }

    mixpanel.people.original_track_charge(charge, eventProperties, function(r) {
      if (!r) {
        if (onFail && typeof onFail === 'function')
          return onFail(errors.invalid('people.track_charge', charge));
      } else {
        if (onSuccess && typeof onSuccess === 'function')
          return onSuccess();
      }
    });

  };


  mixpanel.people.original_increment = mixpanel.people.increment;
  mixpanel.people.increment = function(peopleProperties, onSuccess, onFail) {
    if (!peopleProperties || (typeof peopleProperties === 'object' && Object.keys(peopleProperties).length === 0)) {
      if (onFail && typeof onFail === 'function')
        return onFail(errors.invalid('peopleProperties', peopleProperties));
    }

    mixpanel_js.people.original_increment(peopleProperties, function(r) {
      if (typeof r !== "object") {
        if (onFail && typeof onFail === 'function')
          return onFail(errors.invalid('people.increment', peopleProperties));
      } else {
        if (onSuccess && typeof onSuccess === 'function')
          return onSuccess();
      }
    });

  };


  mixpanel.people.original_deleteUser = mixpanel.people.delete_user;
  mixpanel.people.deleteUser = function(onSuccess, onFail) {
    return mixpanel.people.original_deleteUser(function(r) {
      if (typeof r !== "object") {
        if (onFail && typeof onFail === 'function')
          return onFail(errors.invalid('people.deleteUser'));
      } else {
        if (onSuccess && typeof onSuccess === 'function')
          return onSuccess();
      }
    });

  };


  // SetPushId
  mixpanel.people.setPushId = function(pushId, onSuccess, onFail) { // No push in browser, noooo ?
    if (onFail && typeof onFail === 'function')
      return onFail(errors.notsupported("setPushId", pushId));
  }


  if (callback && typeof callback === 'function') callback()
}


// On snippet Loaded
function on_snippet_loaded() {
  mixpanel.original_init = mixpanel.init;
  mixpanel.init = function(token, onSuccess, onFail) {
    var r = mixpanel.original_init(token, {
      'loaded': function() {
        setTimeout(function(){ on_mixpanel_loaded(onSuccess) }, 10); // Let the original_init function be executed after lib loaded
      }
    });
  }
}



// SNIPET Mixpanel 1.2 (modified : setup an onload event )
(function(document, mixpanel) {
  // Only stub out if this is the first time running the snippet.
  if (!mixpanel['__SV']) {
    var script, first_script, gen_fn, functions, i, lib_name = "mixpanel";
    window[lib_name] = mixpanel;

    mixpanel['_i'] = [];

    mixpanel['init'] = function(token, config, name) {
      // support multiple mixpanel instances
      var target = mixpanel;
      if (typeof(name) !== 'undefined') {
        target = mixpanel[name] = [];
      } else {
        name = lib_name;
      }

      // Pass in current people object if it exists
      target['people'] = target['people'] || [];
      target['toString'] = function(no_stub) {
        var str = lib_name;
        if (name !== lib_name) {
          str += "." + name;
        }
        if (!no_stub) {
          str += " (stub)";
        }
        return str;
      };
      target['people']['toString'] = function() {
        // 1 instead of true for minifying
        return target.toString(1) + ".people (stub)";
      };

      function _set_and_defer(target, fn) {
        var split = fn.split(".");
        if (split.length == 2) {
          target = target[split[0]];
          fn = split[1];
        }
        target[fn] = function() {
          target.push([fn].concat(Array.prototype.slice.call(arguments, 0)));
        };
      }

      // create shallow clone of the public mixpanel interface
      // Note: only supports 1 additional level atm, e.g. mixpanel.people.set, not mixpanel.people.set.do_something_else.
      functions = "disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(' ');
      for (i = 0; i < functions.length; i++) {
        _set_and_defer(target, functions[i]);
      }

      // register mixpanel instance
      mixpanel['_i'].push([token, config, name]);
    };

    // Snippet version, used to fail on new features w/ old snippet
    mixpanel['__SV'] = 1.2;

    script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;

    var onComplete = function() {
      if (on_snippet_loaded) on_snippet_loaded();
    };

    script.onreadystatechange = script.onload = function() {
      var state = script.readyState;
      if (!state || /loaded|complete/.test(state)) {
        onComplete();
      }
    };


    if (typeof MIXPANEL_CUSTOM_LIB_URL !== 'undefined') {
      script.src = MIXPANEL_CUSTOM_LIB_URL;
    } else if (document.location.protocol === 'file:' && MIXPANEL_LIB_URL.match(/^\/\//)) {
      script.src = 'https:' + MIXPANEL_LIB_URL;
    } else {
      script.src = MIXPANEL_LIB_URL;
    }

    first_script = document.getElementsByTagName("script")[0];
    first_script.parentNode.insertBefore(script, first_script);
  }
  // Pass in current Mixpanel object if it exists (for ppl like Optimizely)
})(document, window['mixpanel'] || []);


module.exports = window.mixpanel;

require("cordova/exec/proxy").add("Mixpanel", module.exports);
