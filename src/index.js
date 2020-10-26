import { nanoid } from 'nanoid';

const MaterialType = {
  image: 'image',
  audio: 'audio',
  video: 'video',
};
const arrayHasContent = (array) => Array.isArray(array) && array.length > 0;
const keyBy = (items, key = 'id', keepItemReference = false) => {
  let result = {};
  if (!Array.isArray(items) || items.length == 0) {
    return result;
  }
  items.forEach((item) => {
    result[item[key]] = keepItemReference ? item : { ...item };
  });
  return result;
};
export const TAG_START = '【';
export const TAG_ID_REGEX = /【ID】[A-Za-z0-9_-]+【ID】/;
export const TAG_END = '】';
export const RightChoiceTag = '【正确】';
export const TagSteps = '【步骤】';
export const TagID = '【ID】';
export const TagTask = '【课后练习】';
export const FillBlankPlaceholderPrefix = '提示文字：';
export const TagFillBlank = '【填空题】';
export const TagMultipleChoice = '【多选题】';
export const TagSubTitle = '【小标题】';
export const TagVideoCut = '【视频素材剪辑】';
export const TagVideoSort = '【视频素材排序】';
export const TagTakeVideoTui = '【拍视频-推】';
export const TagTakeVideoLa = '【拍视频-拉】';
export const TagTakeVideoYao = '【拍视频-摇】';
export const TagTakeVideoYi = '【拍视频-移】';
export const TagTakeVideoShuai = '【拍视频-甩】';
export const TagTakeVideoGen = '【拍视频-跟】';
export const TagTakeVideoSheng = '【拍视频-升】';
export const TagTakeVideoJiang = '【拍视频-降】';
export const TagTakeVideoGuding = '【拍视频-固定】';
export const TagVideoAddAudio = '【视频素材-录音】';
export const TagVideoAddMusic = '【视频素材-音乐】';
export const generateIdTag = (id) => TagID + (id || nanoid()) + TagID;
const ChoiceStart = '- ';
export const IMType = {
  singleChoice: 'singleChoice',
  multipleChoice: 'multipleChoice',
  fillBlank: 'fillBlank',
  task: 'task',
  steps: 'steps',
  subTitle: 'subTitle',
  videoCut: 'videoCut',
  videoSort: 'videoSort',
  videoAddAudio: 'videoAddAudio',
  videoAddMusic: 'videoAddMusic',
  takeVideoTLYY: 'takeVideoTLYY',
};
/**
 * 将text按tag拆分成数组
 */
