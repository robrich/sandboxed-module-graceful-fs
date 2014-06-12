'use strict';

var SandboxedModule = require('sandboxed-module');
var assert = require('assert');

describe('tests', function () {
	it('should succeed', function (done) {

		var index = SandboxedModule.require('../index', {
			requires: {
				'http': {
					fake:true
				}
			}
		});

		assert.equal(!index, false); // it exists

		done();
	});
});
