import BaseItem from './BaseItem';
import {IMType, TagVideoCaiDian} from '../utils';

export default class VideoCaiDian extends BaseItem {
  static imType = IMType.videoCaiDian;
  static prefixTag = TagVideoCaiDian;
}
