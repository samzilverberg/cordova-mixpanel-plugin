interface IMixpanel {

  people: Mixpanel.IPeople;

  init(token: string, onSuccess: () => void, onFail: (errors: string) => void): void;

  alias(alias: string, originalId: string, onSuccess: () => void, onFail: (errors: string) => void): void;
  createAlias(alias: string, originalId: string, onSuccess: () => void, onFail: (errors: string) => void): void;
  distinctId(onSuccess: () => void, onFail: (errors: string) => void): void;
  flush(onSuccess: () => void, onFail: (errors: string) => void): void;
  getSuperProperties(onSuccess: () => void, onFail: (errors: string) => void): void;
  identify(id: string, usePeople: boolean, onSuccess: () => void, onFail: (errors: string) => void): void;
  registerSuperProperties(superProperties: any, onSuccess: () => void, onFail: (errors: string) => void): void;
  registerSuperPropertiesOnce(superProperties: any, onSuccess: () => void, onFail: (errors: string) => void): void;
  reset(onSuccess: () => void, onFail: (errors: string) => void): void;
  timeEvent(eventName: string, onSuccess: () => void, onFail: (errors: string) => void): void;
  track(eventName: string, eventProperties: any, onSuccess: () => void, onFail: (errors: string) => void): void;
  unregisterSuperProperty(superPropertyName: string, onSuccess: () => void, onFail: (errors: string) => void): void;
}


declare namespace Mixpanel {
  interface IPeople {
    append(unionObject: any, onSuccess: () => void, onFail: (errors: string) => void): void;
    deleteUser(onSuccess: () => void, onFail: (errors: string) => void): void;
    increment(peopleProperties: any, onSuccess: () => void, onFail: (errors: string) => void): void;
    set(peopleProperties: any, onSuccess: () => void, onFail: (errors: string) => void): void;
    setOnce(peopleProperties: any, onSuccess: () => void, onFail: (errors: string) => void): void;
    setPushId(pushId: string, onSuccess: () => void, onFail: (errors: string) => void): void;
    trackCharge(amount: number, eventProperties: any, onSuccess: () => void, onFail: (errors: string) => void): void;
    unset(propertiesArray: Array<string>, onSuccess: () => void, onFail: (errors: string) => void): void;
    union(unionObject: any, onSuccess: () => void, onFail: (errors: string) => void): void;
  }
}

declare var mixpanel: IMixpanel;
