import BaseItem from './BaseItem';
import {
  convertContentArrayToRawContent,
  IMType,
  TagTakeVideoGen,
  TagTakeVideoGuding,
  TagTakeVideoJiang,
  TagTakeVideoLa,
  TagTakeVideoSheng,
  TagTakeVideoShuai,
  TagTakeVideoTui,
  TagTakeVideoYao,
  TagTakeVideoYi,
} from '../utils';
export const config = {
  [TagTakeVideoTui]: 'tui',
  [TagTakeVideoLa]: 'la',
  [TagTakeVideoYao]: 'yao',
  [TagTakeVideoYi]: 'yi',
  [TagTakeVideoGen]: 'gen',
  [TagTakeVideoShuai]: 'shuai',
  [TagTakeVideoSheng]: 'sheng',
  [TagTakeVideoJiang]: 'jiang',
  [TagTakeVideoGuding]: 'guding',
};
/**
 * 拍视频组件：推拉摇移
 */
export default class TakeVideoTLYY extends BaseItem {
  static imType = IMType.takeVideoTLYY;
  static parseContent(items) {
    const {} = items;
    const key = Object.keys(config).find((item) => items[0].startsWith(item));
    if (!key) {
      return null;
    }
    return {
      tlyyType: config[key],
      content: items.join('\n').slice(key.length),
    };
  }
  static unParseContent(dot, {} = {}) {
    const { contentArray, tlyyType } = dot;
    return (
      Object.keys(config).find((key) => config[key] == tlyyType) +
      convertContentArrayToRawContent(contentArray)
    );
  }
}
