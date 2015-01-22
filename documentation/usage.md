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