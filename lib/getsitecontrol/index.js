
var integration = require('analytics.js-integration');

/**
 * Expose `GetSiteControl` integration.
 */
var GetSiteControl = module.exports = integration('GetSiteControl')
  .assumesPageview()
  .global('_gscq')
  .option('siteId', '')
  .tag('<script src="//widgets.getsitecontrol.com/{{ siteId }}/script.js">');

/**
 * Initialize GetSiteControl.
 */

GetSiteControl.prototype.initialize = function(){
  window._gscq = window._gscq || [];
  this.load(this.ready);
};

/**
 * Has the GetSiteControl library been loaded yet?
 *
 * @return {Boolean}
 */

GetSiteControl.prototype.loaded = function(){
  return window._gscq.loaded === 1;
};

