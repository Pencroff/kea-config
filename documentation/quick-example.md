##Quick example

####Initialization and usage

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

####File ./config/main.conf.js

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