require("mocha");
const assert = require("assert");
const {
  getDotFromRawText,
  convertDotToRawText,
  getMaterialIdsFromContent,
} = require("./../src/index");
const assertTextOK = (text) => {
  assert.strictEqual(text, convertDotToRawText(getDotFromRawText(text)));
};
describe("im-text", function () {
  describe("steps", function () {
    assertTextOK("小知：测试");
    assert.strictEqual(1, 1);
  });
  describe("getMaterials", function () {
    const targetIds = ["1", "2", "3", "4"];
    const ids = getMaterialIdsFromContent(`小知老师：【图片】1【图片】

小知老师：【图片】2【图片】

小知老师：【图片】3【图片】

【图片】4【图片】

【图片】3【图片】`);
    assert.strictEqual(JSON.stringify(targetIds), JSON.stringify(ids));
  });
  describe("bold inside choice", function () {
    const targetIds = ["1", "2", "3", "4"];
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
        "【粗】选项1【粗】阿斯顿发"
      ),
      true
    );
  });
});
