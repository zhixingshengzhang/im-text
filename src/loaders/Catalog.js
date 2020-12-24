import BaseItem from './BaseItem';
import {IMType, TagCatalog,} from '../utils';

/**
 * 目录
 * 【目录】
 * 【目录】1
 * 【目录】1-1
 * 【目录】1-1-1
 */
export default class Catalog extends BaseItem {
  static imType = IMType.catalog;
  static prefixTag = TagCatalog;
}
