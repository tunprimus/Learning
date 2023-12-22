// @ts-check
import Events from './events.js';

const ROUTER_TYPES = {hash: 'hash', history: 'history',}, defer = x => { setTimeout(() => x(), 10); };

/**
 * @class VanillaRouter SPA Router - replacement for frameworks routers (history and hash)
 */
class VanillaRouter {
  constructor(options = {}) {
    this.events = new Events(this);
    this.options = { type: ROUTER_TYPES.hash, ...options };
  }

  /**
    * Start listening for route changes
    * @returns {VanillaRouter} reference to itself
    */
  listen() {
    this.routeHash = Object.keys(this.options.routes);

    if (!this.routeHash.includes('/')) {
      throw TypeError('No home route found');
    }
    
    if (this.isHashRouter) {
      window.addEventListener('hashchange', this._hashChanged.bind(this));
      defer(() => this._tryNav(document.location.hash.substring(1)));
    } else {
      let href = document.location.origin;
      if (this._findRoute(document.location.pathname)) {
        href += document.location.pathname;
      }
      document.addEventListener('click', this._onNavClick.bind(this));
      window.addEventListener('popstate', this._triggerPopState.bind(this));

      defer(() => this._tryNav(href));
    }
    return this;
  }

  _hashChanged() {
    this._tryNav(document.location.hash.substring(1));
  }

  _triggerPopState(evt) {
    this._triggerRouteChange(evt.state.path, evt.target.location.href);
  }

  _triggerRouteChange(path, url) {
    this.events.trigger('route', {
      route: this.options.routes[path], path: path, url: url,
    })
  }

  _findRoute(url) {
    var test = '/' + url.match(/([A-Za-z0-9.]*)/gm, (match, token) => { return token })[1];
    return this.routeHash.includes(test) ? test : null;
  }

  _tryNav(href) {
    const url = this._createUrl(href);
    if (url.protocol.startsWith('http')) {
      const routePath = this._findRoute(url.pathname);
      if (routePath && this.options.routes[routePath]) {
        if (this.options.type === 'history') {
          window.history.pushState({ path: routePath }, routePath, url.origin + url.pathname);
        }
        this._triggerRouteChange(routePath, url);
        return true;
      }
    }
  }

  _createUrl(href) {
    if (this.isHashRouter && href.startsWith('#')) {
      href = href.substring(1);
    }
    return new URL(href, document.location.origin);
  }

  _onNavClick(evt) {
    var _e$target;
    // handle click in document
    const href =
      (_e$target = evt.target) === null ||
      _e$target === void 0 ||
      (_e$target = _e$target.closest("[href]")) === null ||
      _e$target === void 0
        ? void 0
        : _e$target.href;
    if (href && this._tryNav(href)) {
      evt.preventDefault();
    }
  }

  /**
   * Makes the router navigate to the given route
   * @param {string} path 
   */
  setRoute(path) {
    if (!this._findRoute(path)) {
      throw TypeError('Invalid route');
    }

    let href = this.isHashRouter ? '#' + path : document.location.origin + path;
    history.replaceState(null, null, href);
    this._tryNav(href);
  }

  get isHashRouter() {
    return this.options.type === ROUTER_TYPES.hash;
  }
}

export default VanillaRouter;
