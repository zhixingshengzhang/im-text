require('mocha');
const assert = require('assert');
require('@babel/register');
const TakePhoto = require('../src/loaders/TakePhoto').default;
const { config } = require('../src/loaders/TakePhoto');
const { TAG_ID_REGEX_G } = require('../src/utils');
const assertItem = (tag, content) => {
  let text = tag + content;
  let dot = TakePhoto.parse(text);
  assert.strictEqual(dot.takePhotoType, config[tag]);
  assert.strictEqual(
    TakePhoto.unParse(dot).replace(TAG_ID_REGEX_G, '').trim(),
    text.trim()
  );
};
describe('TakeVideoTLYY', function () {
  it('basic', function () {
    Object.keys(config).forEach((tag) => {
      assertItem(tag, '');
      assertItem(tag, '其他手多打的内容');
    });
  });
});
