
require('mocha');
const assert = require('assert');
require('@babel/register');
const FillBlank = require('../src/loaders/FillBlank').default;
const {
  TagFillBlank,
  TAG_ID_REGEX_G,
  FillBlankPlaceholderPrefix,
} = require('../src/utils');
describe('FillBlank', function () {
  it('basic', function () {
    const text = `${TagFillBlank}输入内容
${FillBlankPlaceholderPrefix}提示
`;
    const dot = FillBlank.parse(text);
    assert.strictEqual(dot.placeholder, '提示');
    assert.strictEqual(dot.contentArray.length, 1);
    assert.strictEqual(dot.contentArray[0].content, '输入内容');
    assert.strictEqual(
      FillBlank.unParse(dot).replace(TAG_ID_REGEX_G, '').trim(),
      text.replace(TAG_ID_REGEX_G, '').trim()
    );
  });
  it('without placeholder', function () {
    const text = `${TagFillBlank}输入内容`;
    const dot = FillBlank.parse(text);
    assert.strictEqual(dot.placeholder, undefined);
    assert.strictEqual(dot.contentArray.length, 1);
    assert.strictEqual(dot.contentArray[0].content, '输入内容');
    assert.strictEqual(
      FillBlank.unParse(dot).replace(TAG_ID_REGEX_G, '').trim(),
      text.replace(TAG_ID_REGEX_G, '').trim()
    );
  });
});
