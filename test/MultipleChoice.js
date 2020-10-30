require('mocha');
const assert = require('assert');
require('@babel/register');
const multipleChoice = require('../src/loaders/MultipleChoice').default;
const { TAG_ID_REGEX_G, TagMultipleChoice } = require('../src/utils');
describe('multipleChoice', function () {
  it('basic', function () {
    const text = `${TagMultipleChoice}选择内容
- 【音频】EwNfPoI7OJu-eGDYKqeqo【音频】【ID】123【ID】
- 【音频】EwNfPoI7OJu-eGDYKqeqo【音频】【正确】
- 【音频】EwNfPoI7OJu-eGDYKqeqo【音频】
错误解释
`;
    const dot = multipleChoice.parse(text);
    assert.strictEqual(dot.materialIds.length, 1);
    assert.strictEqual(dot.contentArray.length, 1);
    assert.strictEqual(dot.choices.length, 3);
    assert.strictEqual(dot.choices[0].id, '123');
    assert.strictEqual(dot.choices[2].hintContentArray.length, 1);
    assert.strictEqual(dot.choices[2].hintFake, undefined);
    assert.strictEqual(dot.choices[1].hintContentArray.length, 0);
    assert.strictEqual(dot.choices[1].hintFake, undefined);
    assert.strictEqual(
      multipleChoice.unParse(dot).replace(TAG_ID_REGEX_G, '').trim(),
      text.replace(TAG_ID_REGEX_G, '').trim()
    );
  });
});
