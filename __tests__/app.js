'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const prompts = { name: 'test-sample', groupId: 'com.github.example' }

describe('generator-gradle-scala:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts(prompts)
  })

  it('creates .yo-rc.json', () => {
    assert.file([ '.yo-rc.json' ])
  })

  it('creates build.gradle', () => {
    assert.file([ 'build.gradle' ])
  })

  it('creates settings.gradle', () => {
    assert.file([ 'settings.gradle' ])
  })

  it('uses name from prompt in settings.gradle', () => {
    assert.fileContent('settings.gradle', 'rootProject.name = test-sample')
  })

  it('uses groupId from prompt in build.gradle', () => {
    assert.fileContent('build.gradle', `group = '${prompts.groupId}'`)
  })

  it('build.gradle contains fixed version', () => {
    assert.fileContent('build.gradle', 'version = \'1.0.0-SNAPSHOT\'')
  })
})
