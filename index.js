'use strict';Object.defineProperty(exports,'__esModule',{value:true});var crypto=require('crypto');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var crypto__default=/*#__PURE__*/_interopDefaultLegacy(crypto);function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _objectDestructuringEmpty(obj) {
  if (obj == null) throw new TypeError("Cannot destructure undefined");
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}// This alphabet uses `A-Za-z0-9_-` symbols. The genetic algorithm helped
// optimize the gzip compression for this alphabet.
let urlAlphabet = 'ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW';// for better performance.

let buffers = {};

let random = bytes => {
  let buffer = buffers[bytes];

  if (!buffer) {
    // `Buffer.allocUnsafe()` is faster because it doesn’t flush the memory.
    // Memory flushing is unnecessary since the buffer allocation itself resets
    // the memory with the new bytes.
    buffer = Buffer.allocUnsafe(bytes);
    if (bytes <= 255) buffers[bytes] = buffer;
  }

  return crypto__default['default'].randomFillSync(buffer);
};

let nanoid = (size = 21) => {
  let bytes = random(size);
  let id = ''; // A compact alternative for `for (var i = 0; i < step; i++)`.

  while (size--) {
    // It is incorrect to use bytes exceeding the alphabet size.
    // The following mask reduces the random byte in the 0-255 value
    // range to the 0-63 value range. Therefore, adding hacks, such
    // as empty string fallback or magic numbers, is unneccessary because
    // the bitmask trims bytes down to the alphabet size.
    id += urlAlphabet[bytes[size] & 63];
  }

  return id;
};var MaterialType = {
  image: 'image',
  audio: 'audio',
  video: 'video'
};
var arrayHasContent = function arrayHasContent(array) {
  return Array.isArray(array) && array.length > 0;
};
var keyBy = function keyBy(items) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
  var keepItemReference = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var result = {};

  if (!Array.isArray(items) || items.length == 0) {
    return result;
  }

  items.forEach(function (item) {
    if (!item) {
      return;
    }

    result[item[key]] = keepItemReference ? item : _objectSpread2({}, item);
  });
  return result;
};
var TAG_START = '【';
var TAG_ID_REGEX = /【ID】[A-Za-z0-9_-]+【ID】/;
var TAG_ID_REGEX_G = /【ID】[A-Za-z0-9_-]+【ID】/g;
var TAG_END = '】';
var RightChoiceTag = '【正确】';
var TagSteps = '【步骤】';
var TagID = '【ID】';
var TagTask = '【课后练习】';
var FillBlankPlaceholderPrefix = '提示文字：';
var TagFillBlank = '【填空题】';
var TagMultipleChoice = '【多选题】';
var TagSubTitle = '【小标题】';
var TagVideoCut = '【视频素材剪辑】';
var TagVideoSplit = '【视频素材分割】';
var TagVideoMusicSplit = '【视频音乐分割】';
var TagVideoCaiDian = '【视频音乐踩点】';
var TagVideoSort = '【视频素材排序】';
var TagTakeVideoTuiLaMerge = '【拍视频-推拉合成】';
var TagTakeVideoTui = '【拍视频-推】';
var TagTakeVideoLa = '【拍视频-拉】';
var TagTakeVideoYao = '【拍视频-摇】';
var TagTakeVideoYi = '【拍视频-移】';
var TagTakeVideoShuai = '【拍视频-甩】';
var TagTakeVideoGen = '【拍视频-跟】';
var TagTakeVideoSheng = '【拍视频-升】';
var TagTakeVideoJiang = '【拍视频-降】';
var TagTakePhotoHuangJin = '【拍照片-黄金分割】';
var TagTakePhotoSanJiao = '【拍照片-三角】';
var TagTakePhotoChuiZhi = '【拍照片-垂直】';
var TagTakePhotoSanFen = '【拍照片-三分】';
var TagTakePhotoShuiPing = '【拍照片-水平】';
var TagTakePhotoDuiJiao = '【拍照片-对角】';
var TagTakeVideoGuding = '【拍视频-固定】';
var TagVideoAddAudio = '【视频素材-录音】';
var TagVideoAddMusic = '【视频素材-音乐】';
var TagChapterSection = '【本周关卡导航】';
var TagCatalog = '【目录】';
var generateIdTag = function generateIdTag(id) {
  return TagID + (id || nanoid()) + TagID;
};
var ChoiceStart = '- ';
var IMType = {
  text: 'text',
  // 默认
  singleImage: 'singleImage',
  //单张图片 singleImage和singleVideo本质上是text的特例
  singleVideo: 'singleVideo',
  // 单个视频
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
  catalog: 'catalog'
};
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
var convertContentArrayToRawContent = function convertContentArrayToRawContent(contentArray) {
  var tagsMap = keyBy(Tags, 'type');
  return contentArray.map(function (_ref) {
    var content = _ref.content,
        type = _ref.type;

    if (tagsMap[type]) {
      return TAG_START + tagsMap[type].tag + TAG_END + content + TAG_START + tagsMap[type].tag + TAG_END;
    }

    return content;
  }).join('');
};
/**
 * 将text按tag拆分成数组
 */

