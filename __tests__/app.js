'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-gradle-scala:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({name: 'test-sample'});
  });

  it('creates files', () => {
    assert.file([
      'build.gradle'
    ]);
  });
});
