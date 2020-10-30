import BaseItem from './BaseItem';
import {convertContentArrayToRawContent, IMType, TagSteps} from '../utils';

export default class Steps extends BaseItem {
  static imType = IMType.steps;
  static prefixTag = TagSteps;
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
  static unParseContent(dot, {} = {}) {
    const { contentArray, choices } = dot;
    return (
      convertContentArrayToRawContent(contentArray) +
      '\n' +
      this.parseChoices(choices, { showChoiceId: false })
    );
  }
}
