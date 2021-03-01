import {
  convertContentArrayToRawContent,
  ID_REGEX,
  IMType,
  TagInteractiveVideo,
} from '../utils';
import BaseItem from './BaseItem';

export default class InteractiveVideo extends BaseItem {
  static imType = IMType.interactiveVideo;
  static prefixTag = TagInteractiveVideo;
  static parseContent(textItems, materialsMap) {
    let interactiveVideoId = null;

    let items = textItems;
    if (items.length > 0) {
      const match = textItems[0].match(ID_REGEX);
      if (match && match.index >= 0) {
        interactiveVideoId = match[0];
        items[0] =
          items[0].slice(0, match.index) +
          items[0].slice(match.index + interactiveVideoId.length);
      }
    }
    return {
      interactiveVideoId,
      content: items.filter((item) => !!item).join('\n'),
    };
  }
  static unParseContent(dot, {} = {}) {
    const { contentArray, interactiveVideoId } = dot;
    return [interactiveVideoId, convertContentArrayToRawContent(contentArray)]
      .filter((item) => !!item)
      .join('\n');
  }
}
