[![Build Status](https://travis-ci.org/bespoken/mock-alexa-dynamo.svg?branch=master)](https://travis-ci.org/bespoken/mock-alexa-dynamo)  
# Mock Alexa Dynamo
For users of the Alexa Node.js SDK.

Super simple library for mocking out Dynamo dependency.

## Installation
To use it, install with:  
`npm install mock-alexa-dynamo --save`

## Usage
### Initialize
Then enable:  
```javascript
const mockDynamo = require("mock-alexa-dynamo");
mockDynamo.enable();
```

### Presetting State
State can be pre-configured at the start by calling the `load` method:  
```javascript
mockDynamo.load("USER_ID", { userInfo: {} })
```

This would typically be called in a `beforeEach` block in a unit-test.

### Resetting State  
Between tests, to reset the state, just call:  
```
mockDynamo.reset();
```

Typically, this would be placed inside a `afterEach` method in a unit-test.

## Example
To see a full example, check out the Giftionary project:  
[https://github.com/bespoken/giftionary](https://github.com/bespoken/giftionary)

In particular, this test:  
[https://github.com/bespoken/giftionary/blob/master/test/index.test.js](https://github.com/bespoken/giftionary/blob/master/test/index.test.js)


