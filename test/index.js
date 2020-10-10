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
});
