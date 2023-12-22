// @ts-check

/**
 * @description A simple vanilla JS event system
 */

/**
 * @class EventManager Emitter - Manages different events
 */
class Emitter {
  constructor(obj) {
    this.obj = obj;
    this.eventTarget = document.createDocumentFragment();
    ['addEventListener', 'dispatchEvent', 'removeEventListener'].forEach(this.delegate, this);
  }

  delegate(method) {
    this.obj[method] = this.eventTarget[method].bind(this.eventTarget);
  }
}

class Events {
  constructor(host) {
    this.host = host;
    /**
     * Add simple event system
     */
    new Emitter(host);
    host.on = (eventName, func) => {
      host.addEventListener(eventName, func);
      return host;
    }
  }

  trigger(event, detail, evt) {
    if (typeof event === 'object' && event instanceof Event) {
      return this.host.dispatchEvent(event);
    }

    if (!evt) {
      evt = new Event(event, { bubbles: false, cancelable: true });
    }

    evt.detail = { ...(detail || {}), host: this.host };

    return this.host.dispatchEvent(evt);
  }
}

export { Events };
