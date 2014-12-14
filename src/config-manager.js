/**
 * Created by Pencroff on 11.12.2014.
 */


/**
  * @module kea-config
 */

var confKeyStrMsg = 'Configuration key not string.',
    path = require('path'),
    conf = {},
    getFnCache = {},
    is = function (obj, type) {
        return typeof obj === type;
    },
    isObj = function (obj) {
        return obj !== null && is(obj, 'object');
    },
    isStr = function (obj) {
        return is(obj, 'string');
    },
    getNestedValue = function (obj, key) {
        'use strict';
        var fn = getFnCache[key];
        if (!fn) {
            fn = getFnNestedValue(key);
            getFnCache[key] = fn;
        }
        return fn(obj);
    },
    getFnNestedValue = function (key) {
        'use strict';
        var parts = key.split('.'),
            body = new Array(parts.length),
            last = parts.pop(),
            len = parts.length,
            fn;
        for (var i = 0; i < len; i += 1) {
            body[i] = "if (typeof (o = o." + parts[i] + ") === 'undefined') return o;";
        }
        body[i] = "return o." + last + ";";
        fn = Function("o", body.join('\n'));
        return fn;
    },
    getLastNodeKey = function (key, obj) {
        'use strict';
        var keysArr = key.split('.'),
            lastKeyPart = keysArr.pop(),
            len = keysArr.length,
            i, k, objNext;
        for (i = 0; i < len; i += 1) {
            k = keysArr[i];
            objNext = obj[k];
            if (!isObj(objNext)) {
                objNext = obj[k] = {};
            }
            obj = objNext;
        }
        return {
            node: obj,
            key: lastKeyPart
        };
    },
    deepMerge = function (target, source) {
        'use strict';
        var keys = Object.keys(source),
            len = keys.length,
            i = 0,
            prop,
            isA, isB;
        while (i < len) {
            prop = keys[i];
            isA = isObj(target[prop]);
            isB = isObj(source[prop]);
            if (isA && isB) {
                deepMerge(target[prop], source[prop]);
            } else if (!isA && isB) {
                target[prop] = JSON.parse(JSON.stringify(source[prop]));
            } else {
                target[prop] = source[prop];
            }
            i += 1;
        }
    };
module.exports = {
    /**
     * Full init config based on environment variable `NODE_ENV`. If `NODE_ENV` not available use `development` as default.
     * @param {string} dirPath - path to folder with configuration files
     */
    setup: function (dirPath) {
        'use strict';
        var me = this,
            env = process.env.NODE_ENV || 'development',
            mainPath = path.join(dirPath, 'main.conf'),
            envPath = path.join(dirPath, env + '.conf');
        me.init(mainPath);
        me.update(envPath);
        return me;
    },
    /**
     * ConfigManager initialization by data in file. Not save previous configuration.
     * @param {string} path - path to CommonJs module with configuration
     */
    init: function (path) {
        'use strict';
        var config = require(path);
        conf = JSON.parse(JSON.stringify(config));
        return this;
    },
    /**
     * Update exist configuration. Merge new config to exist.
     * @param {string} path - path to CommonJs module with configuration
     */
    update: function (path) {
        'use strict';
        var updateConf = require(path);
        deepMerge(conf, updateConf);
        return this;
    },
    /**
     * Get 'value' of 'key'.
     * @param {string} key - key in configuration. Like 'simpleKey' or 'section.subsection.complex.key'. See config-managet-test.js
     * @returns {*} value - 'value' of 'key'. Can be primitive or js object. Objects not connected to original configuration.
     */
    get: function (key) {
        'use strict';
        var value = conf[key];
        if (!isStr(key)) {
            throw new Error(confKeyStrMsg, 'config-manager');
        }
        if (key.indexOf('.') !== -1) {
            value = getNestedValue(conf, key);
        }
        if (isObj(value)) {
            value = JSON.parse(JSON.stringify(value));
        }
        return value;
    },
    /**
     * Set 'value' for 'key'
     * @param {string} key - key in configuration. Like 'simpleKey' or 'section.subsection.complex.key'. See config-managet-test.js
     * @param {*} value
     */
    set: function (key, value) {
        'use strict';
        var obj;
        if (!isStr(key)) {
            throw new Error(confKeyStrMsg, 'config-manager');
        }
        if (key.indexOf('.') === -1) {
            conf[key] = value;
        } else {
            obj = getLastNodeKey(key, conf);
            obj.node[obj.key] = value;
        }
        return this;
    },
    /**
     * Check availability of key in configuration
     * @param key
     * @returns {boolean}
     */
    has: function (key) {
        'use strict';
        return !!this.get(key);
    }
};
