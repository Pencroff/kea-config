# ![Kea-logo](/img/kea-logo.png) kea-config

Config manager for Node.js applications.
Support merging multiple configurations for different Node.js environment.

## Usage

Install with npm:

    npm install kea-config --save

In your code require the package:

    var configManager = require('kea-config');

Setup configuration data

    configManager.setup('./config');

This command will initialize `configManager` by `main.conf.js` in and then merge `development.conf.js` (if `NODE_ENV === development`)

Read (`get`) and write (`set`) config data:

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

* Statements   : 100% ( 62/62 )
* Branches     : 96.15% ( 25/26 )
* Functions    : 100% ( 13/13 )
* Lines        : 100% ( 62/62 )

## Performance test

* Get simple key x 6,280,396 ops/sec +0.38%
* Get deep key x 5,277,113 ops/sec +0.24%
* Set simple key x 3,927,440 ops/sec +0.64%
* Set deep key x 2,254,652 ops/sec +0.28%

## Road map

* support yaml, json
* delete key

## Licens

MIT
