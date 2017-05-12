'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-gradle-scala:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({name: 'test-sample'});
  });

  it('creates build.gradle', () => {
    assert.file(['build.gradle']);
  });

  it('creates settings.gradle', () => {
    assert.file(['settings.gradle']);
  });

  it('uses name from prompt in settings.gradle', () => {
    assert.fileContent('settings.gradle', 'rootProject.name = test-sample');
  });
});
