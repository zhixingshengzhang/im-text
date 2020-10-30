import BaseItem from './BaseItem';
import {IMType, TagVideoSort} from '../utils';

export default class VideoSort extends BaseItem {
  static imType = IMType.videoSort;
  static prefixTag = TagVideoSort;
}