export const parseContent = (content, list = []) => {
  if (!content) {
    return list;
  }
  const tagIndexList = Tags.map(({ tag, type }) => ({
    tag,
    type,
    index: content.indexOf('【' + tag),
  }));
  tagIndexList.sort((a, b) => {
    if (a.index == -1 && b.index != -1) {
      return -1;
    }
    return a.index - b.index;
  });
  for (let i = 0; i < tagIndexList.length; i++) {
    const { index, tag, type } = tagIndexList[i];
    if (index == -1) {
      continue;
    }
    // 】
    const startEndIndex = content.indexOf('】', index + tag.length + 1);
    // 【结尾】
    const nextIndex = content.indexOf('【' + tag + '】', startEndIndex);
    if (startEndIndex >= 0 && nextIndex >= 0) {
      if (index > 0) {
        list.push({
          type: 'normal',
          content: content.slice(0, index),
        });
      }
      const subContent = content.slice(startEndIndex + 1, nextIndex);
      const tagPropsStr = content
        .slice(index + tag.length + 1, startEndIndex)
        .split(' ')
        .filter((item) => !!item)
        .map((item) => {
          const splitIndex = item.indexOf('=');
          return {
            name: splitIndex > 0 ? item.slice(0, splitIndex) : item,
            value: splitIndex > 0 ? item.slice(splitIndex + 1) : true,
          };
        });
      if (subContent) {
        list.push({
          type,
          content: subContent,
          tagProps: tagPropsStr,
        });
      }
      return parseContent(content.slice(nextIndex + tag.length + 2), list);
    }
  }
  return [
    ...list,
    {
      type: 'normal',
      content,
    },
  ];
};
export const getIdAndContentArrayFromText = (text, materialMap = {}) => {
  const list = parseContent(text);
  const contentArray = [];
  const ids = [];
  let materialIds = new Set();
  list.forEach((item) => {
    if (isMaterialType(item.type)) {
      item.material = materialMap[item.content];
      materialIds.add(item.content);
    }
    if (item.type == 'ID') {
      ids.push(item);
    } else {
      contentArray.push(item);
    }
  });
  return {
    id: ids[0]?.content,
    contentArray,
    materialIds: [...materialIds],
  };
};
const TagToIMTypeMap = {
  [TagSubTitle]: IMType.subTitle,
  [TagSteps]: IMType.steps,
  [TagMultipleChoice]: IMType.multipleChoice,
  [TagFillBlank]: IMType.fillBlank,
  [TagTask]: IMType.task,
  [TagVideoCut]: IMType.videoCut,
  [TagVideoSort]: IMType.videoSort,
  [TagVideoAddAudio]: IMType.videoAddAudio,
  [TagVideoAddMusic]: IMType.videoAddMusic,
};
const convertContentArrayToRawContent = (contentArray) => {
  const tagsMap = keyBy(Tags, 'type');
  return contentArray
    .map(({ content, type }) => {
      if (tagsMap[type]) {
        return (
          TAG_START +
          tagsMap[type].tag +
          TAG_END +
          content +
          TAG_START +
          tagsMap[type].tag +
          TAG_END
        );
      }
      return content;
    })
    .join('');
};
const parseFillBlankFromText = (text) => {};
export const getDotFromRawText = (
  text,
  resources,
  { withRawText = false } = {}
) => {
  const resourcesMap = keyBy(resources, 'id');
  const items = text
    .trim()
    .split(/[\n\n]{2,}/)
    .filter((item) => !!item);
  const result = [];
  // let lastRole = '';
  items.forEach((item) => {
    let node = withRawText ? { rawText: item } : {};
    const textItems = item.split('\n').filter((item) => !!item);
    // handle id
    if (textItems[0].startsWith(TagID)) {
      const match = textItems[0].match(TAG_ID_REGEX);
      if (match && match.index == 0) {
        textItems[0] = textItems[0].slice(match[0].length);
        node.id = getIdAndContentArrayFromText(match[0], resourcesMap).id;
        if (!textItems[0]) {
          textItems.splice(0, 1);
        }
      }
    }
    if (textItems.length == 0) {
      return;
    }
    let roleIndex = textItems[0].startsWith(TAG_START)
      ? -1
      : textItems[0].indexOf('：');
    if (roleIndex > 10) {
      roleIndex = -1;
    }
    node.role = roleIndex >= 0 ? textItems[0].slice(0, roleIndex) : '';
    // lastRole = node.role;

    const selectIndex = textItems.findIndex((i) => i.startsWith(ChoiceStart));
    node.content = textItems
      .slice(0, selectIndex >= 0 ? selectIndex : textItems.length + 1)
      .join('\n')
      .slice(roleIndex >= 0 ? roleIndex + 1 : 0);
    const specialTag = Object.keys(TagToIMTypeMap).find((item) =>
      node.content.startsWith(item)
    );
    if (specialTag) {
      node.imType = TagToIMTypeMap[specialTag];
      node.content = node.content.slice(specialTag.length);
    } else if (
      [
        TagTakeVideoTui,
        TagTakeVideoLa,
        TagTakeVideoYao,
        TagTakeVideoYi,
        TagTakeVideoShuai,
        TagTakeVideoGen,
        TagTakeVideoSheng,
        TagTakeVideoJiang,
        TagTakeVideoGuding,
      ].some((item) => node.content.startsWith(item))
    ) {
      node.imType = IMType.takeVideoTLYY;
    }
    if (node.imType == IMType.fillBlank) {
      let contentList = node.content.split('\n').filter((item) => !!item);
      if (
        contentList.length > 1 &&
        contentList[contentList.length - 1].startsWith(
          FillBlankPlaceholderPrefix
        )
      ) {
        node.placeholder = contentList[contentList.length - 1].slice(
          FillBlankPlaceholderPrefix.length
        );
        node.content = contentList.slice(0, -1).join('\n');
      }
    }
    if (selectIndex >= 0) {
      let choices = [];
      textItems.slice(selectIndex).forEach((item) => {
        if (/^[0-9]\./.test(item)) {
          choices.push({
            content: item.slice(item.indexOf('.') + 1),
            hintList: [],
          });
        } else if (item.startsWith(ChoiceStart)) {
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

      if (choices.length > 0) {
        if (!node.imType) {
          node.imType = IMType.singleChoice;
          // 错误解释可以继承
          choices.forEach((item, index) => {
            const { hint, right } = item;
            if (!hint) {
              const hintArray = [
                ...choices.slice(0, index).reverse(),
                ...choices.slice(index + 1),
              ];
              let closestRight = hintArray.find(
                (item) => item.hint && item.right
              )?.hint;
              let closestWrong = hintArray.find(
                (item) => item.hint && !item.right
              )?.hint;
              if (right) {
                item.hint = closestRight || closestWrong;
              } else {
                item.hint = closestWrong || closestRight;
              }
              item.hintFake = true;
            }
          });
        }
        node.choices = choices;
      }
    }
    result.push(node);
  });
  result.forEach((item, index) => {
    const itemMaterialIds = [];
    const { id, contentArray, materialIds } = getIdAndContentArrayFromText(
      item.content,
      resourcesMap
    );
    // 为之前的内容里带id兼容，后续改成 item.id = item.id || nanoid()
    if (id) {
      item.id = id;
      item.content = item.content.replace(TagID + id + TagID, '');
    } else {
      item.id = item.id || nanoid();
    }
    item.contentArray = contentArray;
    itemMaterialIds.push(...materialIds);
    if (item.choices) {
      item.choices.forEach((item, i) => {
        const {
          id,
          contentArray,
          materialIds: choiceMaterialIds,
        } = getIdAndContentArrayFromText(item.content, resourcesMap);
        itemMaterialIds.push(...choiceMaterialIds);
        item.id = id || nanoid();
        item.contentArray = contentArray;
        const {
          contentArray: hintContentArray,
          materialIds: hintMaterialIds,
        } = getIdAndContentArrayFromText(item.hint, resourcesMap);
        item.hintContentArray = hintContentArray;
        itemMaterialIds.push(...hintMaterialIds);
      });
    }
    item.contentArray.forEach((subItem) => {
      if (isMaterialType(subItem.type)) {
        subItem.material = resourcesMap[subItem.content];
      }
    });
    item.materialIds = [...new Set(materialIds)];
  });
  return {
    content: 'test',
    edges: result,
  };
};

export const getMaterialIdsFromContent = (text) => {
  const dot = getDotFromRawText(text, {});
  const ids = new Set();
  const getIds = (contentArray) => {
    if (arrayHasContent(contentArray)) {
      contentArray.forEach((item) => {
        if (isMaterialType(item.type) && item.content) {
          ids.add(item.content);
        }
      });
    }
  };
  dot.edges.forEach((item) => {
    getIds(item.contentArray);
    if (arrayHasContent(item.choices)) {
      item.choices.forEach((item) => {
        getIds(item.contentArray);
        getIds(item.hintContentArray);
      });
    }
  });
  return [...ids];
};
export const convertDotToRawText = (dot) => {
  return dot.edges
    .map(({ id, role, content, choices, imType, placeholder }) => {
      let text = content;
      const specialTag = Object.keys(TagToIMTypeMap).find(
        (item) => TagToIMTypeMap[item] == imType
      );
      if (specialTag) {
        text = specialTag + text;
      }

      if (
        [IMType.singleChoice, IMType.multipleChoice, IMType.steps].some(
          (item) => item == imType
        ) &&
        arrayHasContent(choices)
      ) {
        text +=
          '\n' +
          choices
            .map(({ id, content, contentArray, hint, hintFake, right }) => {
              return (
                ChoiceStart +
                (contentArray
                  ? convertContentArrayToRawContent(contentArray)
                  : content) +
                ([IMType.singleChoice, IMType.multipleChoice].some(
                  (item) => item == imType
                )
                  ? generateIdTag(id)
                  : '') +
                (right ? RightChoiceTag : '') +
                (hint && !hintFake ? '\n' + hint : '')
              );
            })
            .join('\n');
      }
      if (imType == IMType.fillBlank && placeholder) {
        text += '\n' + FillBlankPlaceholderPrefix + placeholder;
      }
      return (
        (id ? generateIdTag(id) + '\n' : '') + (role ? role + '：' : '') + text
      );
    })
    .join('\n\n');
};
export const Tags = [
  { tag: 'ID', type: 'ID' },
  { tag: '粗', type: 'bold' }, // 加粗
  { tag: '斜', type: 'italic' }, // 斜体
  { tag: '文本样式', type: 'textStyle' },
  { tag: '图片', type: MaterialType.image },
  { tag: '音频', type: MaterialType.audio },
  { tag: '视频', type: MaterialType.video },
];
export const isMaterialType = (type) =>
  [MaterialType.image, MaterialType.audio, MaterialType.video].some(
    (item) => item == type
  );
export const TagUserName = '【用户名】';
const TagUserNameRegex = /【用户名】/g;
export const TagNewLine = '【换行】';
const TagNewLineRegex = /【换行】/g;
export const formatContent = (content, { getUserName } = {}) => {
  const userName = (getUserName ? getUserName() : '') || '用户';
  return (content || '')
    .replace(TagUserNameRegex, userName)
    .replace(TagNewLineRegex, '\n');
};
