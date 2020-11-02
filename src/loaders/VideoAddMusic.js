import BaseItem from './BaseItem';
import { IMType, TagVideoAddMusic } from '../utils';

export default class VideoAddMusic extends BaseItem {
  static imType = IMType.videoAddMusic;
  static prefixTag = TagVideoAddMusic;
}
