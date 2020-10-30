import {
  convertContentArrayToRawContent,
  IMType,
  TagFillBlank,
  FillBlankPlaceholderPrefix,
} from '../utils';
import BaseItem from './BaseItem';
export default class FillBlank extends BaseItem {
  static imType = IMType.fillBlank;
  static prefixTag = TagFillBlank;
  static parseContent(textItems, materialsMap) {
    let placeholder = undefined;
    let items = textItems;
    if (
      textItems[textItems.length - 1].startsWith(FillBlankPlaceholderPrefix)
    ) {
      placeholder = textItems[textItems.length - 1].slice(
        FillBlankPlaceholderPrefix.length
      );
      items = textItems.slice(0, -1);
    }
    return { placeholder, content: items.join('\n') };
  }
  static unParseContent(dot, {} = {}) {
    const { contentArray, placeholder } = dot;
    return (
      convertContentArrayToRawContent(contentArray) +
      (placeholder ? '\n' + FillBlankPlaceholderPrefix + placeholder : '')
    );
  }
}
