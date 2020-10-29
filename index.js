"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatContent = exports.TagNewLine = exports.TagUserName = exports.isMaterialType = exports.Tags = exports.convertDotToRawText = exports.getMaterialIdsFromContent = exports.getDotFromRawText = exports.getIdAndContentArrayFromText = exports.parseContent = exports.IMType = exports.generateIdTag = exports.TagVideoAddMusic = exports.TagVideoAddAudio = exports.TagTakeVideoGuding = exports.TagTakeVideoJiang = exports.TagTakeVideoSheng = exports.TagTakeVideoGen = exports.TagTakeVideoShuai = exports.TagTakeVideoYi = exports.TagTakeVideoYao = exports.TagTakeVideoLa = exports.TagTakeVideoTui = exports.TagVideoSort = exports.TagVideoCut = exports.TagSubTitle = exports.TagMultipleChoice = exports.TagFillBlank = exports.FillBlankPlaceholderPrefix = exports.TagTask = exports.TagID = exports.TagSteps = exports.RightChoiceTag = exports.TAG_END = exports.TAG_ID_REGEX = exports.TAG_START = void 0;

var _nanoid = require("nanoid");

var _TagToIMTypeMap;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MaterialType = {
  image: 'image',
  audio: 'audio',
  video: 'video'
};

var arrayHasContent = function arrayHasContent(array) {
  return Array.isArray(array) && array.length > 0;
};

var keyBy = function keyBy(items) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
  var keepItemReference = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var result = {};

  if (!Array.isArray(items) || items.length == 0) {
    return result;
  }

  items.forEach(function (item) {
    result[item[key]] = keepItemReference ? item : _objectSpread({}, item);
  });
  return result;
};

var TAG_START = '【';
exports.TAG_START = TAG_START;
var TAG_ID_REGEX = /【ID】[A-Za-z0-9_-]+【ID】/;
exports.TAG_ID_REGEX = TAG_ID_REGEX;
var TAG_END = '】';
exports.TAG_END = TAG_END;
var RightChoiceTag = '【正确】';
exports.RightChoiceTag = RightChoiceTag;
var TagSteps = '【步骤】';
exports.TagSteps = TagSteps;
var TagID = '【ID】';
exports.TagID = TagID;
var TagTask = '【课后练习】';
exports.TagTask = TagTask;
var FillBlankPlaceholderPrefix = '提示文字：';
exports.FillBlankPlaceholderPrefix = FillBlankPlaceholderPrefix;
var TagFillBlank = '【填空题】';
exports.TagFillBlank = TagFillBlank;
var TagMultipleChoice = '【多选题】';
exports.TagMultipleChoice = TagMultipleChoice;
var TagSubTitle = '【小标题】';
exports.TagSubTitle = TagSubTitle;
var TagVideoCut = '【视频素材剪辑】';
exports.TagVideoCut = TagVideoCut;
var TagVideoSort = '【视频素材排序】';
exports.TagVideoSort = TagVideoSort;
var TagTakeVideoTui = '【拍视频-推】';
exports.TagTakeVideoTui = TagTakeVideoTui;
var TagTakeVideoLa = '【拍视频-拉】';
exports.TagTakeVideoLa = TagTakeVideoLa;
var TagTakeVideoYao = '【拍视频-摇】';
exports.TagTakeVideoYao = TagTakeVideoYao;
var TagTakeVideoYi = '【拍视频-移】';
exports.TagTakeVideoYi = TagTakeVideoYi;
var TagTakeVideoShuai = '【拍视频-甩】';
exports.TagTakeVideoShuai = TagTakeVideoShuai;
var TagTakeVideoGen = '【拍视频-跟】';
exports.TagTakeVideoGen = TagTakeVideoGen;
var TagTakeVideoSheng = '【拍视频-升】';
exports.TagTakeVideoSheng = TagTakeVideoSheng;
var TagTakeVideoJiang = '【拍视频-降】';
exports.TagTakeVideoJiang = TagTakeVideoJiang;
var TagTakeVideoGuding = '【拍视频-固定】';
exports.TagTakeVideoGuding = TagTakeVideoGuding;
var TagVideoAddAudio = '【视频素材-录音】';
exports.TagVideoAddAudio = TagVideoAddAudio;
var TagVideoAddMusic = '【视频素材-音乐】';
exports.TagVideoAddMusic = TagVideoAddMusic;

var generateIdTag = function generateIdTag(id) {
  return TagID + (id || (0, _nanoid.nanoid)()) + TagID;
};

exports.generateIdTag = generateIdTag;
var ChoiceStart = '- ';
var IMType = {
  text: 'text',
  // 默认
  singleImage: 'singleImage',
  //单张图片
  singleVideo: 'singleVideo',
  // 单个视频
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
  takeVideoTLYY: 'takeVideoTLYY'
};
/**
 * 将text按tag拆分成数组
 */

