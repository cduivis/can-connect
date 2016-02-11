/*can-connect@0.3.3#can/can*/
define(function (require, exports, module) {
    var can = require('can/util');
    can.isPromise = can.isDeferred = function (obj) {
        return obj && (window.Promise && obj instanceof Promise || can.isFunction(obj.then) && can.isFunction(obj['catch'] || obj.fail));
    };
});
//# sourceMappingURL=can.js.map