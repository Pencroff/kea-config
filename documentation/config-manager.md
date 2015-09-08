<a name="module_kea-config"></a>
## kea-config
Configuration manager for Node.js applications.


* [kea-config](#module_kea-config)
  * [.setup(dirPath)](#module_kea-config.setup)
  * [.init(path)](#module_kea-config.init)
  * [.update(path)](#module_kea-config.update)
  * [.setData(data, isMerge)](#module_kea-config.setData)
  * [.getData()](#module_kea-config.getData)
  * [.get(key)](#module_kea-config.get) ⇒ <code>\*</code>
  * [.set(key, value)](#module_kea-config.set)
  * [.has(key)](#module_kea-config.has) ⇒ <code>boolean</code>

<a name="module_kea-config.setup"></a>
### kea-config.setup(dirPath)
Full init config based on environment variable `NODE_ENV`. If `NODE_ENV` not available use `development` as default.This method looking for two files main (name started from 'main' word) and file with name started from environment (like development, staging, production)

**Kind**: static method of <code>[kea-config](#module_kea-config)</code>  

| Param | Type | Description |
| --- | --- | --- |
| dirPath | <code>string</code> &#124; <code>object</code> | path to folder with configuration files, from project root |

<a name="module_kea-config.init"></a>
### kea-config.init(path)
ConfigManager initialization by data in file. Not save previous configuration.

**Kind**: static method of <code>[kea-config](#module_kea-config)</code>  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | path to CommonJs module with configuration, from project root |

<a name="module_kea-config.update"></a>
### kea-config.update(path)
Update exist configuration. Merge new config to exist.

**Kind**: static method of <code>[kea-config](#module_kea-config)</code>  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | path to CommonJs module with configuration, from project root |

<a name="module_kea-config.setData"></a>
### kea-config.setData(data, isMerge)
Set / merge data in configuration manager

**Kind**: static method of <code>[kea-config](#module_kea-config)</code>  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | configuration data |
| isMerge | <code>boolean</code> | should manager merge data to exist configuration |

<a name="module_kea-config.getData"></a>
### kea-config.getData()
Get whole configuration as an object

**Kind**: static method of <code>[kea-config](#module_kea-config)</code>  
<a name="module_kea-config.get"></a>
### kea-config.get(key) ⇒ <code>\*</code>
Get 'value' of 'key'.

**Kind**: static method of <code>[kea-config](#module_kea-config)</code>  
**Returns**: <code>\*</code> - value - `value` of `key`. Can be `primitive` or `javascript object`. Objects not connected to original configuration.If value contain reference (`{$ref: 'some.reference.to.other.key'}`), then return reference value,if value contain reference with template(`{ $ref: 'some.reference', $tmpl: '{some}:{template}.{string}' }`)and reference point to object then return string with populated placeholder in template (look example on top of page).  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | key in configuration. Like 'simpleKey' or 'section.subsection.complex.key'. See config-managet-test.js |

**Example**  
<caption>Using deep references</caption>```js // Configuration example {      nameValue: 'loginName',      dbParams: {          username: { $ref: 'web.nameValue' },          password: '12345'      },      dbConnection: {          user: { $ref: 'web.dbParams' },          key: { $ref: 'web.sessionKey' }      },      dbConectionStr: {          $ref: 'web.dbConnection',          $tmpl: 'db:{user.username}::{user.password}@{key}'      } }; configManager.get('dbConnection'); //should return object // { //   user: { //       username: 'loginName', //       password: '12345' //   }, //   key: '6ketaq3cgo315rk9' // } configManager.get('dbConectionStr'); //should return string 'db:loginName::12345@6ketaq3cgo315rk9'```
<a name="module_kea-config.set"></a>
### kea-config.set(key, value)
Set 'value' for 'key'

**Kind**: static method of <code>[kea-config](#module_kea-config)</code>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | key in configuration. Like 'simpleKey' or 'section.subsection.complex.key'. See config-managet-test.js |
| value | <code>\*</code> |  |

<a name="module_kea-config.has"></a>
### kea-config.has(key) ⇒ <code>boolean</code>
Check availability of key in configuration

**Kind**: static method of <code>[kea-config](#module_kea-config)</code>  

| Param |
| --- |
| key | 

