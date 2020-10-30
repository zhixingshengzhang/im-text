import BaseItem from './BaseItem';
import { convertContentArrayToRawContent } from '../utils';
import { TagMultipleChoice, IMType } from '../utils';

export default class MultipleChoice extends BaseItem {
  static imType = IMType.multipleChoice;
  static prefixTag = TagMultipleChoice;
  static parseContent(oldTextItems, materialsMap) {
    const { choices, textItems, materialIds } = this.getChoices(
      oldTextItems,
      materialsMap
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
