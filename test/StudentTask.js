require('mocha');
const assert = require('assert');
require('@babel/register');
const StudentTask = require('../src/loaders/StudentTask').default;
const { TAG_ID_REGEX_G, generateId, TagStudentTask } = require('../src/utils');
const assertItem = (extra = '') => {
  const id = generateId();
  let text = `${TagStudentTask}${id}${extra ? '\n' + extra : ''}`;
  let dot = StudentTask.parse(text);
  assert.strictEqual(dot.taskId, id);
  assert.strictEqual(
    StudentTask.unParse(dot).replace(TAG_ID_REGEX_G, '').trim(),
    text.replace(TAG_ID_REGEX_G, '').trim()
  );
  if (extra) {
    assert.strictEqual(dot.contentArray[0].content, `${id}\n${extra}`);
  }
};
describe('StudentTask', function () {
  it('basic', function () {
    assertItem();
    assertItem('备注内容');
  });
});
