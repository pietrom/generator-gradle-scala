'use strict';
const path = require('path');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('appname', {type: String, required: false});
  }

  prompting() {
    this.log(yosay(
      'Welcome to the primo ' + chalk.red('generator-gradle-scala') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'groupId',
      message: 'Your project group id',
      default: ''
    }, {
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.options.appname || path.basename(process.cwd())
    }, {
      type: 'input',
      name: 'description',
      message: 'Your project description',
      default: this.options.appname || path.basename(process.cwd())
    }, {
      type: 'input',
      name: 'scalaVersion',
      message: 'Scala version to use',
      default: '2.11.8'
    }, {
      type: 'input',
      name: 'junitVersion',
      message: 'JUnit version to use',
      default: '4.12'
    }];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }
  default() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(
        'Your project must be inside a folder named ' + this.props.name + '\n' +
        'I\'ll automatically create this folder.'
      );
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('build.gradle'),
      this.destinationPath('build.gradle'),
      {
        scalaVersion: this.props.scalaVersion,
        junitVersion: this.props.junitVersion,
        groupId: this.props.groupId,
        name: this.props.name,
        description: this.props.description
      }
    );
  }
};
