require('mocha');
const assert = require('assert');
require('@babel/register');
const SubTitle = require('../src/loaders/SubTitle').default;
const { TAG_ID_REGEX_G, TagSubTitle } = require('../src/utils');
describe('SubTitle', function () {
  it('basic', function () {
    const text = `${TagSubTitle}小标题`;
    const dot = SubTitle.parse(text);
    assert.strictEqual(dot.contentArray.length, 1);
    assert.strictEqual(dot.contentArray[0].content, '小标题');
    assert.strictEqual(
      SubTitle.unParse(dot).replace(TAG_ID_REGEX_G, '').trim(),
      text.replace(TAG_ID_REGEX_G, '').trim()
    );
  });
});