var parseContent = function parseContent(content) {
  var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var TagsConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Tags;

  if (!content) {
    return list;
  }

  var tagIndexList = TagsConfig.map(function (_ref2) {
    var tag = _ref2.tag,
        type = _ref2.type;
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
var isMaterialType = function isMaterialType(type) {
  return [MaterialType.image, MaterialType.audio, MaterialType.video].some(function (item) {
    return item == type;
  });
};
var TagUserName = '【用户名】';
var TagUserNameRegex = /【用户名】/g;
var TagNewLine = '【换行】';
var TagNewLineRegex = /【换行】/g;
var formatContent = function formatContent(content) {
  var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      getUserName = _ref3.getUserName;

  var userName = (getUserName ? getUserName() : '') || '用户';
  return (content || '').replace(TagUserNameRegex, userName).replace(TagNewLineRegex, '\n');
};/**
 * 基础类，
 * - 校验的逻辑是遍历所有item的parse方法，因此parse方法需要考虑效率
 */

var BaseItem = /*#__PURE__*/function () {
  function BaseItem() {
    _classCallCheck(this, BaseItem);
  }

  _createClass(BaseItem, null, [{
    key: "parse",
    // 如果有值，代表内容必须以prefixTag开头才能命中

    /**
     *
     * @param text
     * @return null or object, null代表类型不满足
     */
    value: function parse(rawText, materialsMap) {
      var _this = this;

      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          withRawText = _ref.withRawText;

      var node = {
        materialIds: []
      };

      if (withRawText) {
        node.rawText = rawText;
      }

      var textItems = rawText.split('\n').filter(function (item) {
        return !!item;
      }); // 先简单过滤

      if (this.prefixTag && !textItems.slice(0, 3).some(function (text) {
        return text.includes(_this.prefixTag);
      })) {
        return null;
      } // handle id


      if (textItems[0].startsWith(TagID)) {
        var match = textItems[0].match(TAG_ID_REGEX);

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
      var roleIndex = textItems[0].startsWith(TAG_START) ? -1 : textItems[0].indexOf('：');

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
      var info = this.parseContent(textItems, materialsMap);

      if (!info) {
        return null;
      }

      var content = info.content,
          materialIds = info.materialIds,
          extraProps = _objectWithoutProperties(info, ["content", "materialIds"]);

      var _getIdAndContentArray = getIdAndContentArrayFromText(content, materialsMap),
          contentArray = _getIdAndContentArray.contentArray,
          contentMaterialIds = _getIdAndContentArray.materialIds;

      return _objectSpread2(_objectSpread2(_objectSpread2({
        imType: this.imType
      }, node), extraProps), {}, {
        contentArray: contentArray,
        materialIds: [].concat(_toConsumableArray(materialIds || []), _toConsumableArray(contentMaterialIds))
      });
    }
    /**
     *
     * @param dot
     * @return {string} text
     */

  }, {
    key: "unParse",
    value: function unParse(dot) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var id = dot.id,
          role = dot.role;
      return (id ? generateIdTag(id) + '\n' : '') + (role ? role + '：' : '') + (this.prefixTag || '') + this.unParseContent(dot, options);
    }
    /**
     * @abstract
     * 根据纯文本给dot填充信息
     * @param text 已经将id和role除去
     * @param  null or {content, materialIds, ...otherProps}
     * null代表类型不满足, content代表主内容，materialIds代表解析其他属性时收集的materialIds
     * @return
     */

  }, {
    key: "parseContent",
    value: function parseContent(items, materialsMap) {
      return {
        content: items.join('\n'),
        materialIds: []
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

  }, {
    key: "unParseContent",
    value: function unParseContent(dot) {
      var contentArray = dot.contentArray;
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

  }, {
    key: "getChoices",
    value: function getChoices(textItems, materialsMap) {
      var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref2$fakeHint = _ref2.fakeHint,
          fakeHint = _ref2$fakeHint === void 0 ? false : _ref2$fakeHint;

      var selectIndex = textItems.findIndex(function (i) {
        return i.startsWith(ChoiceStart);
      });

      if (selectIndex == -1) {
        return {
          choices: [],
          materialIds: [],
          textItems: textItems
        };
      }

      var choices = [];
      textItems.slice(selectIndex).forEach(function (item) {
        if (item.startsWith(ChoiceStart)) {
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
      var materialIds = [];
      choices.forEach(function (item, i) {
        var _getIdAndContentArray2 = getIdAndContentArrayFromText(item.content, materialsMap),
            id = _getIdAndContentArray2.id,
            contentArray = _getIdAndContentArray2.contentArray,
            choiceMaterialIds = _getIdAndContentArray2.materialIds;

        materialIds.push.apply(materialIds, _toConsumableArray(choiceMaterialIds));
        item.id = id || nanoid();
        item.contentArray = contentArray;
        delete item.content;

        var _getIdAndContentArray3 = getIdAndContentArrayFromText(item.hint, materialsMap),
            hintContentArray = _getIdAndContentArray3.contentArray,
            hintMaterialIds = _getIdAndContentArray3.materialIds;

        item.hintContentArray = hintContentArray;
        delete item.hint;
        materialIds.push.apply(materialIds, _toConsumableArray(hintMaterialIds));
      });

      if (choices.length > 0 && fakeHint) {
        choices.forEach(function (item, index) {
          var hintContentArray = item.hintContentArray,
              right = item.right;

          if (!arrayHasContent(hintContentArray)) {
            var _hintArray$find, _hintArray$find2;

            var hintArray = [].concat(_toConsumableArray(choices.slice(0, index).reverse()), _toConsumableArray(choices.slice(index + 1)));
            var closestRight = (_hintArray$find = hintArray.find(function (item) {
              return arrayHasContent(item.hintContentArray) && item.right;
            })) === null || _hintArray$find === void 0 ? void 0 : _hintArray$find.hintContentArray;
            var closestWrong = (_hintArray$find2 = hintArray.find(function (item) {
              return arrayHasContent(item.hintContentArray) && !item.right;
            })) === null || _hintArray$find2 === void 0 ? void 0 : _hintArray$find2.hintContentArray;

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
        choices: choices,
        materialIds: _toConsumableArray(new Set(materialIds)),
        textItems: textItems.slice(0, selectIndex)
      };
    }
    /**
     * @param choices
     * @param showItemId 每个choice是否需要id， 如Steps就不需要
     */

  }, {
    key: "parseChoices",
    value: function parseChoices(choices) {
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref3$showChoiceId = _ref3.showChoiceId,
          showChoiceId = _ref3$showChoiceId === void 0 ? true : _ref3$showChoiceId;

      if (!arrayHasContent(choices)) {
        return '';
      }

      return choices.map(function (_ref4) {
        var id = _ref4.id,
            content = _ref4.content,
            contentArray = _ref4.contentArray,
            hintContentArray = _ref4.hintContentArray,
            hintFake = _ref4.hintFake,
            right = _ref4.right;
        return ChoiceStart + (contentArray ? convertContentArrayToRawContent(contentArray) : content) + (showChoiceId ? generateIdTag(id) : '') + (right ? RightChoiceTag : '') + (arrayHasContent(hintContentArray) && !hintFake ? '\n' + convertContentArrayToRawContent(hintContentArray) : '');
      }).join('\n');
    }
  }]);

  return BaseItem;
}();

_defineProperty(BaseItem, "imType", '');

_defineProperty(BaseItem, "prefixTag", '');var FillBlank = /*#__PURE__*/function (_BaseItem) {
  _inherits(FillBlank, _BaseItem);

  var _super = _createSuper(FillBlank);

  function FillBlank() {
    _classCallCheck(this, FillBlank);

    return _super.apply(this, arguments);
  }

  _createClass(FillBlank, null, [{
    key: "parseContent",
    value: function parseContent(textItems, materialsMap) {
      var placeholder = undefined;
      var items = textItems;

      if (textItems[textItems.length - 1].startsWith(FillBlankPlaceholderPrefix)) {
        placeholder = textItems[textItems.length - 1].slice(FillBlankPlaceholderPrefix.length);
        items = textItems.slice(0, -1);
      }

      return {
        placeholder: placeholder,
        content: items.join('\n')
      };
    }
  }, {
    key: "unParseContent",
    value: function unParseContent(dot) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _objectDestructuringEmpty(_ref);

      var contentArray = dot.contentArray,
          placeholder = dot.placeholder;
      return convertContentArrayToRawContent(contentArray) + (placeholder ? '\n' + FillBlankPlaceholderPrefix + placeholder : '');
    }
  }]);

  return FillBlank;
}(BaseItem);

_defineProperty(FillBlank, "imType", IMType.fillBlank);

_defineProperty(FillBlank, "prefixTag", TagFillBlank);var SingleChoice = /*#__PURE__*/function (_BaseItem) {
  _inherits(SingleChoice, _BaseItem);

  var _super = _createSuper(SingleChoice);

  function SingleChoice() {
    _classCallCheck(this, SingleChoice);

    return _super.apply(this, arguments);
  }

  _createClass(SingleChoice, null, [{
    key: "parseContent",
    value: function parseContent(oldTextItems, materialsMap) {
      var _this$getChoices = this.getChoices(oldTextItems, materialsMap, {
        fakeHint: true
      }),
          choices = _this$getChoices.choices,
          textItems = _this$getChoices.textItems,
          materialIds = _this$getChoices.materialIds;

      if (choices.length == 0) {
        return null;
      }

      return {
        choices: choices,
        materialIds: materialIds,
        content: textItems.join('\n')
      };
    }
  }, {
    key: "unParseContent",
    value: function unParseContent(dot) {
      var contentArray = dot.contentArray,
          choices = dot.choices;
      return convertContentArrayToRawContent(contentArray) + '\n' + this.parseChoices(choices);
    }
  }]);

  return SingleChoice;
}(BaseItem);

_defineProperty(SingleChoice, "imType", IMType.singleChoice);var MultipleChoice = /*#__PURE__*/function (_BaseItem) {
  _inherits(MultipleChoice, _BaseItem);

  var _super = _createSuper(MultipleChoice);

  function MultipleChoice() {
    _classCallCheck(this, MultipleChoice);

    return _super.apply(this, arguments);
  }

  _createClass(MultipleChoice, null, [{
    key: "parseContent",
    value: function parseContent(oldTextItems, materialsMap) {
      var _this$getChoices = this.getChoices(oldTextItems, materialsMap),
          choices = _this$getChoices.choices,
          textItems = _this$getChoices.textItems,
          materialIds = _this$getChoices.materialIds;

      if (choices.length == 0) {
        return null;
      }

      return {
        choices: choices,
        materialIds: materialIds,
        content: textItems.join('\n')
      };
    }
  }, {
    key: "unParseContent",
    value: function unParseContent(dot) {
      var contentArray = dot.contentArray,
          choices = dot.choices;
      return convertContentArrayToRawContent(contentArray) + '\n' + this.parseChoices(choices);
    }
  }]);

  return MultipleChoice;
}(BaseItem);

_defineProperty(MultipleChoice, "imType", IMType.multipleChoice);

_defineProperty(MultipleChoice, "prefixTag", TagMultipleChoice);var Steps = /*#__PURE__*/function (_BaseItem) {
  _inherits(Steps, _BaseItem);

  var _super = _createSuper(Steps);

  function Steps() {
    _classCallCheck(this, Steps);

    return _super.apply(this, arguments);
  }

  _createClass(Steps, null, [{
    key: "parseContent",
    value: function parseContent(oldTextItems, materialsMap) {
      var _this$getChoices = this.getChoices(oldTextItems, materialsMap),
          choices = _this$getChoices.choices,
          textItems = _this$getChoices.textItems,
          materialIds = _this$getChoices.materialIds;

      if (choices.length == 0) {
        return null;
      }

      return {
        choices: choices,
        materialIds: materialIds,
        content: textItems.join('\n')
      };
    }
  }, {
    key: "unParseContent",
    value: function unParseContent(dot) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _objectDestructuringEmpty(_ref);

      var contentArray = dot.contentArray,
          choices = dot.choices;
      return convertContentArrayToRawContent(contentArray) + '\n' + this.parseChoices(choices, {
        showChoiceId: false
      });
    }
  }]);

  return Steps;
}(BaseItem);

_defineProperty(Steps, "imType", IMType.steps);

_defineProperty(Steps, "prefixTag", TagSteps);var SubTitle = /*#__PURE__*/function (_BaseItem) {
  _inherits(SubTitle, _BaseItem);

  var _super = _createSuper(SubTitle);

  function SubTitle() {
    _classCallCheck(this, SubTitle);

    return _super.apply(this, arguments);
  }

  return SubTitle;
}(BaseItem);

_defineProperty(SubTitle, "imType", IMType.subTitle);

_defineProperty(SubTitle, "prefixTag", TagSubTitle);var _config;
var config = (_config = {}, _defineProperty(_config, TagTakeVideoTui, 'tui'), _defineProperty(_config, TagTakeVideoLa, 'la'), _defineProperty(_config, TagTakeVideoYao, 'yao'), _defineProperty(_config, TagTakeVideoYi, 'yi'), _defineProperty(_config, TagTakeVideoGen, 'gen'), _defineProperty(_config, TagTakeVideoShuai, 'shuai'), _defineProperty(_config, TagTakeVideoSheng, 'sheng'), _defineProperty(_config, TagTakeVideoJiang, 'jiang'), _defineProperty(_config, TagTakeVideoGuding, 'guding'), _defineProperty(_config, TagTakeVideoTuiLaMerge, 'tuilaMerge'), _config);
/**
 * 拍视频组件：推拉摇移
 */

var TakeVideoTLYY = /*#__PURE__*/function (_BaseItem) {
  _inherits(TakeVideoTLYY, _BaseItem);

  var _super = _createSuper(TakeVideoTLYY);

  function TakeVideoTLYY() {
    _classCallCheck(this, TakeVideoTLYY);

    return _super.apply(this, arguments);
  }

  _createClass(TakeVideoTLYY, null, [{
    key: "parseContent",
    value: function parseContent(items) {
      _objectDestructuringEmpty(items);

      var key = Object.keys(config).find(function (item) {
        return items[0].startsWith(item);
      });

      if (!key) {
        return null;
      }

      return {
        tlyyType: config[key],
        content: items.join('\n').slice(key.length)
      };
    }
  }, {
    key: "unParseContent",
    value: function unParseContent(dot) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _objectDestructuringEmpty(_ref);

      var contentArray = dot.contentArray,
          tlyyType = dot.tlyyType;
      return Object.keys(config).find(function (key) {
        return config[key] == tlyyType;
      }) + convertContentArrayToRawContent(contentArray);
    }
  }]);

  return TakeVideoTLYY;
}(BaseItem);

_defineProperty(TakeVideoTLYY, "imType", IMType.takeVideoTLYY);var VideoSort = /*#__PURE__*/function (_BaseItem) {
  _inherits(VideoSort, _BaseItem);

  var _super = _createSuper(VideoSort);

  function VideoSort() {
    _classCallCheck(this, VideoSort);

    return _super.apply(this, arguments);
  }

  return VideoSort;
}(BaseItem);

_defineProperty(VideoSort, "imType", IMType.videoSort);

_defineProperty(VideoSort, "prefixTag", TagVideoSort);var VideoCut = /*#__PURE__*/function (_BaseItem) {
  _inherits(VideoCut, _BaseItem);

  var _super = _createSuper(VideoCut);

  function VideoCut() {
    _classCallCheck(this, VideoCut);

    return _super.apply(this, arguments);
  }

  return VideoCut;
}(BaseItem);

_defineProperty(VideoCut, "imType", IMType.videoCut);

_defineProperty(VideoCut, "prefixTag", TagVideoCut);var SingleChoice$1 = /*#__PURE__*/function (_BaseItem) {
  _inherits(SingleChoice, _BaseItem);

  var _super = _createSuper(SingleChoice);

  function SingleChoice() {
    _classCallCheck(this, SingleChoice);

    return _super.apply(this, arguments);
  }

  return SingleChoice;
}(BaseItem);

_defineProperty(SingleChoice$1, "imType", IMType.text);/**
 * 本周关卡导航
 * 【本周关卡导航】
 * 【本周关卡导航】全部
 * 【本周关卡导航】下一关
 * 【本周关卡导航】本关
 */

var ChapterSections = /*#__PURE__*/function (_BaseItem) {
  _inherits(ChapterSections, _BaseItem);

  var _super = _createSuper(ChapterSections);

  function ChapterSections() {
    _classCallCheck(this, ChapterSections);

    return _super.apply(this, arguments);
  }

  return ChapterSections;
}(BaseItem);

_defineProperty(ChapterSections, "imType", IMType.chapterSections);

_defineProperty(ChapterSections, "prefixTag", TagChapterSection);/**
 * 目录
 * 【目录】
 * 【目录】1
 * 【目录】1-1
 * 【目录】1-1-1
 */

var Catalog = /*#__PURE__*/function (_BaseItem) {
  _inherits(Catalog, _BaseItem);

  var _super = _createSuper(Catalog);

  function Catalog() {
    _classCallCheck(this, Catalog);

    return _super.apply(this, arguments);
  }

  return Catalog;
}(BaseItem);

_defineProperty(Catalog, "imType", IMType.catalog);

_defineProperty(Catalog, "prefixTag", TagCatalog);var VideoCut$1 = /*#__PURE__*/function (_BaseItem) {
  _inherits(VideoCut, _BaseItem);

  var _super = _createSuper(VideoCut);

  function VideoCut() {
    _classCallCheck(this, VideoCut);

    return _super.apply(this, arguments);
  }

  return VideoCut;
}(BaseItem);

_defineProperty(VideoCut$1, "imType", IMType.videoSplit);

_defineProperty(VideoCut$1, "prefixTag", TagVideoSplit);var VideoCut$2 = /*#__PURE__*/function (_BaseItem) {
  _inherits(VideoCut, _BaseItem);

  var _super = _createSuper(VideoCut);

  function VideoCut() {
    _classCallCheck(this, VideoCut);

    return _super.apply(this, arguments);
  }

  return VideoCut;
}(BaseItem);

_defineProperty(VideoCut$2, "imType", IMType.videoMusicSplit);

_defineProperty(VideoCut$2, "prefixTag", TagVideoMusicSplit);var VideoCaiDian = /*#__PURE__*/function (_BaseItem) {
  _inherits(VideoCaiDian, _BaseItem);

  var _super = _createSuper(VideoCaiDian);

  function VideoCaiDian() {
    _classCallCheck(this, VideoCaiDian);

    return _super.apply(this, arguments);
  }

  return VideoCaiDian;
}(BaseItem);

_defineProperty(VideoCaiDian, "imType", IMType.videoCaiDian);

_defineProperty(VideoCaiDian, "prefixTag", TagVideoCaiDian);var _config$1;
var config$1 = (_config$1 = {}, _defineProperty(_config$1, TagTakePhotoHuangJin, 'huangJin'), _defineProperty(_config$1, TagTakePhotoSanJiao, 'sanJiao'), _defineProperty(_config$1, TagTakePhotoChuiZhi, 'chuiZhi'), _defineProperty(_config$1, TagTakePhotoSanFen, 'sanFen'), _defineProperty(_config$1, TagTakePhotoShuiPing, 'shuiPing'), _defineProperty(_config$1, TagTakePhotoDuiJiao, 'duiJiao'), _config$1);
/**
 * 拍照片
 */

var TakePhoto = /*#__PURE__*/function (_BaseItem) {
  _inherits(TakePhoto, _BaseItem);

  var _super = _createSuper(TakePhoto);

  function TakePhoto() {
    _classCallCheck(this, TakePhoto);

    return _super.apply(this, arguments);
  }

  _createClass(TakePhoto, null, [{
    key: "parseContent",
    value: function parseContent(items) {
      _objectDestructuringEmpty(items);

      var key = Object.keys(config$1).find(function (item) {
        return items[0].startsWith(item);
      });

      if (!key) {
        return null;
      }

      return {
        takePhotoType: config$1[key],
        content: items.join('\n').slice(key.length)
      };
    }
  }, {
    key: "unParseContent",
    value: function unParseContent(dot) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _objectDestructuringEmpty(_ref);

      var contentArray = dot.contentArray,
          takePhotoType = dot.takePhotoType;
      return Object.keys(config$1).find(function (key) {
        return config$1[key] == takePhotoType;
      }) + convertContentArrayToRawContent(contentArray);
    }
  }]);

  return TakePhoto;
}(BaseItem);

_defineProperty(TakePhoto, "imType", IMType.takePhoto);var VideoAddMusic = /*#__PURE__*/function (_BaseItem) {
  _inherits(VideoAddMusic, _BaseItem);

  var _super = _createSuper(VideoAddMusic);

  function VideoAddMusic() {
    _classCallCheck(this, VideoAddMusic);

    return _super.apply(this, arguments);
  }

  return VideoAddMusic;
}(BaseItem);

_defineProperty(VideoAddMusic, "imType", IMType.videoAddMusic);

_defineProperty(VideoAddMusic, "prefixTag", TagVideoAddMusic);var VideoAddAudio = /*#__PURE__*/function (_BaseItem) {
  _inherits(VideoAddAudio, _BaseItem);

  var _super = _createSuper(VideoAddAudio);

  function VideoAddAudio() {
    _classCallCheck(this, VideoAddAudio);

    return _super.apply(this, arguments);
  }

  return VideoAddAudio;
}(BaseItem);

_defineProperty(VideoAddAudio, "imType", IMType.videoAddAudio);

_defineProperty(VideoAddAudio, "prefixTag", TagVideoAddAudio);var Loaders = [MultipleChoice, FillBlank, Steps, SubTitle, TakeVideoTLYY, TakePhoto, VideoCut, VideoSort, VideoAddMusic, VideoAddAudio, VideoCut$1, VideoCut$2, VideoCaiDian, ChapterSections, Catalog, // 目前单选题没有特殊标记，因此排序在最后
SingleChoice, SingleChoice$1];
var convertDotToRawText = function convertDotToRawText(dot) {
  var loadersMap = keyBy(Loaders, 'imType');
  return dot.edges.map(function (item) {
    return (loadersMap[item.imType] || SingleChoice$1).unParse(item);
  }).join('\n\n');
};
/**
 *
 * @param text 对话体纯文本
 * @param materials 素材列表
 * @param withRawText 每个item是否返回rawText
 */

var getDotFromRawText = function getDotFromRawText(text, materials) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$withRawText = _ref.withRawText,
      withRawText = _ref$withRawText === void 0 ? false : _ref$withRawText;

  var materialsMap = keyBy(materials, 'id');
  var textItems = text.trim().split(/[\n\n]{2,}/).filter(function (item) {
    return !!item;
  });
  var nodes = [];
  textItems.forEach(function (textItem) {
    for (var i = 0; i < Loaders.length; i++) {
      var dot = Loaders[i].parse(textItem, materialsMap, {
        withRawText: withRawText
      });

      if (dot) {
        nodes.push(dot); // 处理text的两个特殊形态：singleImage和singleVideo

        if ((!dot.imType || dot.imType == IMType.text) && arrayHasContent(dot.contentArray) && dot.contentArray.length == 1) {
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
    edges: nodes
  };
};
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
};exports.ChoiceStart=ChoiceStart;exports.FillBlankPlaceholderPrefix=FillBlankPlaceholderPrefix;exports.IMType=IMType;exports.MaterialType=MaterialType;exports.RightChoiceTag=RightChoiceTag;exports.TAG_END=TAG_END;exports.TAG_ID_REGEX=TAG_ID_REGEX;exports.TAG_ID_REGEX_G=TAG_ID_REGEX_G;exports.TAG_START=TAG_START;exports.TagCatalog=TagCatalog;exports.TagChapterSection=TagChapterSection;exports.TagFillBlank=TagFillBlank;exports.TagID=TagID;exports.TagMultipleChoice=TagMultipleChoice;exports.TagNewLine=TagNewLine;exports.TagSteps=TagSteps;exports.TagSubTitle=TagSubTitle;exports.TagTakePhotoChuiZhi=TagTakePhotoChuiZhi;exports.TagTakePhotoDuiJiao=TagTakePhotoDuiJiao;exports.TagTakePhotoHuangJin=TagTakePhotoHuangJin;exports.TagTakePhotoSanFen=TagTakePhotoSanFen;exports.TagTakePhotoSanJiao=TagTakePhotoSanJiao;exports.TagTakePhotoShuiPing=TagTakePhotoShuiPing;exports.TagTakeVideoGen=TagTakeVideoGen;exports.TagTakeVideoGuding=TagTakeVideoGuding;exports.TagTakeVideoJiang=TagTakeVideoJiang;exports.TagTakeVideoLa=TagTakeVideoLa;exports.TagTakeVideoSheng=TagTakeVideoSheng;exports.TagTakeVideoShuai=TagTakeVideoShuai;exports.TagTakeVideoTui=TagTakeVideoTui;exports.TagTakeVideoTuiLaMerge=TagTakeVideoTuiLaMerge;exports.TagTakeVideoYao=TagTakeVideoYao;exports.TagTakeVideoYi=TagTakeVideoYi;exports.TagTask=TagTask;exports.TagUserName=TagUserName;exports.TagVideoAddAudio=TagVideoAddAudio;exports.TagVideoAddMusic=TagVideoAddMusic;exports.TagVideoCaiDian=TagVideoCaiDian;exports.TagVideoCut=TagVideoCut;exports.TagVideoMusicSplit=TagVideoMusicSplit;exports.TagVideoSort=TagVideoSort;exports.TagVideoSplit=TagVideoSplit;exports.Tags=Tags;exports.arrayHasContent=arrayHasContent;exports.convertContentArrayToRawContent=convertContentArrayToRawContent;exports.convertDotToRawText=convertDotToRawText;exports.formatContent=formatContent;exports.generateIdTag=generateIdTag;exports.getDotFromRawText=getDotFromRawText;exports.getIdAndContentArrayFromText=getIdAndContentArrayFromText;exports.getMaterialIdsFromContent=getMaterialIdsFromContent;exports.isMaterialType=isMaterialType;exports.keyBy=keyBy;exports.parseContent=parseContent;