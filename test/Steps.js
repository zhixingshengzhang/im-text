require('mocha');
const assert = require('assert');
require('@babel/register');
const steps = require('../src/loaders/Steps').default;
const { TAG_ID_REGEX_G, TagSteps } = require('../src/utils');
describe('steps', function () {
  it('basic', function () {
    const text = `${TagSteps}选择内容
- 【音频】EwNfPoI7OJu-eGDYKqeqo【音频】
- 【音频】EwNfPoI7OJu-eGDYKqeqo【音频】【正确】
- 【音频】EwNfPoI7OJu-eGDYKqeqo【音频】
`;
    const dot = steps.parse(text);
    assert.strictEqual(dot.materialIds.length, 1);
    assert.strictEqual(dot.contentArray.length, 1);
    assert.strictEqual(dot.choices.length, 3);
    dot.choices.forEach(({ hintContentArray, hintFake }) => {
      assert.strictEqual(hintContentArray.length, 0);
      assert.strictEqual(hintFake, undefined);
    });
    assert.strictEqual(
      steps.unParse(dot).replace(TAG_ID_REGEX_G, '').trim(),
      text.replace(TAG_ID_REGEX_G, '').trim()
    );
  });
});
