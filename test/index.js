require('mocha');
const assert = require('assert');
const {getDotFromRawText, convertDotToRawText} = require('./../src/index')
const assertTextOK = (text)=>{
    assert.strictEqual(text, convertDotToRawText(getDotFromRawText(text)))
}
describe('im-text', function () {
    describe('steps',  function(){
        assertTextOK('小知：测试')
        assert.strictEqual(1,1)
    });
});
