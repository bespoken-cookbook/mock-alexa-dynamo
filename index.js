const mockery = require("mockery");

let MockDynamo = {
    enable: function() {
        const helper = require("alexa-sdk/lib/DynamoAttributesHelper");
        // Check if this is the old version of the dynamo attributes helper (which just returns an object)
        // If so, we go ahead just replace the get and set as before
        if (helper.get) {
            helper.get = this.get;
            helper.get.bind(this);

            helper.set = this.set;
            helper.set.bind(this);
            return;
        }

        // Need to do special handling for Jest, because it does not play well with Mockery
        if (typeof jest !== "undefined") {
            this.enableJest();
        } else {
            this.enableMockery();
        }
    },

    enableJest: function () {
        jest.doMock("alexa-sdk/lib/DynamoAttributesHelper", () => {
            return function () {
                return MockDynamo;
            }
        });
    },

    enableMockery: function() {
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
