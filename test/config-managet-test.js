/**
 * Created by Pencroff on 11.12.2014.
 */
/*global describe: true, it: true, require: true*/
var expect = require('chai').expect,
    path = require('path'),
    root = __dirname,
    configManager = require('../src/config-manager.js');
describe('Config Manager', function () {
    'use strict';
    it('key should be string', function (done) {
        var keyStr = 'strKey',
            keyBool = true,
            keyNum = 123,
            keyObj = { someKey: 'someKeyObj' },
            value = 'Key Value';
        expect(function () {
            configManager.set(keyBool, value);
        }).to.throw('Configuration key not string');
        expect(function () {
            configManager.set(keyNum, value);
        }).to.throw('Configuration key not string');
        expect(function () {
            configManager.set(keyObj, value);
        }).to.throw('Configuration key not string');
        configManager.set(keyStr, value);
        expect(configManager.get(keyStr)).to.equals(value);
        expect(function () {
            configManager.get(keyBool);
        }).to.throw('Configuration key not string');
        expect(function () {
            configManager.get(keyNum);
        }).to.throw('Configuration key not string');
        expect(function () {
            configManager.get(keyObj);
        }).to.throw('Configuration key not string');
        done();
    });
    it('should Get/Set simple key - values', function (done) {
        var keyA = 'KeyA',
            keyB = 'KeyB',
            keyValueA = 'ASD',
            keyValueB = 123,
            valueA,
            valueB;
        configManager.set(keyA, keyValueA);
        valueA = configManager.get(keyA);
        configManager.set(keyB, keyValueB);
        valueB = configManager.get(keyB);
        expect(valueA).to.equals(keyValueA);
        expect(valueB).to.equals(keyValueB);
        done();
    });
    it('should Get/Set complex key - values', function (done) {
        var testConfFolder = path.join(root, 'testConfigFiles'),
            mainConf = path.join(testConfFolder, 'main.conf.js'),
            section;
        configManager.init(mainConf);
        configManager.set('web.port', 4455);
        expect(configManager.get('web').port).to.equals(4455);
        expect(configManager.get('web.port')).to.equals(4455);
        expect(configManager.get('web.sessionKey')).to.equals('6ketaq3cgo315rk9');
        expect(configManager.get('web.paging')).to.not.undefined;
        expect(configManager.get('web.paging.defaultPageSize')).to.equals(25);
        expect(configManager.get('web.paging.numberVisiblePages')).to.equals(10);
        configManager.set('web.section.keyA', 'AAA');
        configManager.set('web.section.keyB', 'BBB');
        section = configManager.get('web.section');
        expect(section.keyA).to.equals('AAA');
        expect(section.keyB).to.equals('BBB');
        done();
    });
    it('should not override value', function (done) {
        var testConfFolder = path.join(root, 'testConfigFiles'),
            mainConf = path.join(testConfFolder, 'main.conf.js');
        configManager.init(mainConf);
        configManager.get('web').port = 5544;
        expect(configManager.get('web').port).to.equals(8805);
        configManager.get('web').sessionKey = '6ketaq3cgo315rk9kdfjsgh';
        expect(configManager.get('web').sessionKey).to.equals('6ketaq3cgo315rk9');
        done();
    });
    it('should return undefined for not exist fields', function (done) {
        var testConfFolder = path.join(root, 'testConfigFiles'),
            mainConf = path.join(testConfFolder, 'main.conf.js');
        configManager.init(mainConf);
        expect(configManager.get('web.dbConnection.userName')).to.undefined;
        done();
    });
    it('should not support undefined key', function (done) {
        var testConfFolder = path.join(root, 'testConfigFiles'),
            mainConf = path.join(testConfFolder, 'main.conf.js');
        configManager.init(mainConf);
        expect(function () {
            configManager.get();
        }).to.throw('Configuration key not string.');
        done();
    });
    it('should throw exception for undefined key in set operation', function (done) {
        var testConfFolder = path.join(root, 'testConfigFiles'),
            mainConf = path.join(testConfFolder, 'main.conf.js'),
            undef;
        configManager.init(mainConf);
        expect(function () {
            configManager.set(undef, true);
        }).to.throw('Configuration key not string.');
        done();
    });
    it('should check key', function (done) {
        var testConfFolder = path.join(root, 'testConfigFiles'),
            mainConf = path.join(testConfFolder, 'main.conf.js');
        configManager.init(mainConf);
        expect(configManager.has('web.port')).to.equal(true);
        expect(configManager.has('web.dbConnection')).to.equal(false);
        done();
    });
    it('should setup configuration', function (done) {
        var testConfFolder = path.join(root, 'testConfigFiles');
        // Default NODE_ENV = development
        process.env.NODE_ENV = 'development';
        configManager.setup(testConfFolder);
        expect(configManager.get('web.port')).to.equals(4343);
        expect(configManager.get('web.paging.numberVisiblePages')).to.equals(7);
        process.env.NODE_ENV = 'staging';
        configManager.setup(testConfFolder);
        expect(configManager.get('web.port')).to.equals(5757);
        expect(configManager.get('web.paging.numberVisiblePages')).to.equals(5);
        done();
    });
    it('should support initialization', function (done) {
        var testConfFolder = path.join(root, 'testConfigFiles'),
            mainConf = path.join(testConfFolder, 'main.conf.js');
        configManager.init(mainConf);
        expect(configManager.get('web')).to.not.undefined;
        expect(configManager.get('web').port).to.equals(8805);
        expect(configManager.get('web').sessionKey).to.equals('6ketaq3cgo315rk9');
        done();
    });
    it('should update configuration', function (done) {
        var testConfFolder = path.join(root, 'testConfigFiles'),
            mainConf = path.join(testConfFolder, 'main.conf.js'),
            stagingConf = path.join(testConfFolder, 'staging.conf.js');
        configManager.init(mainConf);
        configManager.update(stagingConf);
        expect(configManager.get('web.port')).to.equals(5757);
        expect(configManager.get('web.paging.numberVisiblePages')).to.equals(5);
        done();
    });
    it('should support fluent initialization and key setup', function (done) {
        var testConfFolder = path.join(root, 'testConfigFiles'),
            mainConf = path.join(testConfFolder, 'main.conf.js'),
            stagingConf = path.join(testConfFolder, 'staging.conf.js');
        configManager.init(mainConf)
            .update(stagingConf)
            .set('web.log.user', 'UserName')
            .set('web.log.password', 'UserPassword');
        expect(configManager.get('web.port')).to.equals(5757);
        expect(configManager.get('web.paging.numberVisiblePages')).to.equals(5);
        expect(configManager.get('web.log.user')).to.equals('UserName');
        expect(configManager.get('web.log.password')).to.equals('UserPassword');
        done();
    });
    it('should update simple property by object', function (done) {
        var testConfFolder = path.join(root, 'testConfigFiles'),
            mainConf = path.join(testConfFolder, 'main.conf.js'),
            testConf = path.join(testConfFolder, 'objToProp.config.js');
        configManager.init(mainConf);
        configManager.update(testConf);
        expect(configManager.get('web.paging.numberVisiblePages')).to.be.an('object');
        expect(configManager.get('web.paging.numberVisiblePages.web')).to.equal(5);
        expect(configManager.get('web.paging.numberVisiblePages.admin')).to.equal(10);
        done();
    });
    it('should update simple object by property', function (done) {
        var testConfFolder = path.join(root, 'testConfigFiles'),
            mainConf = path.join(testConfFolder, 'main.conf.js'),
            testConf = path.join(testConfFolder, 'propToObj.config.js');
        configManager.init(mainConf);
        configManager.update(testConf);
        expect(configManager.get('web.paging')).to.equal(true);
        done();
    });
    it('should support using reference { $ref: \'key.to.some.value\' } to objects in get method', function (done) {
        var testConfFolder = path.join(root, 'testConfigFiles'),
            mainConf = path.join(testConfFolder, 'main.conf.js'),
            refObj;
        configManager.init(mainConf);
        refObj = configManager.get('web.paging');
        expect(configManager.get('web.refToProperty')).to.equal(25);
        expect(configManager.get('web.refToObj')).to.eql(refObj);
        done();
    });
    it('should support $tmpl key in reference object', function (done) {
        var testConfFolder = path.join(root, 'testConfigFiles'),
            mainConf = path.join(testConfFolder, 'main.conf.js');
        configManager.init(mainConf);
        expect(configManager.get('web.refToSimpleData')).to.equal(10);
        expect(configManager.get('web.refToMongo')).to.equal('mongodb://dbUser:strongPassword@localhost:27101/database');
        done();
    });
});