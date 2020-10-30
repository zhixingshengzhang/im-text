import BaseItem from './BaseItem';
import { IMType, TagVideoCut } from '../utils';

export default class VideoCut extends BaseItem {
  static imType = IMType.videoCut;
  static prefixTag = TagVideoCut;
}
