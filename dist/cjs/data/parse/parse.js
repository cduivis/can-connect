/*can-connect@0.6.0-pre.24#data/parse/parse*/
var connect = require('../../can-connect.js');
var each = require('can-util/js/each/each');
var isArray = require('can-util/js/is-array/is-array');
var string = require('can-util/js/string/string');
module.exports = connect.behavior('data/parse', function (baseConnect) {
    var behavior = {
        parseListData: function (responseData) {
            if (baseConnect.parseListData) {
                responseData = baseConnect.parseListData.apply(this, arguments);
            }
            var result;
            if (isArray(responseData)) {
                result = { data: responseData };
            } else {
                var prop = this.parseListProp || 'data';
                responseData.data = string.getObject(prop, responseData);
                result = responseData;
                if (prop !== 'data') {
                    delete responseData[prop];
                }
                if (!isArray(result.data)) {
                    throw new Error('Could not get any raw data while converting using .parseListData');
                }
            }
            var arr = [];
            for (var i = 0; i < result.data.length; i++) {
                arr.push(this.parseInstanceData(result.data[i]));
            }
            result.data = arr;
            return result;
        },
        parseInstanceData: function (props) {
            if (baseConnect.parseInstanceData) {
                props = baseConnect.parseInstanceData.apply(this, arguments) || props;
            }
            return this.parseInstanceProp ? string.getObject(this.parseInstanceProp, props) || props : props;
        }
    };
    each(pairs, function (parseFunction, name) {
        behavior[name] = function (params) {
            var self = this;
            return baseConnect[name].call(this, params).then(function () {
                return self[parseFunction].apply(self, arguments);
            });
        };
    });
    return behavior;
});
var pairs = {
    getListData: 'parseListData',
    getData: 'parseInstanceData',
    createData: 'parseInstanceData',
    updateData: 'parseInstanceData',
    destroyData: 'parseInstanceData'
};
//# sourceMappingURL=parse.js.map