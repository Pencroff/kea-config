/**
 * Created by sergii.danilov on 27/05/2014.
 */
var config = {}

config.web = {
    port: process.env.WEB_PORT || 8805,
    sessionKey: '6ketaq3cgo315rk9',
    paging: {
        defaultPageSize: 25,
        numberVisiblePages: 10
    },
    level1: {
        level2: {
            level3: {
                level4: {
                    level5: 'Deep Value'
                }
            }
        }
    },
    mongoDb: {
        username: 'dbUser',
        password: 'strongPassword',
        host: 'localhost',
        port: 27101,
        db: 'database'
    },
    refToMongo: {
        $ref: 'web.mongoDb',
        $tmpl: 'mongodb://{username}:{password}@{host}:{port}/{db}'
    },
    refToSimpleData: {
        $ref: 'web.paging.numberVisiblePages',
        $tmpl: 'mongodb://{username}:{password}@{host}:{port}/{db}'
    },
    refToProperty: { $ref: 'web.paging.defaultPageSize' },
    refToObj: { $ref: 'web.paging' }
};

module.exports = config;