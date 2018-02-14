const mockery = require("mockery");
let MockDynamo = {
    enable: function() {
        mockery.enable({
            useCleanCache: true,
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        const self = this;
        mockery.registerMock("./DynamoAttributesHelper", function () {
            return self;
        });
    },

    get: function(table, userId, callback) {
        let data = MockDynamo.userIdMap[userId];
        if (data === undefined || data === null || isEmptyObject(data)) {
            callback(null, {});
        } else {
            console.log(data.Item["mapAttr"].STATE);
            callback(null, data.Item["mapAttr"]);
        }
    },

    fetch: function(userId) {
        let data = undefined;
        if (userId in this.userIdMap) {
            data = this.userIdMap[userId].Item.mapAttr;
        }
        return data;
    },

    load: function(userId, data) {
        this.set(undefined, userId, data);
    },

    reset: function () {
        MockDynamo.userIdMap = {};
    },

    set: function(table, userId, data, callback) {
        const parameters = {
            Item: {
                mapAttr: data,
                userId: userId,
            },
            TableName: table
        };
        
        MockDynamo.userIdMap[userId] = parameters;
        if (callback) {
            callback(null, data);
        }
    },

    userIdMap: {},
};

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

module.exports = MockDynamo;