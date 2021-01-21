import BaseItem from './BaseItem';
import {IMType, TagVideoSplit} from '../utils';

export default class VideoCut extends BaseItem {
  static imType = IMType.videoSplit;
  static prefixTag = TagVideoSplit;
}
