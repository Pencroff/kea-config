/**
 * Created by Pencroff on 11.12.2014.
 */


/**
 * Configuration manager for Node.js applications.
 * @module kea-config
 */

var confKeyStrMsg = 'Configuration key not string.',
    path = require('path'),
    conf = {},
    getFnCache = {},
    templatesCache = {},
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
    },
    getKeysFromTemplate = function (tmpl) {
        var rexExp =  /\{(.*?)\}/g,
            matches = templatesCache[tmpl],
            len,
            i;
        if (!matches) {
            matches = tmpl.match(rexExp);
            len = matches.length;
            for (i = 0; i < len; i += 1) {
                matches[i] = matches[i].substr(1, matches[i].length - 2);
            }
            templatesCache[tmpl] = matches;
        }

        return matches;
    },
    strTemplate = function (text, replacements) {
        'use strict';
        var keys = getKeysFromTemplate(text),//Object.keys(replacements),
            len = keys.length,
            i = 0,
            key,
            value;
        while (i < len) {
            key = keys[i];
            if (key.indexOf('.') !== -1) {
                value = getNestedValue(replacements, key);
            } else {
                value = replacements[key];
            }
            if (value) {
                text = text.split('{' + key + '}').join(value);
            }
            i += 1;
        }
        return text;
    },
    isExtensionObj = function (value) {
        var result = false;
        if(isStr(value.$ref)) {
            result = true;
        }
        return result;
    },
    applyExtension = function (value) {
        var result = this.get(value.$ref);
        if (isObj(result) && isStr(value.$tmpl)) {
            result = strTemplate(value.$tmpl, result);
        }
        return result;
    },
    openReferences = function (obj) {
        var keys = Object.keys(obj),
            len = keys.length,
            i = 0,
            prop,
            value;
        while (i < len) {
            prop = keys[i];
            value = obj[prop];
            if (isObj(value)) {
                if (isExtensionObj(value)) {
                    value = applyExtension.call(this, value);
                } else {
                    value = openReferences.call(this, value);
                }
                obj[prop] = value;
            }
            i += 1;
        }
        return obj;
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
     * @returns {*} value - `value` of `key`. Can be `primitive` or `javascript object`. Objects not connected to original configuration.
     * If value contain reference (`{$ref: 'some.reference.to.other.key'}`), then return reference value,
     * if value contain reference with template(`{ $ref: 'some.reference', $tmpl: '{some}:{template}.{string}' }`)
     * and reference point to object then return string with populated placeholder in template (look example on top of page).
     * @example <caption>Using deep references</caption>
     * ```js
     *  // Configuration example
     *  {
     *       nameValue: 'loginName',
     *       dbParams: {
     *           username: { $ref: 'web.nameValue' },
     *           password: '12345'
     *       },
     *       dbConnection: {
     *           user: { $ref: 'web.dbParams' },
     *           key: { $ref: 'web.sessionKey' }
     *       },
     *       dbConectionStr: {
     *           $ref: 'web.dbConnection',
     *           $tmpl: 'db:{user.username}::{user.password}@{key}'
     *       }
     *  };
     *  configManager.get('dbConnection'); //should return object
     *  // {
     *  //   user: {
     *  //       username: 'loginName',
     *  //       password: '12345'
     *  //   },
     *  //   key: '6ketaq3cgo315rk9'
     *  // }
     *  configManager.get('dbConectionStr'); //should return string 'db:loginName::12345@6ketaq3cgo315rk9'
     * ```
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
            if (isExtensionObj(value)) {
                value = applyExtension.call(this, value);
            } else {
                value = openReferences.call(this, value);
                value = JSON.parse(JSON.stringify(value));
            }
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
