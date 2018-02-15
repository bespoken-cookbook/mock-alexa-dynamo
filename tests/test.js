const VirtualAlexa = require("virtual-alexa").VirtualAlexa;
const assert = require("assert");
const mockDynamo = require("../index");
mockDynamo.enable();

describe("Mock tests", () => {
    it("Enable does not call dynamo", function(done) {
        mockDynamo.load("123", { test: "ABC" });

        const alexa = VirtualAlexa.Builder()
            .intentSchema({
                intents: [],
            })
            .sampleUtterances({})
            .handler("tests/handler.handler")
            .create();
        alexa.launch().then((payload) => {
            assert.equal(Object.keys(mockDynamo.userIdMap).length, 2);
            assert.equal(mockDynamo.fetch("123").test, "ABC");
            mockDynamo.reset();
            assert.equal(Object.keys(mockDynamo.userIdMap).length, 0);
            done();
        })
    });
});

