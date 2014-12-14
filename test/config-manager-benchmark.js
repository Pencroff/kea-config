/**
 * Created by Pencroff on 13.12.2014.
 */

var path = require('path'),
    root = __dirname,
    testConfFolder = path.join(root, 'testConfigFiles'),
    mainConf = path.join(testConfFolder, 'main.conf.js'),
    configManager = require('../src/config-manager.js');
configManager.init(mainConf);

// A test suite
module.exports = {
    name: 'kea-config benchmark',
    tests: {
        'Get with simple key': function () {
            'use strict';
            var i = configManager.get('web.sessionKey');
        },
        'Get with deep key': function () {
            'use strict';
            var i = configManager.get('web.level1.level2.level3.level4.level5');
        },
        'Set with simple key': function () {
            'use strict';
            configManager.set('web.sessionKey', 'session');
        },
        'Set with deep key': function () {
            'use strict';
            configManager.set('web.level1.level2.level3.level4.level5', 'New Deep Value');
        }
    }
};