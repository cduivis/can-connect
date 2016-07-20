/*can-connect@0.6.0-pre.11#can/super-map/super-map*/
define(function (require, exports, module) {
    var connect = require('../../can-connect');
    var constructor = require('../../constructor/constructor');
    var canMap = require('../map/map');
    var constructorStore = require('../../constructor/store/store');
    var dataCallbacks = require('../../data/callbacks/callbacks');
    var callbacksCache = require('../../data/callbacks-cache/callbacks-cache');
    var combineRequests = require('../../data/combine-requests/combine-requests');
    var localCache = require('../../data/localstorage-cache/localstorage-cache');
    var dataParse = require('../../data/parse/parse');
    var dataUrl = require('../../data/url/url');
    var fallThroughCache = require('../../fall-through-cache/fall-through-cache');
    var realTime = require('../../real-time/real-time');
    var inlineCache = require('../../data/inline-cache/inline-cache');
    var callbacksOnce = require('../../constructor/callbacks-once/callbacks-once');
    var $ = require('jquery');
    connect.superMap = function (options) {
        var behaviors = [
            constructor,
            canMap,
            constructorStore,
            dataCallbacks,
            combineRequests,
            inlineCache,
            dataParse,
            dataUrl,
            realTime,
            callbacksOnce
        ];
        if (typeof localStorage !== 'undefined') {
            if (!options.cacheConnection) {
                options.cacheConnection = connect([localCache], {
                    name: options.name + 'Cache',
                    idProp: options.idProp,
                    algebra: options.algebra
                });
            }
            behaviors.push(callbacksCache, fallThroughCache);
        }
        options.ajax = $.ajax;
        return connect(behaviors, options);
    };
    module.exports = connect.superMap;
});
//# sourceMappingURL=super-map.js.map