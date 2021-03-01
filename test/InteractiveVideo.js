require('mocha');
const assert = require('assert');
require('@babel/register');
const InteractiveVideo = require('../src/loaders/InteractiveVideo').default;
const { TagInteractiveVideo, TAG_ID_REGEX_G } = require('../src/utils');
const { generateId } = require('../src');

const assertItem = (suffix = '', length = 1) => {
  const id = generateId();
  let text = `${TagInteractiveVideo}${id}${suffix}`;
  let dot = InteractiveVideo.parse(text);
  assert.strictEqual(dot.interactiveVideoId, id);
  assert.strictEqual(dot.contentArray.length, length);
  let unParseResult = InteractiveVideo.unParse(dot)
    .replace(TAG_ID_REGEX_G, '')
    .trim();
  // 对于 【交互视频】id 内容 会转换为【交互视频】id \n内容
  if (suffix && !suffix.startsWith('\n')) {
    unParseResult = unParseResult.replace('\n', '');
  }
  assert.strictEqual(text, unParseResult);
};
describe('InteractiveVideo', function () {
  it('basic', function () {
    assertItem('', 0);
    assertItem('\n测试', 1);
    assertItem('测试\n测试', 1);
  });
});
