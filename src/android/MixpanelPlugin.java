package com.samz.cordova.mixpanel;

import android.content.Context;
import android.text.TextUtils;
import com.mixpanel.android.mpmetrics.MixpanelAPI;

import java.util.Map;
import java.util.HashMap;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.LOG;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class MixpanelPlugin extends CordovaPlugin {

    private static String LOG_TAG = "MIXPANEL PLUGIN";
    private static MixpanelAPI mixpanel;

    private enum Action {


        // MIXPANEL API


        ALIAS("alias"),
        DISTINCT_ID("distinctId"),
        FLUSH("flush"),
        IDENTIFY("identify"),
        INIT("init"),
        REGISTER_SUPER_PROPERTIES("registerSuperProperties"),
        RESET("reset"),
        SHOW_SURVEY("showSurvey"),
        TIME_EVENT("timeEvent"),
        TRACK("track"),

        // PEOPLE API


        PEOPLE_INCREMENT("people_increment"),
        PEOPLE_SET_PUSH_ID("people_setPushId"),
        PEOPLE_SET("people_set"),
        PEOPLE_SET_ONCE("people_set_once"),
        PEOPLE_TRACK_CHARGE("people_track_charge"),
        PEOPLE_UNSET("people_unset");

        private final String name;
        private static final Map<String, Action> lookup = new HashMap<String, Action>();

        static {
            for (Action a : Action.values()) lookup.put(a.getName(), a);
        }

        private Action(String name) { this.name = name; }
        public String getName() { return name; }
        public static Action get(String name) { return lookup.get(name); }
    }


    /**
     * helper fn that logs the err and then calls the err callback
     */
    private void error(CallbackContext cbCtx, String message) {
        LOG.e(LOG_TAG, message);
        cbCtx.error(message);
    }


    @Override
    public boolean execute(String action, JSONArray args, final CallbackContext cbCtx) {
        Action act = Action.get(action);

        if (act == null){
            this.error(cbCtx, "unknown action: " + action);
            return false;
        }

        if (mixpanel == null && Action.INIT != act) {
            this.error(cbCtx, "you must initialize mixpanel first using \"init\" action");
            return false;
        }

        switch (act) {
            case ALIAS:
                return handleAlias(args, cbCtx);
            case DISTINCT_ID:
                return handleDistinctId(args, cbCtx);
            case FLUSH:
                return handleFlush(args, cbCtx);
            case IDENTIFY:
                return handleIdentify(args, cbCtx);
            case INIT:
                return handleInit(args, cbCtx);
            case REGISTER_SUPER_PROPERTIES:
                return handleRegisterSuperProperties(args, cbCtx);
            case RESET:
                return handleReset(args, cbCtx);
            case SHOW_SURVEY:
                return handleShowSurvey(args, cbCtx);
            case TIME_EVENT:
                return handleTimeEvent(args, cbCtx);
            case TRACK:
                return handleTrack(args, cbCtx);
            case PEOPLE_INCREMENT:
                return handlePeopleIncrement(args, cbCtx);
            case PEOPLE_SET_PUSH_ID:
                return handlePeopleSetPushId(args, cbCtx);
            case PEOPLE_SET:
                return handlePeopleSet(args, cbCtx);
            case PEOPLE_SET_ONCE:
                return handlePeopleSetOnce(args, cbCtx);
            case PEOPLE_TRACK_CHARGE:
                return handlePeopleTrackCharge(args, cbCtx);
            case PEOPLE_UNSET:
                return handlePeopleUnset(args, cbCtx);
            default:
                this.error(cbCtx, "unknown action");
                return false;
        }
    }


    @Override
    public void onDestroy() {
        if (mixpanel != null) {
            mixpanel.flush();
        }
        super.onDestroy();
    }


    //************************************************
    //  ACTION HANDLERS
    //   - return true:
    //     - to indicate action was executed with correct arguments
    //     - also if the action from sdk has failed.
    //  - return false:
    //     - arguments were wrong
    //************************************************

    private boolean handleAlias(JSONArray args, final CallbackContext cbCtx) {
        String aliasId = args.optString(0, "");
        String originalId = args.optString(1, null);
        mixpanel.alias(aliasId, originalId);
        cbCtx.success();
        return true;
    }


    private boolean handleDistinctId(JSONArray args, final CallbackContext cbCtx) {
        String distinctId = mixpanel.getDistinctId();
        cbCtx.success(distinctId);
        return true;
    }


    private boolean handleFlush(JSONArray args, final CallbackContext cbCtx) {
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                mixpanel.flush();
                cbCtx.success();
            }
        };
        cordova.getThreadPool().execute(runnable);
        cbCtx.success();
        return true;
    }


    private boolean handleIdentify(JSONArray args, final CallbackContext cbCtx) {
        String distinctId = args.optString(0, "");
        mixpanel.identify(distinctId);
        mixpanel.getPeople().identify(distinctId);
        cbCtx.success();
        return true;
    }


    private boolean handleInit(JSONArray args, final CallbackContext cbCtx) {
        String token = args.optString(0, "");
        Context ctx = cordova.getActivity();
        mixpanel = MixpanelAPI.getInstance(ctx, token);
        cbCtx.success();
        return true;
    }


    private boolean handleRegisterSuperProperties(JSONArray args, final CallbackContext cbCtx) {
        JSONObject superProperties = args.optJSONObject(0);
        if (superProperties == null) {
            superProperties = new JSONObject();
        }
        mixpanel.registerSuperProperties(superProperties);
        cbCtx.success();
        return true;
    }


    private boolean handleReset(JSONArray args, final CallbackContext cbCtx) {
        mixpanel.reset();
        cbCtx.success();
        return true;
    }


    private boolean handleShowSurvey(JSONArray args, final CallbackContext cbCtx) {
        this.error(cbCtx, "not implemented");
        return false;
    }


    private boolean handleTimeEvent(JSONArray args, final CallbackContext cbCtx) {
        String event = args.optString(0, "");
        mixpanel.timeEvent(event);
        cbCtx.success();
        return true;
    }


    private boolean handleTrack(JSONArray args, final CallbackContext cbCtx) {
        String event = args.optString(0, "");
        JSONObject properties = args.optJSONObject(1);
        if (properties == null) {
            properties = new JSONObject();
        }
        mixpanel.track(event, properties);
        cbCtx.success();
        return true;
    }


    private boolean handlePeopleIncrement(JSONArray args, final CallbackContext cbCtx) {
        JSONObject jsonPropertiesObj = args.optJSONObject(0);
        Map<String, Number> properties = new HashMap<String, Number>();

        JSONArray keys = jsonPropertiesObj.names();

        try {
            for(int i = 0; i< keys.length(); i++){
                String key = keys.getString(i);
                Number value = (Number) jsonPropertiesObj.get(key);
                properties.put(key, value);
            }
        }
        catch(Exception e){
            this.error(cbCtx, "passed in properties should be a json object with String keys and Number values");
            return false;
        }

        mixpanel.getPeople().increment(properties);
        cbCtx.success();
        return true;
    }


    private boolean handlePeopleSet(JSONArray args, final CallbackContext cbCtx) {
        JSONObject properties = args.optJSONObject(0);
        mixpanel.getPeople().set(properties);
        cbCtx.success();
        return true;
    }


    private boolean handlePeopleSetOnce(JSONArray args, final CallbackContext cbCtx) {
        JSONObject properties = args.optJSONObject(0);
        mixpanel.getPeople().setOnce(properties);
        cbCtx.success();
        return true;
    }


    private boolean handlePeopleSetPushId(JSONArray args, final CallbackContext cbCtx) {
        String pushId = args.optString(0);
        mixpanel.getPeople().setPushRegistrationId(pushId);
        cbCtx.success();
        return true;
    }


    private boolean handlePeopleTrackCharge(JSONArray args, final CallbackContext cbCtx) {
        Double amount = args.optDouble(0);
        JSONObject properties = args.optJSONObject(1);
        if (properties == null) {
            properties = new JSONObject();
        }
        mixpanel.getPeople().trackCharge(amount, properties);
        cbCtx.success();
        return true;
    }


    private boolean handlePeopleUnset(JSONArray args, final CallbackContext cbCtx) {
        JSONArray propertiesToUnset = args.optJSONArray(0);
        for(int i=0;i<propertiesToUnset.length();i++){
            String propertyToUnset = propertiesToUnset.optString(i);
            if (propertyToUnset != null){
                mixpanel.getPeople().unset(propertyToUnset);
            }
        }
        cbCtx.success();
        return true;
    }

}
