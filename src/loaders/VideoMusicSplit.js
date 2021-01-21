import BaseItem from './BaseItem';
import {IMType, TagVideoMusicSplit} from '../utils';

export default class VideoCut extends BaseItem {
  static imType = IMType.videoMusicSplit;
  static prefixTag = TagVideoMusicSplit;
}
