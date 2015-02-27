<!--
This file has been generated using Gitdown (https://github.com/gajus/gitdown).
Direct edits to this will be be overwritten. Look for Gitdown markup file under ./.gitdown/ path.
-->
![Kea-logo](./img/kea-logo.png) 

kea-config
==========

Configuration manager for Node.js applications with perfect performance and without dependencies.
Main feature of this configuration manager is merging configuration files depending on Node.js environment,
support references to other keys and using templates with objects for complex string values.

[![NPM version](http://img.shields.io/npm/v/kea-config.svg?style=flat)](https://www.npmjs.org/package/kea-config)

<h2 id="contents">Contents</h2>

* [Contents](#contents)
* [Quick example](#quick-example)
* [Usage](#usage)
* [Testing, coverage and benchmark](#testing-coverage-and-benchmark)
* [Code coverage](#code-coverage)
* [Performance test](#performance-test)
* [Road map](#road-map)
* [Inspired by](#inspired-by)
* [License](#license)
* [API](#api)
* [kea-config](#kea-config)
    * [kea-config.setup(dirPath)](#kea-config-kea-config-setup-dirpath-)
    * [kea-config.init(path)](#kea-config-kea-config-init-path-)
    * [kea-config.update(path)](#kea-config-kea-config-update-path-)
    * [kea-config.get(key)](#kea-config-kea-config-get-key-)
    * [kea-config.set(key, value)](#kea-config-kea-config-set-key-value-)
    * [kea-config.has(key)](#kea-config-kea-config-has-key-)


<h2 id="quick-example">Quick example</h2>

<h4 id="quick-example-initialization-and-usage">Initialization and usage</h4>

```js

    configManager.setup('./config');
    // For process.env.NODE_ENV === 'development';
    configManager.get('web.port'); // 4343
    // For process.env.NODE_ENV === 'production';
    configManager.get('web.port'); // 7474

    // If you don't want to apply changes connected to environment
    // just use init method
    configManager.init('./config/main.conf.js');
    configManager.get('web.port'); // 3005
```

<h4 id="quick-example-file-config-main-conf-js">File ./config/main.conf.js</h4>

```js

    var config = {}

    config.web = {
        port: 3005,
        sessionKey: '6ketaq3cgo315rk9',
        paging: {
            defaultPageSize: 25,
            numberVisiblePages: 10
        },
        mongoDb: {
            username: 'dbUser',
            password: 'strongPassword',
            host: 'localhost',
            port: 27101,
            db: 'database'
        },
        propertyReference: {
            $ref: 'web.paging.defaultPageSize'
        },
        templateReference: {
            $ref: 'web.mongoDb',
            $tmpl: 'mongodb://{username}:{password}@{host}:{port}/{db}'
        }
    };

    module.exports = config;
```

<h5 id="quick-example-file-config-main-conf-js-file-config-development-conf-js">File ./config/development.conf.js</h5>

```js

    var config = {}

    config.web = {
        port: 4343
    };

    module.exports = config;
``` 
<h5 id="quick-example-file-config-main-conf-js-file-config-production-conf-js">File ./config/production.conf.js</h5>

```js

    var config = {}

    config.web = {
        port: 7474
    };

    module.exports = config;
``` 
<h2 id="usage">Usage</h2>

Install with npm:

    npm install kea-config --save

In your code require the package:

    var configManager = require('kea-config');

Setup configuration data

    configManager.setup('./config');

This command will initialize `configManager` by `main.conf.js` in and then merge `development.conf.js` (if `NODE_ENV === development`)

Read (`get`) and write (`set`) config data:

```js

    var sessionSecret = configManager.get('web.sessionKey');
    configManager.set('web.paging.defaultPageSize', 15);
    // also
    webConfig = configManager.get('web.paging');
    /*
        {
            defaultPageSize: 15,
            numberVisiblePages: 10
        }
    */

    // Usage references

    configManager.get('web.propertyReference'); // 25

    // Usage templates

    configManager.get('web.templateReference'); // 'mongodb://dbUser:strongPassword@localhost:27101/database' - string
```
<h2 id="testing-coverage-and-benchmark">Testing, coverage and benchmark</h2>

* `npm test` or `gulp mocha` - run tests
* `gulp cover` - check tests coverage
* `gulp benchmark` - rum performance test
* `gulp readme` - prepare README.md from `documentation` folder
 
<h2 id="code-coverage">Code coverage</h2>

    Statements ................................... 100% ( 115/115 )
    Branches ..................................... 98.15% ( 53/54 )
    Functions .................................... 100% ( 18/18 )
    Lines ........................................ 100% ( 115/115 )


<h2 id="performance-test">Performance test</h2>

    Get simple key ............................... 5,799,240 ops/sec +0.47%
    Get deep key ................................. 5,488,370 ops/sec +0.31%
    Get key with reference ....................... 1,508,501 ops/sec +0.23%
    Get key with reference and template .......... 106,877 ops/sec +0.27%
    Get key with deep references ................. 274,983 ops/sec +0.80%
    Get key with deep references and template .... 108,919 ops/sec +0.25%
    Set simple key ............................... 3,446,469 ops/sec +0.26%
    Set deep key ................................. 3,135,072 ops/sec +1.82%


<h2 id="road-map">Road map</h2>

* support .yml, .yaml, .coffee, .cson, .properties, .json, .json5, .hjson
* adapters for different storages like (filesystem, DB, localstorage / sessionstorage, web api and etc.)
* save current state of config
* delete key

<h2 id="inspired-by">Inspired by</h2>

* ASP.NET web.config approach
* [lorenwest/node-config](https://github.com/lorenwest/node-config) 
* [flatiron/nconf](https://github.com/flatiron/nconf)
* [dominictarr/config-chain](https://github.com/dominictarr/config-chain)

<h2 id="license">License</h2>

MIT

Image from [thetartankiwi](http://www.thetartankiwi.com/2013/07/nz-native-bird-patterns.html)


<h2 id="api">API</h2>
<a name="module_kea-config"></a>
<h1 id="kea-config">kea-config</h1>
Configuration manager for Node.js applications.

**Members**

* [kea-config](#module_kea-config)
  * [kea-config.setup(dirPath)](#module_kea-config.setup)
  * [kea-config.init(path)](#module_kea-config.init)
  * [kea-config.update(path)](#module_kea-config.update)
  * [kea-config.get(key)](#module_kea-config.get)
  * [kea-config.set(key, value)](#module_kea-config.set)
  * [kea-config.has(key)](#module_kea-config.has)

<a name="module_kea-config.setup"></a>
<h2 id="kea-config-kea-config-setup-dirpath-">kea-config.setup(dirPath)</h2>
Full init config based on environment variable `NODE_ENV`. If `NODE_ENV` not available use `development` as default.This method looking for two files main (name started from 'main' word) and file with name started from environment (like development, staging, production)

**Params**

- dirPath `string` - path to folder with configuration files  

<a name="module_kea-config.init"></a>
<h2 id="kea-config-kea-config-init-path-">kea-config.init(path)</h2>
ConfigManager initialization by data in file. Not save previous configuration.

**Params**

- path `string` - path to CommonJs module with configuration  

<a name="module_kea-config.update"></a>
<h2 id="kea-config-kea-config-update-path-">kea-config.update(path)</h2>
Update exist configuration. Merge new config to exist.

**Params**

- path `string` - path to CommonJs module with configuration  

<a name="module_kea-config.get"></a>
<h2 id="kea-config-kea-config-get-key-">kea-config.get(key)</h2>
Get 'value' of 'key'.

**Params**

- key `string` - key in configuration. Like 'simpleKey' or 'section.subsection.complex.key'. See config-managet-test.js  

**Returns**: `*` - value - `value` of `key`. Can be `primitive` or `javascript object`. Objects not connected to original configuration.If value contain reference (`{$ref: 'some.reference.to.other.key'}`), then return reference value,if value contain reference with template(`{ $ref: 'some.reference', $tmpl: '{some}:{template}.{string}' }`)and reference point to object then return string with populated placeholder in template (look example on top of page).  
**Example**  
<caption>Using deep references</caption>```js// Configuration example{     nameValue: 'loginName',     dbParams: {         username: { $ref: 'web.nameValue' },         password: '12345'     },     dbConnection: {         user: { $ref: 'web.dbParams' },         key: { $ref: 'web.sessionKey' }     },     dbConectionStr: {         $ref: 'web.dbConnection',         $tmpl: 'db:{user.username}::{user.password}@{key}'     }};configManager.get('dbConnection'); //should return object// {//   user: {//       username: 'loginName',//       password: '12345'//   },//   key: '6ketaq3cgo315rk9'// }configManager.get('dbConectionStr'); //should return string 'db:loginName::12345@6ketaq3cgo315rk9'```

<a name="module_kea-config.set"></a>
<h2 id="kea-config-kea-config-set-key-value-">kea-config.set(key, value)</h2>
Set 'value' for 'key'

**Params**

- key `string` - key in configuration. Like 'simpleKey' or 'section.subsection.complex.key'. See config-managet-test.js  
- value `*`  

<a name="module_kea-config.has"></a>
<h2 id="kea-config-kea-config-has-key-">kea-config.has(key)</h2>
Check availability of key in configuration

**Params**

- key   

**Returns**: `boolean`  
