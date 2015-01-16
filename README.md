![Kea-logo](./img/kea-logo.png) 

kea-config
==========

Configuration manager for Node.js applications with perfect performance and without dependencies.
Main feature of this configuration manager is merging configuration files depending on Node.js environment,
support references to other keys and using templates with objects for complex string values.

####Quick example

#####Initialization and usage

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

#####File ./config/main.conf.js

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

#####File ./config/development.conf.js

```js

    var config = {}

    config.web = {
        port: 4343
    };

    module.exports = config;
``` 
#####File ./config/production.conf.js

```js

    var config = {}

    config.web = {
        port: 7474
    };

    module.exports = config;
``` 

## Usage

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
    configManager.set('web.port', 3000);
    // also
    webConfig = configManager.get('web');
    /*
        {
            sessionKey: '123-secret',
            port: 3000
        }
    */

    // Usage references

    configManager.get('web.propertyReference'); // 25

    // Usage templates

    configManager.get('web.templateReference'); // 'mongodb://dbUser:strongPassword@localhost:27101/database' - string
```

##API

### kea-config.setup(dirPath)

Full init config based on environment variable `NODE_ENV`. If `NODE_ENV` not available use `development` as default.

**Parameters**

**dirPath**: `string`, path to folder with configuration files



### kea-config.init(path)

ConfigManager initialization by data in file. Not save previous configuration.

**Parameters**

**path**: `string`, path to CommonJs module with configuration



### kea-config.update(path)

Update exist configuration. Merge new config to exist.

**Parameters**

**path**: `string`, path to CommonJs module with configuration



### kea-config.get(key)

Get 'value' of 'key'.

**Parameters**

**key**: `string`, key in configuration. Like 'simpleKey' or 'section.subsection.complex.key'. See config-managet-test.js

**Returns**: `*`, value - 'value' of 'key'. Can be primitive or js object. Objects not connected to original configuration.
if value contain reference (`{$ref: 'some.reference.to.other.key'}`), then return reference value, if value contain
reference with template(`{ $ref: 'some.reference', $tmpl: '{some}:{template}.{string}' }`) and reference point to object
then return string with populated placeholder in template (look example on top of page).


### kea-config.set(key, value)

Set 'value' for 'key'

**Parameters**

**key**: `string`, key in configuration. Like 'simpleKey' or 'section.subsection.complex.key'. See config-managet-test.js

**value**: `*`, Set 'value' for 'key'



### kea-config.has(key)

Check availability of key in configuration

**Parameters**

**key**: , Check availability of key in configuration

**Returns**: `boolean`

## Testing, coverage and benchmark

 * `npm test` or `gulp mocha` - run tests
 * `gulp cover` - check tests coverage
 * `gulp benchmark` - rum performance test

## Code coverage

* Statements   : 100% ( 79/79 )
* Branches     : 97.06% ( 33/34 )
* Functions    : 100% ( 16/16 )
* Lines        : 100% ( 79/79 )

## Performance test

* Get simple key ...................... x 6,209,118 ops/sec +0.22%
* Get deep key ........................ x 5,184,231 ops/sec +0.20%
* Get key with reference .............. x 1,444,284 ops/sec +0.06%
* Get key with reference and template . x 123,193 ops/sec +0.82%
* Set simple key ...................... x 4,641,383 ops/sec +0.62%
* Set deep key ........................ x 2,377,595 ops/sec +0.24%

## Road map

* support .yml, .yaml, .coffee, .cson, .properties, .json, .json5, .hjson
* adapters for different storages like (filesystem, DB, localstorage / sessionstorage, web api and etc.)
* save current state of config
* delete key

## Inspired by

* ASP.NET web.config approach
* [lorenwest/node-config](https://github.com/lorenwest/node-config) 
* [flatiron/nconf](https://github.com/flatiron/nconf)
* [dominictarr/config-chain](https://github.com/dominictarr/config-chain)

## License

MIT

Image from [thetartankiwi](http://www.thetartankiwi.com/2013/07/nz-native-bird-patterns.html)