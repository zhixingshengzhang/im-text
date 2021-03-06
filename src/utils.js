import { nanoid } from 'nanoid';

export const MaterialType = {
  image: 'image',
  audio: 'audio',
  video: 'video',
};
export const arrayHasContent = (array) =>
  Array.isArray(array) && array.length > 0;
export const keyBy = (items, key = 'id', keepItemReference = true) => {
  let result = {};
  if (!Array.isArray(items) || items.length == 0) {
    return result;
  }
  items.forEach((item) => {
    if (!item) {
      return;
    }
    result[item[key]] = keepItemReference ? item : { ...item };
  });
  return result;
};
export const TAG_START = '【';
export const ID_REGEX = /[A-Za-z0-9_-]{21}/;
export const TAG_ID_REGEX = /【ID】[A-Za-z0-9_-]+【ID】/;
export const TAG_ID_REGEX_G = /【ID】[A-Za-z0-9_-]+【ID】/g;
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
export const TagVideoSplit = '【视频素材分割】';
export const TagVideoMusicSplit = '【视频音乐分割】';
export const TagVideoCaiDian = '【视频音乐踩点】';
export const TagVideoSort = '【视频素材排序】';
export const TagTakeVideoTuiLaMerge = '【拍视频-推拉合成】';
export const TagTakeVideoTui = '【拍视频-推】';
export const TagTakeVideoLa = '【拍视频-拉】';
export const TagTakeVideoYao = '【拍视频-摇】';
export const TagTakeVideoYi = '【拍视频-移】';
export const TagTakeVideoShuai = '【拍视频-甩】';
export const TagTakeVideoGen = '【拍视频-跟】';
export const TagTakeVideoSheng = '【拍视频-升】';
export const TagTakeVideoJiang = '【拍视频-降】';

export const TagTakePhotoHuangJin = '【拍照片-黄金分割】';
export const TagTakePhotoSanJiao = '【拍照片-三角】';
export const TagTakePhotoChuiZhi = '【拍照片-垂直】';
export const TagTakePhotoSanFen = '【拍照片-三分】';
export const TagTakePhotoShuiPing = '【拍照片-水平】';
export const TagTakePhotoDuiJiao = '【拍照片-对角】';

export const TagTakeVideoGuding = '【拍视频-固定】';
export const TagVideoAddAudio = '【视频素材-录音】';
export const TagVideoAddMusic = '【视频素材-音乐】';
export const TagChapterSection = '【本周关卡导航】';
export const TagInteractiveVideo = '【交互视频】';
export const TagCatalog = '【目录】';
export const TagStudentTask = '【学员作业】';

export const generateId = (id) => id || nanoid();
export const generateIdTag = (id) => TagID + generateId(id) + TagID;
export const ChoiceStart = '- ';
export const IMType = {
  text: 'text', // 默认
  singleImage: 'singleImage', //单张图片 singleImage和singleVideo本质上是text的特例
  singleVideo: 'singleVideo', // 单个视频
  singleChoice: 'singleChoice',
  multipleChoice: 'multipleChoice',
  fillBlank: 'fillBlank',
  task: 'task',
  steps: 'steps',
  subTitle: 'subTitle',
  videoCut: 'videoCut',
  videoSplit: 'videoSplit',
  videoMusicSplit: 'videoMusicSplit',
  videoCaiDian: 'videoCaiDian',
  videoSort: 'videoSort',
  videoAddAudio: 'videoAddAudio',
  videoAddMusic: 'videoAddMusic',
  takeVideoTLYY: 'takeVideoTLYY',
  takePhoto: 'takePhoto',
  chapterSections: 'chapterSections',
  catalog: 'catalog',
  interactiveVideo: 'interactiveVideo',
  studentTask: 'studentTask',
};
export const Tags = [
  { tag: 'ID', type: 'ID' },
  { tag: '粗', type: 'bold' }, // 加粗
  { tag: '斜', type: 'italic' }, // 斜体
  { tag: '文本样式', type: 'textStyle' },
  { tag: '章节引用', type: 'dotRefer' },
  { tag: '图片', type: MaterialType.image },
  { tag: '音频', type: MaterialType.audio },
  { tag: '视频', type: MaterialType.video },
];
export const convertContentArrayToRawContent = (contentArray) => {
  const tagsMap = keyBy(Tags, 'type');
  return contentArray
    .map(({ content, type, tagProps = [] }) => {
      if (tagsMap[type]) {
        let tagPropsStr = '';
        if (arrayHasContent(tagProps)) {
          tagPropsStr =
            ' ' +
            tagProps.map(({ name, value }) => `${name}=${value}`).join(' ');
        }
        return (
          TAG_START +
          tagsMap[type].tag +
          tagPropsStr +
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
/**
 * 将text按tag拆分成数组
 */
export const parseContent = (content, list = [], TagsConfig = Tags) => {
  if (!content) {
    return list;
  }
  const tagIndexList = TagsConfig.map(({ tag, type }) => ({
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
