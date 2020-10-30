import {
  arrayHasContent,
  ChoiceStart,
  convertContentArrayToRawContent,
  generateIdTag,
  getIdAndContentArrayFromText,
  RightChoiceTag,
  TAG_ID_REGEX,
  TAG_START,
  TagID,
} from '../utils';
import {nanoid} from 'nanoid';

/**
 * 基础类，
 * - 校验的逻辑是遍历所有item的parse方法，因此parse方法需要考虑效率
 */
export default class BaseItem {
  static imType = '';
  static prefixTag = ''; // 如果有值，代表内容必须以prefixTag开头才能命中

  /**
   *
   * @param text
   * @return null or object, null代表类型不满足
   */
  static parse(rawText, materialsMap, { withRawText } = {}) {
    let node = { materialIds: [] };
    if (withRawText) {
      node.rawText = rawText;
    }
    const textItems = rawText.split('\n').filter((item) => !!item);
    // 先简单过滤
    if (
      this.prefixTag &&
      !textItems.slice(0, 3).some((text) => text.includes(this.prefixTag))
    ) {
      return null;
    }
    // handle id
    if (textItems[0].startsWith(TagID)) {
      const match = textItems[0].match(TAG_ID_REGEX);
      if (match && match.index == 0) {
        textItems[0] = textItems[0].slice(match[0].length);
        node.id = getIdAndContentArrayFromText(match[0], materialsMap).id;
        if (!textItems[0]) {
          textItems.splice(0, 1);
        }
      }
    }
    if (textItems.length == 0) {
      return null;
    }
    node.id = node.id || nanoid();
    let roleIndex = textItems[0].startsWith(TAG_START)
      ? -1
      : textItems[0].indexOf('：');
    if (roleIndex > 10) {
      roleIndex = -1;
    }
    node.role = roleIndex >= 0 ? textItems[0].slice(0, roleIndex) : '';
    if (roleIndex > 0) {
      textItems[0] = textItems[0].slice(roleIndex + 1);
    }
    if (this.prefixTag && !textItems[0].startsWith(this.prefixTag)) {
      return null;
    }
    textItems[0] = textItems[0].slice(this.prefixTag.length);

    const info = this.parseContent(textItems, materialsMap);
    if (!info) {
      return null;
    }
    const { content, materialIds, ...extraProps } = info;
    const {
      contentArray,
      materialIds: contentMaterialIds,
    } = getIdAndContentArrayFromText(content, materialsMap);
    return {
      imType: this.imType,
      ...node,
      ...extraProps,
      contentArray,
      materialIds: [...(materialIds || []), ...contentMaterialIds],
    };
  }

  /**
   *
   * @param dot
   * @return {string} text
   */
  static unParse(dot, options = {}) {
    const { id, role } = dot;
    return (
      (id ? generateIdTag(id) + '\n' : '') +
      (role ? role + '：' : '') +
      (this.prefixTag || '') +
      this.unParseContent(dot, options)
    );
  }

  /**
   * @abstract
   * 根据纯文本给dot填充信息
   * @param text 已经将id和role除去
   * @param  null or {content, materialIds, ...otherProps}
   * null代表类型不满足, content代表主内容，materialIds代表解析其他属性时收集的materialIds
   * @return
   */
  static parseContent(items, materialsMap) {
    return {
      content: items.join('\n'),
      materialIds: [],
    };
  }

  /**
   * @abstract
   * 将每个对话的内容转为纯文本
   * 不包含id和role的逻辑
   * @param dot
   * @param options
   * @return {string}
   */
  static unParseContent(dot, options = {}) {
    const { contentArray } = dot;
    return convertContentArrayToRawContent(contentArray);
  }

  /**
   * 对这种选项类型文字进行解析
   *  - a
   *  text1
   *  - b
   *  text2
   * @param textItems
   * @param materialsMap
   * @param fakeHint 是否为没有hint的选项继承最近的其他选项
   * @return {{materialIds: [string], choices: [{id, contentArray, hintContentArray, right}], textItems: [string]}}
   * @private
   */
  static getChoices(textItems, materialsMap, { fakeHint = false } = {}) {
    const selectIndex = textItems.findIndex((i) => i.startsWith(ChoiceStart));
    if (selectIndex == -1) {
      return {
        choices: [],
        materialIds: [],
        textItems,
      };
    }
    let choices = [];
    textItems.slice(selectIndex).forEach((item) => {
      if (item.startsWith(ChoiceStart)) {
        choices.push({
          content: item.slice(ChoiceStart.length),
          hintList: [],
        });
      } else {
        choices[choices.length - 1].hintList.push(item);
      }
    });
    choices.forEach((item) => {
      if (item.hintList.length > 0) {
        item.hint = item.hintList.join('\n');
      }
      delete item.hintList;
      if (item.content.includes(RightChoiceTag)) {
        item.right = true;
        item.content = item.content.replace(
          new RegExp(RightChoiceTag, 'g'),
          ''
        );
      }
    });
    let materialIds = [];
    choices.forEach((item, i) => {
      const {
        id,
        contentArray,
        materialIds: choiceMaterialIds,
      } = getIdAndContentArrayFromText(item.content, materialsMap);
      materialIds.push(...choiceMaterialIds);
      item.id = id || nanoid();
      item.contentArray = contentArray;
      delete item.content;
      const {
        contentArray: hintContentArray,
        materialIds: hintMaterialIds,
      } = getIdAndContentArrayFromText(item.hint, materialsMap);
      item.hintContentArray = hintContentArray;
      delete item.hint;
      materialIds.push(...hintMaterialIds);
    });
    if (choices.length > 0 && fakeHint) {
      choices.forEach((item, index) => {
        const { hintContentArray, right } = item;
        if (!arrayHasContent(hintContentArray)) {
          const hintArray = [
            ...choices.slice(0, index).reverse(),
            ...choices.slice(index + 1),
          ];
          let closestRight = hintArray.find(
            (item) => arrayHasContent(item.hintContentArray) && item.right
          )?.hintContentArray;
          let closestWrong = hintArray.find(
            (item) => arrayHasContent(item.hintContentArray) && !item.right
          )?.hintContentArray;
          if (right) {
            item.hintContentArray = closestRight || closestWrong || [];
          } else {
            item.hintContentArray = closestWrong || closestRight || [];
          }
          item.hintFake = true;
        }
      });
    }
    return {
      choices,
      materialIds: [...new Set(materialIds)],
      textItems: textItems.slice(0, selectIndex),
    };
  }

  /**
   * @param choices
   * @param showItemId 每个choice是否需要id， 如Steps就不需要
   */
  static parseChoices(choices, { showChoiceId = true } = {}) {
    if (!arrayHasContent(choices)) {
      return '';
    }
    return choices
      .map(
        ({ id, content, contentArray, hintContentArray, hintFake, right }) => {
          return (
            ChoiceStart +
            (contentArray
              ? convertContentArrayToRawContent(contentArray)
              : content) +
            (showChoiceId ? generateIdTag(id) : '') +
            (right ? RightChoiceTag : '') +
            (arrayHasContent(hintContentArray) && !hintFake
              ? '\n' + convertContentArrayToRawContent(hintContentArray)
              : '')
          );
        }
      )
      .join('\n');
  }
}
