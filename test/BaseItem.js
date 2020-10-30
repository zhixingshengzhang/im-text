require('mocha');
const assert = require('assert');
require('@babel/register');
const SingleChoice = require('../src/loaders/SingleChoice').default;
const MultipleChoice = require('../src/loaders/MultipleChoice').default;
const Steps = require('../src/loaders/Steps').default;
const FillBlank = require('../src/loaders/FillBlank').default;
const SubTitle = require('../src/loaders/SubTitle').default;
const VideoCut = require('../src/loaders/VideoCut').default;
const VideoSort = require('../src/loaders/VideoSort').default;
const {
  TagMultipleChoice,
  TagSteps,
  TagFillBlank,
  TagSubTitle,
  TagVideoCut,
  TagVideoSort,
} = require('../src/utils');
const assertItem = (text, item) => {
  let dot = item.parse(text);
  assert.strictEqual(dot.imType, item.imType);
  assert.notStrictEqual(dot.id, undefined);
  assert.notStrictEqual(dot.contentArray, undefined);
  dot = item.parse(text, {}, { withRawText: true });
  assert.notStrictEqual(dot.id, undefined);
  assert.notStrictEqual(dot.contentArray, undefined);
  assert.strictEqual(dot.rawText, text);
};
describe('BaseItem', function () {
  it('items', function () {
    let text = `选择内容
- 【音频】EwNfPoI7OJu-eGDYKqeqo【音频】【ID】123【ID】
- 【音频】EwNfPoI7OJu-eGDYKqeqo【音频】【正确】
- 【音频】EwNfPoI7OJu-eGDYKqeqo【音频】
错误解释3（可不填，会继承前面的错误解释）【粗】阿发【粗】
`;
    assertItem(text, SingleChoice);
    assertItem(TagMultipleChoice + text, MultipleChoice);
    assertItem(TagSteps + text, Steps);
    text = '输入';
    assertItem(TagFillBlank + text, FillBlank);
    text = '小标题';
    assertItem(TagSubTitle + text, SubTitle);
    assertItem(TagVideoCut + text, VideoCut);
    assertItem(TagVideoSort + text, VideoSort);
  });
});
