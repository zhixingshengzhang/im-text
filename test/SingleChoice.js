require('mocha');
const assert = require('assert');
require('@babel/register');
const singleChoice = require('../src/loaders/SingleChoice').default;
const {TAG_ID_REGEX_G} = require('../src/utils');
describe('singleChoice', function () {
  it('basic', function () {
    const text = `选择内容
- 【音频】EwNfPoI7OJu-eGDYKqeqo【音频】【ID】123【ID】
- 【音频】EwNfPoI7OJu-eGDYKqeqo【音频】【正确】
- 【音频】EwNfPoI7OJu-eGDYKqeqo【音频】
错误解释
`;
    const dot = singleChoice.parse(text);
    assert.strictEqual(dot.materialIds.length, 1);
    assert.strictEqual(dot.contentArray.length, 1);
    assert.strictEqual(dot.choices.length, 3);
    assert.strictEqual(dot.choices[0].id, '123');
    assert.strictEqual(dot.choices[2].hintContentArray.length, 1);
    assert.strictEqual(dot.choices[2].hintFake, undefined);
    assert.strictEqual(dot.choices[1].hintContentArray.length, 1);
    assert.strictEqual(dot.choices[1].hintFake, true);
    assert.strictEqual(
      singleChoice.unParseContent(dot).replace(TAG_ID_REGEX_G, ''),
      text.replace(TAG_ID_REGEX_G, '').trim()
    );
  });
});
