import BaseItem from './BaseItem';
import {
  convertContentArrayToRawContent,
  IMType,
  TagTakePhotoHuangJin,
  TagTakePhotoSanJiao,
  TagTakePhotoChuiZhi,
  TagTakePhotoSanFen,
  TagTakePhotoShuiPing,
  TagTakePhotoDuiJiao,
} from '../utils';
export const config = {
  [TagTakePhotoHuangJin]: 'huangJin',
  [TagTakePhotoSanJiao]: 'sanJiao',
  [TagTakePhotoChuiZhi]: 'chuiZhi',
  [TagTakePhotoSanFen]: 'sanFen',
  [TagTakePhotoShuiPing]: 'shuiPing',
  [TagTakePhotoDuiJiao]: 'duiJiao',
};
/**
 * 拍照片
 */
export default class TakePhoto extends BaseItem {
  static imType = IMType.takePhoto;
  static parseContent(items) {
    const {} = items;
    const key = Object.keys(config).find((item) => items[0].startsWith(item));
    if (!key) {
      return null;
    }
    return {
      takePhotoType: config[key],
      content: items.join('\n').slice(key.length),
    };
  }
  static unParseContent(dot, {} = {}) {
    const { contentArray, takePhotoType } = dot;
    return (
      Object.keys(config).find((key) => config[key] == takePhotoType) +
      convertContentArrayToRawContent(contentArray)
    );
  }
}
