import BaseItem from './BaseItem';
import { IMType, TagVideoAddAudio } from '../utils';

export default class VideoAddAudio extends BaseItem {
  static imType = IMType.videoAddAudio;
  static prefixTag = TagVideoAddAudio;
}
