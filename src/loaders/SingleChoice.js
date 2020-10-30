import BaseItem from './BaseItem';
import { convertContentArrayToRawContent, IMType } from '../utils';
export default class SingleChoice extends BaseItem {
  static imType = IMType.singleChoice;
  static parseContent(oldTextItems, materialsMap) {
    const { choices, textItems, materialIds } = this.getChoices(
      oldTextItems,
      materialsMap,
      { fakeHint: true }
    );
    if (choices.length == 0) {
      return null;
    }
    return { choices, materialIds, content: textItems.join('\n') };
  }
  static unParseContent(dot) {
    const { contentArray, choices } = dot;
    return (
      convertContentArrayToRawContent(contentArray) +
      '\n' +
      this.parseChoices(choices)
    );
  }
}
