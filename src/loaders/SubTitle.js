import BaseItem from './BaseItem';
import {
  arrayHasContent,
  ChoiceStart,
  convertContentArrayToRawContent,
  generateIdTag,
  IMType,
  RightChoiceTag,
  TagSubTitle,
} from '../utils';
import { getIdAndContentArrayFromText } from '../utils';

export default class SubTitle extends BaseItem {
  static imType = IMType.subTitle;
  static prefixTag = TagSubTitle;
}
