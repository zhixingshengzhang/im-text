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
  TagStudentTask,
} from '../utils';

/**
 * 学员作业
 * @example
 * <pre>
 *【学员作业】id string
 * 自定义文案
 * </pre>
 */
export default class StudentTask extends BaseItem {
  static imType = IMType.studentTask;
  static prefixTag = TagStudentTask;
  static parseContent(items) {
    return {
      taskId: items[0] || '',
      content: items.join('\n'),
    };
  }
  // static unParseContent(dot, {} = {}) {
  //   const { contentArray, takePhotoType } = dot;
  //   return (
  //     Object.keys(config).find((key) => config[key] == takePhotoType) +
  //     convertContentArrayToRawContent(contentArray)
  //   );
  // }
}
