let MockDynamo = {
    enable: function() {
        const helper = require("alexa-sdk/lib/DynamoAttributesHelper");
        helper.get = this.get;
        helper.get.bind(this);

        helper.set = this.set;
        helper.set.bind(this);
        this.reset();
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
        callback(null, data);

    },

    userIdMap: {},
};

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

module.exports = MockDynamo;