exports.IMType = IMType;

var parseContent = function parseContent(content) {
  var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!content) {
    return list;
  }

  var tagIndexList = Tags.map(function (_ref) {
    var tag = _ref.tag,
        type = _ref.type;
    return {
      tag: tag,
      type: type,
      index: content.indexOf('【' + tag)
    };
  });
  tagIndexList.sort(function (a, b) {
    if (a.index == -1 && b.index != -1) {
      return -1;
    }

    return a.index - b.index;
  });

  for (var i = 0; i < tagIndexList.length; i++) {
    var _tagIndexList$i = tagIndexList[i],
        index = _tagIndexList$i.index,
        tag = _tagIndexList$i.tag,
        type = _tagIndexList$i.type;

    if (index == -1) {
      continue;
    } // 】


    var startEndIndex = content.indexOf('】', index + tag.length + 1); // 【结尾】

    var nextIndex = content.indexOf('【' + tag + '】', startEndIndex);

    if (startEndIndex >= 0 && nextIndex >= 0) {
      if (index > 0) {
        list.push({
          type: 'normal',
          content: content.slice(0, index)
        });
      }

      var subContent = content.slice(startEndIndex + 1, nextIndex);
      var tagPropsStr = content.slice(index + tag.length + 1, startEndIndex).split(' ').filter(function (item) {
        return !!item;
      }).map(function (item) {
        var splitIndex = item.indexOf('=');
        return {
          name: splitIndex > 0 ? item.slice(0, splitIndex) : item,
          value: splitIndex > 0 ? item.slice(splitIndex + 1) : true
        };
      });

      if (subContent) {
        list.push({
          type: type,
          content: subContent,
          tagProps: tagPropsStr
        });
      }

      return parseContent(content.slice(nextIndex + tag.length + 2), list);
    }
  }

  return [].concat(_toConsumableArray(list), [{
    type: 'normal',
    content: content
  }]);
};

exports.parseContent = parseContent;

