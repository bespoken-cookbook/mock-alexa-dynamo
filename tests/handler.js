const Alexa = require('alexa-sdk');

const handlers = {
    //Use LaunchRequest, instead of NewSession if you want to use the one-shot model
    // Alexa, ask [my-skill-invocation-name] to (do something)...
    'LaunchRequest': function () {
        this.attributes.speechOutput = "Hello";
        this.response.speak(this.attributes.speechOutput);
        this.emit(':responseReady');
    }
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = undefined;
    alexa.dynamoDBTableName = "NonExistentTable";
    alexa.registerHandlers(handlers);
    alexa.execute();
};