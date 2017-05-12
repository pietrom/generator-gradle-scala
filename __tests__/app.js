'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

describe('generator-gradle-scala:app with default parameters', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({})
  })

  it('Creates .yo-rc.json', () => {
    assert.file([ '.yo-rc.json' ])
  })

  it('Creates build.gradle', () => {
    assert.file([ 'build.gradle' ])
  })

  it('Creates settings.gradle', () => {
    assert.file([ 'settings.gradle' ])
  })  

  it('Default version is 1.0.0-SNAPSHOT', () => {
    assert.fileContent('build.gradle', 'version = \'1.0.0-SNAPSHOT\'')
  })

  it('Default Java version is 1.8', () => {
    assert.fileContent('build.gradle', 'javaVersion = 1.8')
  })

  it('Default Scala version is 2.11.8', () => { 
    assert.fileContent('build.gradle', `compile "org.scala-lang:scala-library:2.11.8"`)
  })

  it('Defaut JUnit version is 4.12', () => { 
    assert.fileContent('build.gradle', `testCompile group: 'junit', name: 'junit', version:'4.12'`)
  })
})

const prompts = { 
  name: 'test-sample',
  groupId: 'com.github.example',
  javaVersion: '1.7',
  scalaVersion: '1.2.3',
  junitVersion: '4.11'
}

describe('generator-gradle-scala:app with custom parameters', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts(prompts)
  })

  it('Uses name from prompt in settings.gradle', () => {
    assert.fileContent('settings.gradle', 'rootProject.name = \'test-sample\'')
  })

  it('Uses groupId from prompt in build.gradle', () => {
    assert.fileContent('build.gradle', `group = '${prompts.groupId}'`)
  })  

  it('Can provide custom Java version', () => { 
    assert.fileContent('build.gradle', `javaVersion = ${prompts.javaVersion}`)
  })

  it('Can provide custom Scala version', () => { 
    assert.fileContent('build.gradle', `compile "org.scala-lang:scala-library:${prompts.scalaVersion}"`)
  })

  it('Can provide custom JUnit version', () => { 
    assert.fileContent('build.gradle', `testCompile group: 'junit', name: 'junit', version:'${prompts.junitVersion}'`)
  })

  it('Creates Hello.scala in custom package', () => {
    const expected = `src/main/scala/${prompts.groupId.replace(/[.]/g, '/')}/hello/Hello.scala`
    assert.file(expected)
  })

  it('Creates HelloTest.scala in custom package', () => {
    const expected = `src/test/scala/${prompts.groupId.replace(/[.]/g, '/')}/hello/HelloTest.scala`
    assert.file(expected)
  })

  it('HelloTest.scala contains JUnit import', () => {
    assert.fileContent(`src/test/scala/${prompts.groupId.replace(/[.]/g, '/')}/hello/HelloTest.scala`, 'import org.junit._')
  })
})
