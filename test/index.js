require('mocha');
const assert = require('assert');
require('@babel/register');
const {
  getDotFromRawText,
  convertDotToRawText,
  getMaterialIdsFromContent,
  parseContent,
  getIdAndContentArrayFromText,
} = require('./../src/index');
const assertTextOK = (text) => {
  assert.strictEqual(text, convertDotToRawText(getDotFromRawText(text)));
};
describe('im-text', function () {
  it('steps', function () {
    assertTextOK('【ID】123【ID】\n小知：测试');
    assert.strictEqual(1, 1);
  });
  it('parseContent', function () {
    // 视频 音频 =》 音频 视频
    const contentArray = parseContent('【ID】2【ID】【视频】1【视频】')
    assert.strictEqual(contentArray.length, 2)
    assert.strictEqual(contentArray[0].type, 'ID')
    assert.strictEqual(contentArray[1].type, 'video')
  });
  it('getIdAndContentArrayFromText', function () {
    // 视频 音频 =》 音频 视频
    const {id, contentArray} = getIdAndContentArrayFromText('【ID】2【ID】【视频】1【视频】', {1: {name: 'text'}})
    assert.strictEqual(id, '2')
    assert.strictEqual(contentArray.length, 1)
    assert.strictEqual(contentArray[0].type, 'video')
    assert.strictEqual(contentArray[0].material.name, 'text')
  });
  it('getMaterials', function () {
    const targetIds = ['1', '2', '3', '4'];
    const ids = getMaterialIdsFromContent(`小知老师：【图片】1【图片】

小知老师：【图片】2【图片】

小知老师：【图片】3【图片】

【图片】4【图片】

【图片】3【图片】`);
    assert.strictEqual(JSON.stringify(targetIds), JSON.stringify(ids));
  });

  it('bold inside choice', function () {
    const targetIds = ['1', '2', '3', '4'];
    let dot = getDotFromRawText(`小知：选择内容
- 【粗】选项1【粗】阿斯顿发
错误解释1（可不填）
- 选项2【正确】
正确解释（可不填）
- 选项3
错误解释3（可不填，会继承前面的错误解释）
`);
    const text = convertDotToRawText(dot);
    assert.strictEqual(
      getDotFromRawText(text).edges[0].choices[0].content.startsWith(
        '【粗】选项1【粗】阿斯顿发'
      ),
      true
    );
  });

  it('fillBlank', function () {
    const text =
      '【ID】123【ID】\n【填空题】说出你最喜欢的短视频阿发阿发阿发提示文字：请输入';
    assert.strictEqual(convertDotToRawText(getDotFromRawText(text)), text);
    const textWithoutId =
      '【填空题】说出你最喜欢的短视频阿发阿发阿发\n提示文字：请输入';
    const dot = getDotFromRawText(textWithoutId);
    assert.strictEqual(dot.edges[0].contentArray.length, 1);
    assert.strictEqual(
      dot.edges[0].contentArray[0].content,
      '说出你最喜欢的短视频阿发阿发阿发'
    );
  });

  it('single choice with material', function () {
    let dot = getDotFromRawText(`小知：选择内容
- 【音频】EwNfPoI7OJu-eGDYKqeqo【音频】【ID】123【ID】
- 【音频】EwNfPoI7OJu-eGDYKqeqo【音频】【正确】
- 【音频】EwNfPoI7OJu-eGDYKqeqo【音频】
错误解释3（可不填，会继承前面的错误解释）【粗】阿发【粗】
`);
    console.log('==========', convertDotToRawText(dot));
  });
  it('multiple choice', function () {
    let dot = getDotFromRawText(`小知：【多选题】选择内容
- 【粗】选项1【粗】阿斯顿发
- 选项2【正确】
- 选项3
错误解释3（可不填，会继承前面的错误解释）【粗】阿发【粗】
`);
    console.log('==========', convertDotToRawText(dot));
  });
});
