require('mocha');
const assert = require('assert');
require('@babel/register');
const TakeVideoTLYY = require('../src/loaders/TakeVideoTLYY').default;
const { config } = require('../src/loaders/TakeVideoTLYY');
const { TAG_ID_REGEX_G, TagSteps } = require('../src/utils');
const assertItem = (tag, content) => {
  let text = tag + content;
  let dot = TakeVideoTLYY.parse(text);
  assert.strictEqual(dot.tlyyType, config[tag]);
  assert.strictEqual(
    TakeVideoTLYY.unParse(dot).replace(TAG_ID_REGEX_G, '').trim(),
    text.trim()
  );
};
describe('TakeVideoTLYY', function () {
  it('basic', function () {
    Object.keys(config).forEach((tag) => {
      assertItem(tag, '');
      assertItem(tag, '其他手多打的内容');
    });
  });
});