var getIdAndContentArrayFromText = function getIdAndContentArrayFromText(text) {
  var _ids$;

  var materialMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var list = parseContent(text);
  var contentArray = [];
  var ids = [];
  var materialIds = new Set();
  list.forEach(function (item) {
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
    id: (_ids$ = ids[0]) === null || _ids$ === void 0 ? void 0 : _ids$.content,
    contentArray: contentArray,
    materialIds: _toConsumableArray(materialIds)
  };
};

exports.getIdAndContentArrayFromText = getIdAndContentArrayFromText;
var TagToIMTypeMap = (_TagToIMTypeMap = {}, _defineProperty(_TagToIMTypeMap, TagSubTitle, IMType.subTitle), _defineProperty(_TagToIMTypeMap, TagSteps, IMType.steps), _defineProperty(_TagToIMTypeMap, TagMultipleChoice, IMType.multipleChoice), _defineProperty(_TagToIMTypeMap, TagFillBlank, IMType.fillBlank), _defineProperty(_TagToIMTypeMap, TagTask, IMType.task), _defineProperty(_TagToIMTypeMap, TagVideoCut, IMType.videoCut), _defineProperty(_TagToIMTypeMap, TagVideoSort, IMType.videoSort), _defineProperty(_TagToIMTypeMap, TagVideoAddAudio, IMType.videoAddAudio), _defineProperty(_TagToIMTypeMap, TagVideoAddMusic, IMType.videoAddMusic), _TagToIMTypeMap);

var convertContentArrayToRawContent = function convertContentArrayToRawContent(contentArray) {
  var tagsMap = keyBy(Tags, 'type');
  return contentArray.map(function (_ref2) {
    var content = _ref2.content,
        type = _ref2.type;

    if (tagsMap[type]) {
      return TAG_START + tagsMap[type].tag + TAG_END + content + TAG_START + tagsMap[type].tag + TAG_END;
    }

    return content;
  }).join('');
};
/**
 *
 * @param text 对话体纯文本
 * @param resources 素材列表
 * @param withRawText 每个item是否返回rawText
 */


var getDotFromRawText = function getDotFromRawText(text, resources) {
  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref3$withRawText = _ref3.withRawText,
      withRawText = _ref3$withRawText === void 0 ? false : _ref3$withRawText;

  var resourcesMap = keyBy(resources, 'id');
  var items = text.trim().split(/[\n\n]{2,}/).filter(function (item) {
    return !!item;
  });
  var result = []; // let lastRole = '';

  items.forEach(function (item) {
    var node = withRawText ? {
      rawText: item
    } : {};
    var textItems = item.split('\n').filter(function (item) {
      return !!item;
    }); // handle id

    if (textItems[0].startsWith(TagID)) {
      var match = textItems[0].match(TAG_ID_REGEX);

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

    var roleIndex = textItems[0].startsWith(TAG_START) ? -1 : textItems[0].indexOf('：');

    if (roleIndex > 10) {
      roleIndex = -1;
    }

    node.role = roleIndex >= 0 ? textItems[0].slice(0, roleIndex) : ''; // lastRole = node.role;

    var selectIndex = textItems.findIndex(function (i) {
      return i.startsWith(ChoiceStart);
    });
    node.content = textItems.slice(0, selectIndex >= 0 ? selectIndex : textItems.length + 1).join('\n').slice(roleIndex >= 0 ? roleIndex + 1 : 0);
    var specialTag = Object.keys(TagToIMTypeMap).find(function (item) {
      return node.content.startsWith(item);
    });

    if (specialTag) {
      node.imType = TagToIMTypeMap[specialTag];
      node.content = node.content.slice(specialTag.length);
    } else if ([TagTakeVideoTui, TagTakeVideoLa, TagTakeVideoYao, TagTakeVideoYi, TagTakeVideoShuai, TagTakeVideoGen, TagTakeVideoSheng, TagTakeVideoJiang, TagTakeVideoGuding].some(function (item) {
      return node.content.startsWith(item);
    })) {
      node.imType = IMType.takeVideoTLYY;
    }

    if (node.imType == IMType.fillBlank) {
      var contentList = node.content.split('\n').filter(function (item) {
        return !!item;
      });

      if (contentList.length > 1 && contentList[contentList.length - 1].startsWith(FillBlankPlaceholderPrefix)) {
        node.placeholder = contentList[contentList.length - 1].slice(FillBlankPlaceholderPrefix.length);
        node.content = contentList.slice(0, -1).join('\n');
      }
    }

    if (selectIndex >= 0) {
      var choices = [];
      textItems.slice(selectIndex).forEach(function (item) {
        if (/^[0-9]\./.test(item)) {
          choices.push({
            content: item.slice(item.indexOf('.') + 1),
            hintList: []
          });
        } else if (item.startsWith(ChoiceStart)) {
          choices.push({
            content: item.slice(ChoiceStart.length),
            hintList: []
          });
        } else {
          choices[choices.length - 1].hintList.push(item);
        }
      });
      choices.forEach(function (item) {
        if (item.hintList.length > 0) {
          item.hint = item.hintList.join('\n');
        }

        delete item.hintList;

        if (item.content.includes(RightChoiceTag)) {
          item.right = true;
          item.content = item.content.replace(new RegExp(RightChoiceTag, 'g'), '');
        }
      });

      if (choices.length > 0) {
        if (!node.imType) {
          node.imType = IMType.singleChoice; // 错误解释可以继承

          choices.forEach(function (item, index) {
            var hint = item.hint,
                right = item.right;

            if (!hint) {
              var _hintArray$find, _hintArray$find2;

              var hintArray = [].concat(_toConsumableArray(choices.slice(0, index).reverse()), _toConsumableArray(choices.slice(index + 1)));
              var closestRight = (_hintArray$find = hintArray.find(function (item) {
                return item.hint && item.right;
              })) === null || _hintArray$find === void 0 ? void 0 : _hintArray$find.hint;
              var closestWrong = (_hintArray$find2 = hintArray.find(function (item) {
                return item.hint && !item.right;
              })) === null || _hintArray$find2 === void 0 ? void 0 : _hintArray$find2.hint;

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
  result.forEach(function (item, index) {
    var itemMaterialIds = [];

    var _getIdAndContentArray = getIdAndContentArrayFromText(item.content, resourcesMap),
        id = _getIdAndContentArray.id,
        contentArray = _getIdAndContentArray.contentArray,
        materialIds = _getIdAndContentArray.materialIds; // 为之前的内容里带id兼容，后续改成 item.id = item.id || nanoid()


    if (id) {
      item.id = id;
      item.content = item.content.replace(TagID + id + TagID, '');
    } else {
      item.id = item.id || (0, _nanoid.nanoid)();
    }

    item.contentArray = contentArray;
    itemMaterialIds.push.apply(itemMaterialIds, _toConsumableArray(materialIds));

    if (item.choices) {
      item.choices.forEach(function (item, i) {
        var _getIdAndContentArray2 = getIdAndContentArrayFromText(item.content, resourcesMap),
            id = _getIdAndContentArray2.id,
            contentArray = _getIdAndContentArray2.contentArray,
            choiceMaterialIds = _getIdAndContentArray2.materialIds;

        itemMaterialIds.push.apply(itemMaterialIds, _toConsumableArray(choiceMaterialIds));
        item.id = id || (0, _nanoid.nanoid)();
        item.contentArray = contentArray;

        var _getIdAndContentArray3 = getIdAndContentArrayFromText(item.hint, resourcesMap),
            hintContentArray = _getIdAndContentArray3.contentArray,
            hintMaterialIds = _getIdAndContentArray3.materialIds;

        item.hintContentArray = hintContentArray;
        itemMaterialIds.push.apply(itemMaterialIds, _toConsumableArray(hintMaterialIds));
      });
    }

    item.contentArray.forEach(function (subItem) {
      if (isMaterialType(subItem.type)) {
        subItem.material = resourcesMap[subItem.content];
      }
    });
    item.materialIds = _toConsumableArray(new Set(materialIds));

    if (!item.imType) {
      item.imType = IMType.text;

      if (arrayHasContent(item.contentArray) && item.contentArray.length == 1) {
        if (item.contentArray[0].type == MaterialType.image) {
          item.imType = IMType.singleImage;
        } else if (item.contentArray[0].type == MaterialType.video) {
          item.imType = IMType.singleVideo;
        }
      }
    }
  });
  return {
    content: 'test',
    edges: result
  };
};

exports.getDotFromRawText = getDotFromRawText;

var getMaterialIdsFromContent = function getMaterialIdsFromContent(text) {
  var dot = getDotFromRawText(text, {});
  var ids = new Set();

  var getIds = function getIds(contentArray) {
    if (arrayHasContent(contentArray)) {
      contentArray.forEach(function (item) {
        if (isMaterialType(item.type) && item.content) {
          ids.add(item.content);
        }
      });
    }
  };

  dot.edges.forEach(function (item) {
    getIds(item.contentArray);

    if (arrayHasContent(item.choices)) {
      item.choices.forEach(function (item) {
        getIds(item.contentArray);
        getIds(item.hintContentArray);
      });
    }
  });
  return _toConsumableArray(ids);
};

exports.getMaterialIdsFromContent = getMaterialIdsFromContent;

var convertDotToRawText = function convertDotToRawText(dot) {
  return dot.edges.map(function (_ref4) {
    var id = _ref4.id,
        role = _ref4.role,
        content = _ref4.content,
        choices = _ref4.choices,
        imType = _ref4.imType,
        placeholder = _ref4.placeholder;
    var text = content;
    var specialTag = Object.keys(TagToIMTypeMap).find(function (item) {
      return TagToIMTypeMap[item] == imType;
    });

    if (specialTag) {
      text = specialTag + text;
    }

    if ([IMType.singleChoice, IMType.multipleChoice, IMType.steps].some(function (item) {
      return item == imType;
    }) && arrayHasContent(choices)) {
      text += '\n' + choices.map(function (_ref5) {
        var id = _ref5.id,
            content = _ref5.content,
            contentArray = _ref5.contentArray,
            hint = _ref5.hint,
            hintFake = _ref5.hintFake,
            right = _ref5.right;
        return ChoiceStart + (contentArray ? convertContentArrayToRawContent(contentArray) : content) + ([IMType.singleChoice, IMType.multipleChoice].some(function (item) {
          return item == imType;
        }) ? generateIdTag(id) : '') + (right ? RightChoiceTag : '') + (hint && !hintFake ? '\n' + hint : '');
      }).join('\n');
    }

    if (imType == IMType.fillBlank && placeholder) {
      text += '\n' + FillBlankPlaceholderPrefix + placeholder;
    }

    return (id ? generateIdTag(id) + '\n' : '') + (role ? role + '：' : '') + text;
  }).join('\n\n');
};

exports.convertDotToRawText = convertDotToRawText;
var Tags = [{
  tag: 'ID',
  type: 'ID'
}, {
  tag: '粗',
  type: 'bold'
}, // 加粗
{
  tag: '斜',
  type: 'italic'
}, // 斜体
{
  tag: '文本样式',
  type: 'textStyle'
}, {
  tag: '图片',
  type: MaterialType.image
}, {
  tag: '音频',
  type: MaterialType.audio
}, {
  tag: '视频',
  type: MaterialType.video
}];
exports.Tags = Tags;

var isMaterialType = function isMaterialType(type) {
  return [MaterialType.image, MaterialType.audio, MaterialType.video].some(function (item) {
    return item == type;
  });
};

exports.isMaterialType = isMaterialType;
var TagUserName = '【用户名】';
exports.TagUserName = TagUserName;
var TagUserNameRegex = /【用户名】/g;
var TagNewLine = '【换行】';
exports.TagNewLine = TagNewLine;
var TagNewLineRegex = /【换行】/g;

var formatContent = function formatContent(content) {
  var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      getUserName = _ref6.getUserName;

  var userName = (getUserName ? getUserName() : '') || '用户';
  return (content || '').replace(TagUserNameRegex, userName).replace(TagNewLineRegex, '\n');
};

exports.formatContent = formatContent;