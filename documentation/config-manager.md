<a name="module_kea-config"></a>
#kea-config
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
##kea-config.setup(dirPath)
Full init config based on environment variable `NODE_ENV`. If `NODE_ENV` not available use `development` as default.

**Params**

- dirPath `string` - path to folder with configuration files  

<a name="module_kea-config.init"></a>
##kea-config.init(path)
ConfigManager initialization by data in file. Not save previous configuration.

**Params**

- path `string` - path to CommonJs module with configuration  

<a name="module_kea-config.update"></a>
##kea-config.update(path)
Update exist configuration. Merge new config to exist.

**Params**

- path `string` - path to CommonJs module with configuration  

<a name="module_kea-config.get"></a>
##kea-config.get(key)
Get 'value' of 'key'.

**Params**

- key `string` - key in configuration. Like 'simpleKey' or 'section.subsection.complex.key'. See config-managet-test.js  

**Returns**: `*` - value - `value` of `key`. Can be `primitive` or `javascript object`. Objects not connected to original configuration.
If value contain reference (`{$ref: 'some.reference.to.other.key'}`), then return reference value,
if value contain reference with template(`{ $ref: 'some.reference', $tmpl: '{some}:{template}.{string}' }`)
and reference point to object then return string with populated placeholder in template (look example on top of page).  
**Example**  
<caption>Using deep references</caption>
```js
    // Configuration example
    {
        nameValue: 'loginName',
        dbParams: {
            username: { $ref: 'web.nameValue' },
            password: '12345'
        },
        dbConnection: {
            user: { $ref: 'web.dbParams' },
            key: { $ref: 'web.sessionKey' }
        },
        dbConectionStr: {
            $ref: 'web.dbConnection',
            $tmpl: 'db:{user.username}::{user.password}@{key}'
        }
    };
    configManager.get('dbConnection'); should return object
    // {
    //   user: {
    //       username: 'loginName',
    //       password: '12345'
    //   },
    //   key: '6ketaq3cgo315rk9'
    // }
    configManager.get('dbConectionStr'); should return string 'db:loginName::12345@6ketaq3cgo315rk9'
```

<a name="module_kea-config.set"></a>
##kea-config.set(key, value)
Set 'value' for 'key'

**Params**

- key `string` - key in configuration. Like 'simpleKey' or 'section.subsection.complex.key'. See config-managet-test.js  
- value `*`  

<a name="module_kea-config.has"></a>
##kea-config.has(key)
Check availability of key in configuration

**Params**

- key   

**Returns**: `boolean`  
