kea-config
==========

Config manager for Node.js applications.
Support merge multiple configurations for different Node.js environment.

##API

* * *

### kea-config.setup(dirPath)

Full init config based on environment

**Parameters**

**dirPath**: `string`, path to folder with config



### kea-config.init(path)

ConfigManager initialization. Delete previous config.

**Parameters**

**path**: `string`, path to CommonJs module with configuration



### kea-config.update(path)

Update exist configuration. Merge new config to exist. Throw exception if key for update not exist or have different type in original and configuration for update.

**Parameters**

**path**: `string`, path to CommonJs module with configuration



### kea-config.get(key)

Get 'value' of 'key'.

**Parameters**

**key**: `string`, key in configuration. Like 'simpleKey' or 'section.subsection.complex.key'. See ConfigManagerTest.js

**Returns**: `*`, value - 'value' of 'key'. Can be primitive or js object. Objects not connected to original configuration.


### kea-config.set(key, value)

Set 'value' for 'key'

**Parameters**

**key**: `string`, key in configuration. Like 'simpleKey' or 'section.subsection.complex.key'. See ConfigManagerTest.js

**value**: `*`, Set 'value' for 'key'



### kea-config.has(key)

Check availability of key in configuration

**Parameters**

**key**: , Check availability of key in configuration

**Returns**: `boolean`



* * *

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

## Licens

MIT
