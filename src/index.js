import FillBlank from './loaders/FillBlank';
import SingleChoice from './loaders/SingleChoice';
import MultipleChoice from './loaders/MultipleChoice';
import Steps from './loaders/Steps';
import SubTitle from './loaders/SubTitle';
import TakeVideoTLYY from './loaders/TakeVideoTLYY';
import VideoSort from './loaders/VideoSort';
import VideoCut from './loaders/VideoCut';
import LoaderText from './loaders/Text';
import ChapterSections from './loaders/ChapterSections';
import Catalog from './loaders/Catalog';
import {
  arrayHasContent,
  IMType,
  isMaterialType,
  keyBy,
  MaterialType,
} from './utils';
import VideoAddMusic from './loaders/VideoAddMusic';
import VideoAddAudio from './loaders/VideoAddAudio';

const Loaders = [
  MultipleChoice,
  FillBlank,
  Steps,
  SubTitle,
  TakeVideoTLYY,
  VideoCut,
  VideoSort,
  VideoAddMusic,
  VideoAddAudio,
  ChapterSections,
  Catalog,
  // 目前单选题没有特殊标记，因此排序在最后
  SingleChoice,
  LoaderText,
];
export const convertDotToRawText = (dot) => {
  const loadersMap = keyBy(Loaders, 'imType');
  return dot.edges
    .map((item) => {
      return (loadersMap[item.imType] || LoaderText).unParse(item);
    })
    .join('\n\n');
};

/**
 *
 * @param text 对话体纯文本
 * @param materials 素材列表
 * @param withRawText 每个item是否返回rawText
 */
export const getDotFromRawText = (
  text,
  materials,
  { withRawText = false } = {}
) => {
  const materialsMap = keyBy(materials, 'id');
  const textItems = text
    .trim()
    .split(/[\n\n]{2,}/)
    .filter((item) => !!item);
  let nodes = [];
  textItems.forEach((textItem) => {
    for (let i = 0; i < Loaders.length; i++) {
      let dot = Loaders[i].parse(textItem, materialsMap, {
        withRawText,
      });
      if (dot) {
        nodes.push(dot);
        // 处理text的两个特殊形态：singleImage和singleVideo
        if (
          (!dot.imType || dot.imType == IMType.text) &&
          arrayHasContent(dot.contentArray) &&
          dot.contentArray.length == 1
        ) {
          if (dot.contentArray[0].type == MaterialType.image) {
            dot.imType = IMType.singleImage;
          } else if (dot.contentArray[0].type == MaterialType.video) {
            dot.imType = IMType.singleVideo;
          }
        }
        return;
      }
    }
  });
  return {
    content: 'test',
    edges: nodes,
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

export * from './utils';
