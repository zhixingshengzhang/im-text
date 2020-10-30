import BaseItem from './BaseItem';
import {
  arrayHasContent,
  ChoiceStart,
  convertContentArrayToRawContent,
  generateIdTag,
  IMType,
  RightChoiceTag,
} from '../utils';
import { getIdAndContentArrayFromText } from '../utils';

export default class SingleChoice extends BaseItem {
  static imType = IMType.text;
}
