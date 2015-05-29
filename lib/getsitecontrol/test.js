
var Analytics = require('analytics.js').constructor;
var integration = require('analytics.js-integration');
var sandbox = require('clear-env');
var tester = require('analytics.js-integration-tester');
var GetSiteControl = require('./');

describe('GetSiteControl', function(){
  var analytics;
  var getsitecontrol;
  var options = {
    siteId: '18519'
  };

  beforeEach(function(){
    analytics = new Analytics();
    getsitecontrol = new GetSiteControl(options);
    analytics.use(GetSiteControl);
    analytics.use(tester);
    analytics.add(getsitecontrol);
  });

  afterEach(function(){
    analytics.restore();
    analytics.reset();
    getsitecontrol.reset();
    sandbox();
  });

  it('should have the right settings', function(){
    analytics.compare(GetSiteControl, integration('GetSiteControl')
      .assumesPageview()
      .global('_gscq')
      .option('siteId', ''));
  });

  describe('before loading', function(){
    beforeEach(function(){
      analytics.stub(getsitecontrol, 'load');
    });

    describe('#initialize', function(){
      it('should create the window._gscq object', function(){
        analytics.assert(window._gscq === undefined);
        analytics.initialize();
        analytics.page();
        analytics.assert(window._gscq);
      });

      it('should call #load', function(){
        analytics.initialize();
        analytics.page();
        analytics.called(getsitecontrol.load);
      });
    });
  });

  describe('loading', function(){
    it('should load', function(done){
      analytics.load(getsitecontrol, done);
    });
  });
});

