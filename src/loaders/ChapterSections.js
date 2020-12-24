import BaseItem from './BaseItem';
import {IMType, TagChapterSection,} from '../utils';

/**
 * 本周关卡导航
 * 【本周关卡导航】
 * 【本周关卡导航】全部
 * 【本周关卡导航】下一关
 * 【本周关卡导航】本关
 */
export default class ChapterSections extends BaseItem {
  static imType = IMType.chapterSections;
  static prefixTag = TagChapterSection;
}
