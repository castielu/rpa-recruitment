'use strict';

var assert = require('assert');
var MyGreeter = require('../src/MyGreeter.js');

describe('MyGreeter.Client', function () {

  describe('Constructor', function () {

    it('should be instantiated', function () {
      var greeter = new MyGreeter.Client();

      assert.ok(greeter instanceof MyGreeter.Client);
    });
  });

  describe('getGreeting', function () {

    it('should return something with length', function () {
      var greeter = new MyGreeter.Client();

      assert.equal(greeter.getGreeting().length > 0, true);
    });

    it('edge cases', function () {

      // TODO: in production, we'd better NOT compare like this, which means
      // we check the LOGIC rather than the final LITERAL RENDERING.
      // This requires a decent i18n infrastructure support. for now I just
      // do this dirty.
      const TEXT_RESOURCE = {
        TEXT_GOOD_MORNING: 'Good morning',
        TEXT_GOOD_AFTERNOON: 'Good afternoon',
        TEXT_GOOD_EVENING: 'Good evening',
      }
      const cases = [
        ['2000-01-01 06:00:00.000', TEXT_RESOURCE.TEXT_GOOD_MORNING],
        ['2000-01-01 11:59:59.999', TEXT_RESOURCE.TEXT_GOOD_MORNING],
        ['2000-01-01 12:00:00.000', TEXT_RESOURCE.TEXT_GOOD_AFTERNOON],
        ['2000-01-01 17:59:59.999', TEXT_RESOURCE.TEXT_GOOD_AFTERNOON],
        ['2000-01-01 18:00:00.000', TEXT_RESOURCE.TEXT_GOOD_EVENING],
        ['2000-01-01 05:59:59.999', TEXT_RESOURCE.TEXT_GOOD_EVENING],
      ]

      for (const c of cases){
        const greeter = new MyGreeter.Client(() => {
          return new Date(c[0])
        });

        assert.equal(greeter.getGreeting(), c[1]);
      }
    });
  });

});
